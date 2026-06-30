from sqlalchemy.orm import Session
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorCreate, DoctorUpdate


class DoctorService:

    @staticmethod
    def generate_doctor_id(db: Session):
        """Generate unique doctor ID"""
        total_doctors = db.query(Doctor).count() + 1
        return f"DOC{total_doctors:06d}"

    @staticmethod
    def create_doctor(db: Session, doctor: DoctorCreate):
        """Create new doctor"""
        try:
            new_doctor = Doctor(
                doctor_id=DoctorService.generate_doctor_id(db),
                full_name=doctor.full_name,
                email=doctor.email,
                phone=doctor.phone,
                specialization=doctor.specialization,
                hospital_clinic_name=doctor.hospital_clinic_name,
                experience_years=doctor.experience_years,
                license_number=doctor.license_number,
                address=doctor.address,
                bio=doctor.bio,
                availability_status="online",
            )
            db.add(new_doctor)
            db.commit()
            db.refresh(new_doctor)
            return new_doctor
        except Exception as e:
            db.rollback()
            raise Exception(f"Error creating doctor: {str(e)}")

    @staticmethod
    def get_all_doctors(db: Session, skip: int = 0, limit: int = 100):
        """Get all active doctors"""
        return db.query(Doctor).filter(Doctor.is_active == True).offset(skip).limit(limit).all()

    @staticmethod
    def get_doctor_by_id(db: Session, doctor_id: int):
        """Get doctor by ID"""
        return db.query(Doctor).filter(Doctor.id == doctor_id).first()

    @staticmethod
    def get_doctor_by_doctor_id(db: Session, doctor_id: str):
        """Get doctor by doctor_id string"""
        return db.query(Doctor).filter(Doctor.doctor_id == doctor_id).first()

    @staticmethod
    def get_doctors_by_specialization(db: Session, specialization: str):
        """Get doctors by specialization"""
        return db.query(Doctor).filter(
            (Doctor.specialization.ilike(f"%{specialization}%")) &
            (Doctor.is_active == True)
        ).all()

    @staticmethod
    def update_doctor(db: Session, doctor_id: int, doctor: DoctorUpdate):
        """Update doctor information"""
        try:
            db_doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
            if not db_doctor:
                return None

            if doctor.full_name:
                db_doctor.full_name = doctor.full_name
            if doctor.phone:
                db_doctor.phone = doctor.phone
            if doctor.specialization:
                db_doctor.specialization = doctor.specialization
            if doctor.hospital_clinic_name is not None:
                db_doctor.hospital_clinic_name = doctor.hospital_clinic_name
            if doctor.experience_years is not None:
                db_doctor.experience_years = doctor.experience_years
            if doctor.license_number is not None:
                db_doctor.license_number = doctor.license_number
            if doctor.address is not None:
                db_doctor.address = doctor.address
            if doctor.bio is not None:
                db_doctor.bio = doctor.bio
            if doctor.availability_status is not None:
                db_doctor.availability_status = doctor.availability_status

            db.commit()
            db.refresh(db_doctor)
            return db_doctor
        except Exception as e:
            db.rollback()
            raise Exception(f"Error updating doctor: {str(e)}")

    @staticmethod
    def search_doctors(db: Session, search_term: str):
        """Search doctors by name, specialization, or email"""
        return db.query(Doctor).filter(
            (Doctor.full_name.ilike(f"%{search_term}%")) |
            (Doctor.specialization.ilike(f"%{search_term}%")) |
            (Doctor.email.ilike(f"%{search_term}%")) |
            (Doctor.doctor_id.ilike(f"%{search_term}%"))
        ).filter(Doctor.is_active == True).all()
