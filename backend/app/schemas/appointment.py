from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ==================== CREATE APPOINTMENT ====================
class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: datetime
    appointment_time: str = Field(..., description="HH:MM format")
    duration_minutes: Optional[int] = 30
    reason: Optional[str] = None
    notes: Optional[str] = None
    appointment_type: Optional[str] = Field("consultation", description="consultation, follow-up, routine-checkup")


# ==================== UPDATE APPOINTMENT ====================
class AppointmentUpdate(BaseModel):
    appointment_date: Optional[datetime] = None
    appointment_time: Optional[str] = None
    reason: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None


# ==================== APPOINTMENT RESPONSE ====================
class AppointmentResponse(BaseModel):
    id: int
    appointment_id: str
    patient_id: int
    doctor_id: int
    appointment_date: datetime
    appointment_time: str
    duration_minutes: int
    reason: Optional[str]
    notes: Optional[str]
    status: str
    appointment_type: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== APPOINTMENT DETAILED ====================
class AppointmentDetailed(AppointmentResponse):
    confirmed_at: Optional[datetime]
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True
