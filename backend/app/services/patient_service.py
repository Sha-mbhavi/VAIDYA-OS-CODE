from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate
)


class PatientService:

    @staticmethod
    def generate_patient_id(db: Session):

        total_patients = db.query(Patient).count() + 1

        return f"PAT{total_patients:06d}"

    @staticmethod
    def create_patient(
        db: Session,
        patient: PatientCreate
    ):

        new_patient = Patient(

            patient_id=PatientService.generate_patient_id(db),

            full_name=patient.full_name,

            age=patient.age,

            gender=patient.gender,

            phone=patient.phone,

            language=patient.language,

            address=patient.address

        )

        db.add(new_patient)

        db.commit()

        db.refresh(new_patient)

        return new_patient

    @staticmethod
    def get_all_patients(db: Session):

        return db.query(Patient).all()

    @staticmethod
    def get_patient_by_id(
        db: Session,
        patient_id: int
    ):

        return (
            db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

    @staticmethod
    def update_patient(
        db: Session,
        patient_id: int,
        patient: PatientUpdate
    ):

        db_patient = (
            db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

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