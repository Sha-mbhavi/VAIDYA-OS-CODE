from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientResponse,
)
from app.services.patient_service import PatientService


router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.post(
    "",
    response_model=PatientResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    return PatientService.create_patient(db, patient)


@router.get(
    "",
    response_model=List[PatientResponse],
)
def get_all_patients(
    db: Session = Depends(get_db),
):
    return PatientService.get_all_patients(db)


@router.get(
    "/{patient_id}",
    response_model=PatientResponse,
)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):

    patient = PatientService.get_patient_by_id(
        db,
        patient_id,
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    return patient


@router.put(
    "/{patient_id}",
    response_model=PatientResponse,
)
def update_patient(
    patient_id: int,
    patient: PatientUpdate,
    db: Session = Depends(get_db),
):

    updated_patient = PatientService.update_patient(
        db,
        patient_id,
        patient,
    )

    if not updated_patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    return updated_patient


@router.delete(
    "/{patient_id}",
)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):

    deleted = PatientService.delete_patient(
        db,
        patient_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    return {
        "message": "Patient deleted successfully"
    }