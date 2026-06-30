from sqlalchemy.orm import Session
from app.models.medical_record import MedicalRecord
from app.schemas.medical_record import MedicalRecordCreate, MedicalRecordUpdate


class MedicalRecordService:

    @staticmethod
    def generate_record_id(db: Session):
        """Generate unique medical record ID"""
        total_records = db.query(MedicalRecord).count() + 1
        return f"MED{total_records:08d}"

    @staticmethod
    def create_medical_record(db: Session, record: MedicalRecordCreate):
        """Create new medical record"""
        try:
            new_record = MedicalRecord(
                record_id=MedicalRecordService.generate_record_id(db),
                patient_id=record.patient_id,
                symptoms=record.symptoms,
                diagnosis=record.diagnosis,
                treatment_plan=record.treatment_plan,
                doctor_notes=record.doctor_notes,
                observations=record.observations,
                prescription=record.prescription,
                priority=record.priority or "normal",
                status="pending",
            )
            db.add(new_record)
            db.commit()
            db.refresh(new_record)
            return new_record
        except Exception as e:
            db.rollback()
            raise Exception(f"Error creating medical record: {str(e)}")

    @staticmethod
    def get_all_records(db: Session, skip: int = 0, limit: int = 100):
        """Get all medical records"""
        return db.query(MedicalRecord).offset(skip).limit(limit).all()

    @staticmethod
    def get_record_by_id(db: Session, record_id: int):
        """Get medical record by ID"""
        return db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()

    @staticmethod
    def get_records_by_patient(db: Session, patient_id: int, skip: int = 0, limit: int = 100):
        """Get all medical records for a patient"""
        return db.query(MedicalRecord).filter(
            MedicalRecord.patient_id == patient_id
        ).offset(skip).limit(limit).all()

    @staticmethod
    def get_records_by_doctor(db: Session, doctor_id: int, skip: int = 0, limit: int = 100):
        """Get all medical records reviewed by a doctor"""
        return db.query(MedicalRecord).filter(
            MedicalRecord.doctor_id == doctor_id
        ).offset(skip).limit(limit).all()

    @staticmethod
    def update_medical_record(db: Session, record_id: int, record: MedicalRecordUpdate):
        """Update medical record"""
        try:
            db_record = db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()
            if not db_record:
                return None

            if record.symptoms is not None:
                db_record.symptoms = record.symptoms
            if record.diagnosis is not None:
                db_record.diagnosis = record.diagnosis
            if record.treatment_plan is not None:
                db_record.treatment_plan = record.treatment_plan
            if record.doctor_notes is not None:
                db_record.doctor_notes = record.doctor_notes
            if record.observations is not None:
                db_record.observations = record.observations
            if record.prescription is not None:
                db_record.prescription = record.prescription
            if record.status is not None:
                db_record.status = record.status
            if record.priority is not None:
                db_record.priority = record.priority

            db.commit()
            db.refresh(db_record)
            return db_record
        except Exception as e:
            db.rollback()
            raise Exception(f"Error updating medical record: {str(e)}")

    @staticmethod
    def mark_as_reviewed(db: Session, record_id: int, doctor_id: int):
        """Mark record as reviewed by doctor"""
        try:
            db_record = db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()
            if not db_record:
                return None
            
            db_record.status = "reviewed"
            db_record.doctor_id = doctor_id
            db_record.reviewed_at = db.func.now()
            
            db.commit()
            db.refresh(db_record)
            return db_record
        except Exception as e:
            db.rollback()
            raise Exception(f"Error marking record as reviewed: {str(e)}")

    @staticmethod
    def delete_medical_record(db: Session, record_id: int):
        """Delete medical record"""
        try:
            db_record = db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()
            if not db_record:
                return False
            
            db.delete(db_record)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise Exception(f"Error deleting medical record: {str(e)}")
