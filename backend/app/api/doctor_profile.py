from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorResponse, DoctorDetailed
from app.services.doctor_service import DoctorService


router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"],
)


@router.post("", response_model=DoctorResponse, status_code=status.HTTP_201_CREATED)
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db),
):
    """Create a new doctor profile"""
    try:
        return DoctorService.create_doctor(db, doctor)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=List[DoctorResponse])
def get_all_doctors(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """Get all active doctors"""
    return DoctorService.get_all_doctors(db, skip, limit)


@router.get("/search/{search_term}", response_model=List[DoctorResponse])
def search_doctors(
    search_term: str,
    db: Session = Depends(get_db),
):
    """Search doctors by name, specialization, or email"""
    return DoctorService.search_doctors(db, search_term)


@router.get("/specialization/{specialization}", response_model=List[DoctorResponse])
def get_doctors_by_specialization(
    specialization: str,
    db: Session = Depends(get_db),
):
    """Get doctors by specialization"""
    return DoctorService.get_doctors_by_specialization(db, specialization)


@router.get("/{doctor_id}", response_model=DoctorDetailed)
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    """Get doctor details by ID"""
    doctor = DoctorService.get_doctor_by_id(db, doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor


@router.put("/{doctor_id}", response_model=DoctorResponse)
def update_doctor(
    doctor_id: int,
    doctor: DoctorUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update doctor information"""
    # Check if user is admin or the doctor themselves
    existing_doctor = DoctorService.get_doctor_by_id(db, doctor_id)
    if not existing_doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    try:
        return DoctorService.update_doctor(db, doctor_id, doctor)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
def deactivate_doctor(
    doctor_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Deactivate doctor account"""
    doctor = DoctorService.get_doctor_by_id(db, doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    # Only admin or the doctor themselves can deactivate
    if current_user.role != "admin" and current_user.id != doctor.user_id:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    try:
        doctor.is_active = False
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
