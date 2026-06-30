from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ==================== CREATE VOICE INTAKE ====================
class VoiceIntakeCreate(BaseModel):
    patient_id: int
    audio_file_url: str
    language: Optional[str] = "en"


# ==================== VOICE INTAKE RESPONSE ====================
class VoiceIntakeResponse(BaseModel):
    id: int
    intake_id: str
    patient_id: int
    audio_file_url: str
    raw_transcript: Optional[str]
    processed_transcript: Optional[str]
    transcription_confidence: Optional[float]
    extracted_data: Optional[str]  # JSON
    status: str
    language: str
    created_at: datetime
    updated_at: datetime
    processed_at: Optional[datetime]

    class Config:
        from_attributes = True


# ==================== EXTRACTED MEDICAL DATA ====================
class ExtractedMedicalData(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    symptoms: Optional[list] = None
    duration: Optional[str] = None
    previous_diseases: Optional[list] = None
    allergies: Optional[list] = None
    current_medications: Optional[list] = None
    other_info: Optional[str] = None

    class Config:
        from_attributes = True
