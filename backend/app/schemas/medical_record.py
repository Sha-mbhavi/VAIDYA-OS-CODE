from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ==================== CREATE MEDICAL RECORD ====================
class MedicalRecordCreate(BaseModel):
    patient_id: int
    symptoms: str = Field(...)
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None
    doctor_notes: Optional[str] = None
    observations: Optional[str] = None
    prescription: Optional[str] = None
    priority: Optional[str] = Field(None, description="low, normal, high, urgent")


# ==================== UPDATE MEDICAL RECORD ====================
class MedicalRecordUpdate(BaseModel):
    symptoms: Optional[str] = None
    diagnosis: Optional[str] = None
    treatment_plan: Optional[str] = None
    doctor_notes: Optional[str] = None
    observations: Optional[str] = None
    prescription: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None


# ==================== MEDICAL RECORD RESPONSE ====================
class MedicalRecordResponse(BaseModel):
    id: int
    record_id: str
    patient_id: int
    doctor_id: Optional[int]
    symptoms: str
    diagnosis: Optional[str]
    treatment_plan: Optional[str]
    doctor_notes: Optional[str]
    prescription: Optional[str]
    status: str
    priority: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
