from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ConsultationCreate(BaseModel):
    patient_id: int
    chief_complaint: str = Field(..., min_length=3, max_length=500)
    notes: Optional[str] = None
    priority: str = Field(default="medium", max_length=20)


class ConsultationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    summary: Optional[str] = None
    risk_level: Optional[str] = None
    priority: Optional[str] = None


class ConsultationResponse(BaseModel):
    id: int
    consultation_id: str
    patient_id: int
    doctor_id: Optional[int] = None
    status: str
    priority: str
    chief_complaint: str
    notes: Optional[str] = None
    summary: Optional[str] = None
    risk_level: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
