from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ------------------------------------
# Create Patient
# ------------------------------------
class PatientCreate(BaseModel):

    full_name: str = Field(..., min_length=2, max_length=100)

    age: int = Field(..., ge=0, le=120)

    gender: str

    phone: str = Field(..., min_length=10, max_length=15)

    language: str

    address: Optional[str] = None


# ------------------------------------
# Update Patient
# ------------------------------------
class PatientUpdate(BaseModel):

    full_name: Optional[str] = Field(None, min_length=2, max_length=100)

    age: Optional[int] = Field(None, ge=0, le=120)

    gender: Optional[str] = None

    phone: Optional[str] = Field(None, min_length=10, max_length=15)

    language: Optional[str] = None

    address: Optional[str] = None


# ------------------------------------
# Response Schema
# ------------------------------------
class PatientResponse(BaseModel):

    id: int

    patient_id: str

    full_name: str

    age: int

    gender: str

    phone: str

    language: str

    address: Optional[str]

    created_at: datetime

    class Config:
        from_attributes = True