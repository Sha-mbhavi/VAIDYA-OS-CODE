from typing import List

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientResponse,
    PatientDetailed,
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
    """Create a new patient with complete medical information"""
    try:
        return PatientService.create_patient(db, patient)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get(
    "",
    response_model=List[PatientResponse],
)
def get_all_patients(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all patients with pagination"""
    return PatientService.get_all_patients(db, skip, limit)


@router.get(
    "/search/{search_term}",
    response_model=List[PatientResponse],
)
def search_patients(
    search_term: str,
    db: Session = Depends(get_db),
):
    """Search patients by name, email, or patient ID"""
    return PatientService.search_patients(db, search_term)


@router.get(
    "/{patient_id}",
    response_model=PatientDetailed,
)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):
    """Get patient details by ID"""
    patient = PatientService.get_patient_by_id(db, patient_id)

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
    """Update patient information"""
    updated_patient = PatientService.update_patient(db, patient_id, patient)

    if not updated_patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found",
        )

    return updated_patient


@router.delete(
    "/{patient_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_patient(
    patient_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete patient (only admins can delete)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admins can delete patients",
        )

    try:
        PatientService.delete_patient(db, patient_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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