from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, EmailStr


# ==================== CREATE DOCTOR ====================
class DoctorCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    specialization: str = Field(...)
    hospital_clinic_name: Optional[str] = None
    experience_years: Optional[int] = None
    license_number: Optional[str] = None
    address: Optional[str] = None
    bio: Optional[str] = None


# ==================== UPDATE DOCTOR ====================
class DoctorUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = None
    specialization: Optional[str] = None
    hospital_clinic_name: Optional[str] = None
    experience_years: Optional[int] = None
    license_number: Optional[str] = None
    address: Optional[str] = None
    bio: Optional[str] = None
    availability_status: Optional[str] = None


# ==================== DOCTOR RESPONSE ====================
class DoctorResponse(BaseModel):
    id: int
    doctor_id: str
    full_name: str
    email: str
    phone: Optional[str]
    specialization: str
    hospital_clinic_name: Optional[str]
    experience_years: Optional[int]
    license_number: Optional[str]
    availability_status: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== DOCTOR DETAILED ====================
class DoctorDetailed(DoctorResponse):
    address: Optional[str]
    bio: Optional[str]
    education: Optional[str]
    certifications: Optional[str]
    profile_image_url: Optional[str]

    class Config:
        from_attributes = True
