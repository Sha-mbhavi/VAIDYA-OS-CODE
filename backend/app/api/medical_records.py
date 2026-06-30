from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.medical_record import MedicalRecordCreate, MedicalRecordUpdate, MedicalRecordResponse
from app.services.medical_record_service import MedicalRecordService


router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"],
)


@router.post("", response_model=MedicalRecordResponse, status_code=status.HTTP_201_CREATED)
def create_medical_record(
    record: MedicalRecordCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new medical record"""
    try:
        return MedicalRecordService.create_medical_record(db, record)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=List[MedicalRecordResponse])
def get_all_records(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all medical records"""
    return MedicalRecordService.get_all_records(db, skip, limit)


@router.get("/patient/{patient_id}", response_model=List[MedicalRecordResponse])
def get_patient_records(
    patient_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all medical records for a patient"""
    return MedicalRecordService.get_records_by_patient(db, patient_id, skip, limit)


@router.get("/doctor/{doctor_id}", response_model=List[MedicalRecordResponse])
def get_doctor_records(
    doctor_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all medical records reviewed by a doctor"""
    return MedicalRecordService.get_records_by_doctor(db, doctor_id, skip, limit)


@router.get("/{record_id}", response_model=MedicalRecordResponse)
def get_record(
    record_id: int,
    db: Session = Depends(get_db),
):
    """Get medical record by ID"""
    record = MedicalRecordService.get_record_by_id(db, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Medical record not found")
    return record


@router.put("/{record_id}", response_model=MedicalRecordResponse)
def update_record(
    record_id: int,
    record: MedicalRecordUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update medical record"""
    existing_record = MedicalRecordService.get_record_by_id(db, record_id)
    if not existing_record:
        raise HTTPException(status_code=404, detail="Medical record not found")
    
    # Only doctor can update records
    if current_user.role != "doctor" and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only doctors can update records")
    
    try:
        return MedicalRecordService.update_medical_record(db, record_id, record)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{record_id}/mark-reviewed", response_model=MedicalRecordResponse)
def mark_record_reviewed(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Mark medical record as reviewed by doctor"""
    if current_user.role not in ["doctor", "admin"]:
        raise HTTPException(status_code=403, detail="Only doctors can review records")
    
    try:
        return MedicalRecordService.mark_as_reviewed(db, record_id, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_record(
    record_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete medical record"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can delete records")
    
    try:
        MedicalRecordService.delete_medical_record(db, record_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
