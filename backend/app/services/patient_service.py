from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate


class PatientService:

    @staticmethod
    def generate_patient_id(db: Session):
        """Generate unique patient ID"""
        total_patients = db.query(Patient).count() + 1
        return f"PAT{total_patients:06d}"

    @staticmethod
    def create_patient(db: Session, patient: PatientCreate):
        """Create new patient with complete medical information"""
        try:
            # Calculate BMI if height and weight available
            bmi = None
            if patient.height and patient.weight:
                bmi = round((patient.weight / ((patient.height/100) ** 2)), 2)

            new_patient = Patient(
                patient_id=PatientService.generate_patient_id(db),
                full_name=patient.full_name,
                age=patient.age,
                gender=patient.gender,
                phone=patient.phone,
                email=patient.email,
                language=patient.language,
                address=patient.address,
                blood_group=patient.blood_group,
                height=patient.height,
                weight=patient.weight,
                bmi=bmi,
                emergency_contact_name=patient.emergency_contact_name,
                emergency_contact_phone=patient.emergency_contact_phone,
                emergency_contact_relation=patient.emergency_contact_relation,
                medical_history=patient.medical_history,
                allergies=patient.allergies,
                current_medications=patient.current_medications,
                previous_diseases=patient.previous_diseases,
                surgical_history=patient.surgical_history,
                family_history=patient.family_history,
            )

            db.add(new_patient)
            db.commit()
            db.refresh(new_patient)
            return new_patient
        except Exception as e:
            db.rollback()
            raise Exception(f"Error creating patient: {str(e)}")

    @staticmethod
    def get_all_patients(db: Session, skip: int = 0, limit: int = 100):
        """Get all patients with pagination"""
        return db.query(Patient).offset(skip).limit(limit).all()

    @staticmethod
    def get_patient_by_id(db: Session, patient_id: int):
        """Get patient by ID"""
        return db.query(Patient).filter(Patient.id == patient_id).first()

    @staticmethod
    def get_patient_by_patient_id(db: Session, patient_id: str):
        """Get patient by patient_id string"""
        return db.query(Patient).filter(Patient.patient_id == patient_id).first()

    @staticmethod
    def get_patient_by_email(db: Session, email: str):
        """Get patient by email"""
        return db.query(Patient).filter(Patient.email == email).first()

    @staticmethod
    def update_patient(db: Session, patient_id: int, patient: PatientUpdate):
        """Update patient information"""
        try:
            db_patient = db.query(Patient).filter(Patient.id == patient_id).first()
            if not db_patient:
                return None

            # Update only provided fields
            if patient.full_name:
                db_patient.full_name = patient.full_name
            if patient.age:
                db_patient.age = patient.age
            if patient.gender:
                db_patient.gender = patient.gender
            if patient.phone:
                db_patient.phone = patient.phone
            if patient.email:
                db_patient.email = patient.email
            if patient.language:
                db_patient.language = patient.language
            if patient.address is not None:
                db_patient.address = patient.address
            if patient.blood_group is not None:
                db_patient.blood_group = patient.blood_group
            if patient.height:
                db_patient.height = patient.height
            if patient.weight:
                db_patient.weight = patient.weight
                # Recalculate BMI
                if db_patient.height:
                    db_patient.bmi = round((patient.weight / ((db_patient.height/100) ** 2)), 2)
            if patient.emergency_contact_name is not None:
                db_patient.emergency_contact_name = patient.emergency_contact_name
            if patient.emergency_contact_phone is not None:
                db_patient.emergency_contact_phone = patient.emergency_contact_phone
            if patient.emergency_contact_relation is not None:
                db_patient.emergency_contact_relation = patient.emergency_contact_relation
            if patient.medical_history is not None:
                db_patient.medical_history = patient.medical_history
            if patient.allergies is not None:
                db_patient.allergies = patient.allergies
            if patient.current_medications is not None:
                db_patient.current_medications = patient.current_medications
            if patient.previous_diseases is not None:
                db_patient.previous_diseases = patient.previous_diseases
            if patient.surgical_history is not None:
                db_patient.surgical_history = patient.surgical_history
            if patient.family_history is not None:
                db_patient.family_history = patient.family_history

            db.commit()
            db.refresh(db_patient)
            return db_patient
        except Exception as e:
            db.rollback()
            raise Exception(f"Error updating patient: {str(e)}")

    @staticmethod
    def delete_patient(db: Session, patient_id: int):
        """Delete patient (soft delete recommended in production)"""
        try:
            db_patient = db.query(Patient).filter(Patient.id == patient_id).first()
            if not db_patient:
                return False
            
            db.delete(db_patient)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise Exception(f"Error deleting patient: {str(e)}")

    @staticmethod
    def search_patients(db: Session, search_term: str):
        """Search patients by name or email"""
        return db.query(Patient).filter(
            (Patient.full_name.ilike(f"%{search_term}%")) |
            (Patient.email.ilike(f"%{search_term}%")) |
            (Patient.patient_id.ilike(f"%{search_term}%"))
        ).all()

        if not db_patient:
            return None

        update_data = patient.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(db_patient, key, value)

        db.commit()

        db.refresh(db_patient)

        return db_patient

    @staticmethod
    def delete_patient(
        db: Session,
        patient_id: int
    ):

        db_patient = (
            db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

        if not db_patient:
            return False

        db.delete(db_patient)

        db.commit()

        return True