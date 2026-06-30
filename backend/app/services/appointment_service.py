from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate


class AppointmentService:

    @staticmethod
    def generate_appointment_id(db: Session):
        """Generate unique appointment ID"""
        total_appointments = db.query(Appointment).count() + 1
        return f"APT{total_appointments:08d}"

    @staticmethod
    def create_appointment(db: Session, appointment: AppointmentCreate):
        """Create new appointment"""
        try:
            new_appointment = Appointment(
                appointment_id=AppointmentService.generate_appointment_id(db),
                patient_id=appointment.patient_id,
                doctor_id=appointment.doctor_id,
                appointment_date=appointment.appointment_date,
                appointment_time=appointment.appointment_time,
                duration_minutes=appointment.duration_minutes or 30,
                reason=appointment.reason,
                notes=appointment.notes,
                appointment_type=appointment.appointment_type or "consultation",
                status="scheduled",
            )
            db.add(new_appointment)
            db.commit()
            db.refresh(new_appointment)
            return new_appointment
        except Exception as e:
            db.rollback()
            raise Exception(f"Error creating appointment: {str(e)}")

    @staticmethod
    def get_all_appointments(db: Session, skip: int = 0, limit: int = 100):
        """Get all appointments"""
        return db.query(Appointment).offset(skip).limit(limit).all()

    @staticmethod
    def get_appointment_by_id(db: Session, appointment_id: int):
        """Get appointment by ID"""
        return db.query(Appointment).filter(Appointment.id == appointment_id).first()

    @staticmethod
    def get_appointments_by_patient(db: Session, patient_id: int, skip: int = 0, limit: int = 100):
        """Get all appointments for a patient"""
        return db.query(Appointment).filter(
            Appointment.patient_id == patient_id
        ).offset(skip).limit(limit).all()

    @staticmethod
    def get_appointments_by_doctor(db: Session, doctor_id: int, skip: int = 0, limit: int = 100):
        """Get all appointments for a doctor"""
        return db.query(Appointment).filter(
            Appointment.doctor_id == doctor_id
        ).offset(skip).limit(limit).all()

    @staticmethod
    def get_upcoming_appointments(db: Session, doctor_id: int):
        """Get upcoming appointments for a doctor"""
        now = datetime.now()
        return db.query(Appointment).filter(
            (Appointment.doctor_id == doctor_id) &
            (Appointment.appointment_date >= now) &
            (Appointment.status.in_(["scheduled", "confirmed"]))
        ).order_by(Appointment.appointment_date).all()

    @staticmethod
    def update_appointment(db: Session, appointment_id: int, appointment: AppointmentUpdate):
        """Update appointment"""
        try:
            db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
            if not db_appointment:
                return None

            if appointment.appointment_date is not None:
                db_appointment.appointment_date = appointment.appointment_date
            if appointment.appointment_time is not None:
                db_appointment.appointment_time = appointment.appointment_time
            if appointment.reason is not None:
                db_appointment.reason = appointment.reason
            if appointment.notes is not None:
                db_appointment.notes = appointment.notes
            if appointment.status is not None:
                db_appointment.status = appointment.status
                if appointment.status == "confirmed":
                    db_appointment.confirmed_at = datetime.now()
                elif appointment.status == "completed":
                    db_appointment.completed_at = datetime.now()

            db.commit()
            db.refresh(db_appointment)
            return db_appointment
        except Exception as e:
            db.rollback()
            raise Exception(f"Error updating appointment: {str(e)}")

    @staticmethod
    def cancel_appointment(db: Session, appointment_id: int):
        """Cancel appointment"""
        try:
            db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
            if not db_appointment:
                return None
            
            db_appointment.status = "cancelled"
            db.commit()
            db.refresh(db_appointment)
            return db_appointment
        except Exception as e:
            db.rollback()
            raise Exception(f"Error cancelling appointment: {str(e)}")

    @staticmethod
    def confirm_appointment(db: Session, appointment_id: int):
        """Confirm appointment"""
        try:
            db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
            if not db_appointment:
                return None
            
            db_appointment.status = "confirmed"
            db_appointment.confirmed_at = datetime.now()
            db.commit()
            db.refresh(db_appointment)
            return db_appointment
        except Exception as e:
            db.rollback()
            raise Exception(f"Error confirming appointment: {str(e)}")

    @staticmethod
    def delete_appointment(db: Session, appointment_id: int):
        """Delete appointment"""
        try:
            db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
            if not db_appointment:
                return False
            
            db.delete(db_appointment)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise Exception(f"Error deleting appointment: {str(e)}")
