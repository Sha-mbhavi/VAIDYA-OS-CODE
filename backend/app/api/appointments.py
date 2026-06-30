from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.appointment import AppointmentCreate, AppointmentUpdate, AppointmentResponse, AppointmentDetailed
from app.services.appointment_service import AppointmentService


router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
)


@router.post("", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
def create_appointment(
    appointment: AppointmentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new appointment"""
    try:
        return AppointmentService.create_appointment(db, appointment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=List[AppointmentResponse])
def get_all_appointments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all appointments"""
    return AppointmentService.get_all_appointments(db, skip, limit)


@router.get("/patient/{patient_id}", response_model=List[AppointmentResponse])
def get_patient_appointments(
    patient_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all appointments for a patient"""
    return AppointmentService.get_appointments_by_patient(db, patient_id, skip, limit)


@router.get("/doctor/{doctor_id}/upcoming", response_model=List[AppointmentDetailed])
def get_doctor_upcoming_appointments(
    doctor_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get upcoming appointments for a doctor"""
    return AppointmentService.get_upcoming_appointments(db, doctor_id)


@router.get("/doctor/{doctor_id}", response_model=List[AppointmentResponse])
def get_doctor_appointments(
    doctor_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all appointments for a doctor"""
    return AppointmentService.get_appointments_by_doctor(db, doctor_id, skip, limit)


@router.get("/{appointment_id}", response_model=AppointmentDetailed)
def get_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
):
    """Get appointment by ID"""
    appointment = AppointmentService.get_appointment_by_id(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment


@router.put("/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(
    appointment_id: int,
    appointment: AppointmentUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update appointment"""
    existing_appointment = AppointmentService.get_appointment_by_id(db, appointment_id)
    if not existing_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    try:
        return AppointmentService.update_appointment(db, appointment_id, appointment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{appointment_id}/confirm", response_model=AppointmentResponse)
def confirm_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Confirm appointment"""
    try:
        return AppointmentService.confirm_appointment(db, appointment_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{appointment_id}/cancel", response_model=AppointmentResponse)
def cancel_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Cancel appointment"""
    try:
        return AppointmentService.cancel_appointment(db, appointment_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(
    appointment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete appointment"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can delete appointments")
    
    try:
        AppointmentService.delete_appointment(db, appointment_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
