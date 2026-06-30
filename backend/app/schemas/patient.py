from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field, EmailStr


# ==================== CREATE PATIENT ====================
class PatientCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=0, le=150)
    gender: str = Field(..., description="Male, Female, Other")
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[EmailStr] = None
    language: str = Field(..., description="en, hi, etc")
    address: Optional[str] = None
    
    # Medical Information
    blood_group: Optional[str] = None
    height: Optional[float] = Field(None, description="Height in cm")
    weight: Optional[float] = Field(None, description="Weight in kg")
    
    # Emergency Contact
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    
    # Medical History
    medical_history: Optional[str] = None
    allergies: Optional[str] = None
    current_medications: Optional[str] = None
    previous_diseases: Optional[str] = None
    surgical_history: Optional[str] = None
    family_history: Optional[str] = None


# ==================== UPDATE PATIENT ====================
class PatientUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    age: Optional[int] = Field(None, ge=0, le=150)
    gender: Optional[str] = None
    phone: Optional[str] = Field(None, min_length=10, max_length=15)
    email: Optional[EmailStr] = None
    language: Optional[str] = None
    address: Optional[str] = None
    blood_group: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    medical_history: Optional[str] = None
    allergies: Optional[str] = None
    current_medications: Optional[str] = None
    previous_diseases: Optional[str] = None
    surgical_history: Optional[str] = None
    family_history: Optional[str] = None


# ==================== PATIENT RESPONSE ====================
class PatientResponse(BaseModel):
    id: int
    patient_id: str
    full_name: str
    age: int
    gender: str
    phone: str
    email: Optional[str]
    language: str
    address: Optional[str]
    blood_group: Optional[str]
    height: Optional[float]
    weight: Optional[float]
    bmi: Optional[float]
    emergency_contact_name: Optional[str]
    emergency_contact_phone: Optional[str]
    medical_history: Optional[str]
    allergies: Optional[str]
    current_medications: Optional[str]
    previous_diseases: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== PATIENT DETAILED ====================
class PatientDetailed(PatientResponse):
    surgical_history: Optional[str]
    family_history: Optional[str]
    emergency_contact_relation: Optional[str]

    class Config:
        from_attributes = True