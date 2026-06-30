from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from sqlalchemy.orm import Session
import os
import uuid

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.voice_intake import VoiceIntakeCreate, VoiceIntakeResponse, ExtractedMedicalData
from app.services.voice_intake_service import VoiceIntakeService


router = APIRouter(
    prefix="/voice",
    tags=["Voice Intake"],
)

# Create upload directory if it doesn't exist
UPLOAD_DIR = "uploads/voice"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=VoiceIntakeResponse, status_code=status.HTTP_201_CREATED)
def upload_voice(
    patient_id: int,
    file: UploadFile = File(...),
    language: str = "en",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload voice file for intake"""
    try:
        # Validate file
        if file.content_type not in ["audio/mpeg", "audio/wav", "audio/mp4", "audio/ogg"]:
            raise HTTPException(status_code=400, detail="Invalid audio format")
        
        # Save file
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as f:
            content = file.file.read()
            f.write(content)
        
        # Create voice intake record
        intake = VoiceIntakeCreate(
            patient_id=patient_id,
            audio_file_url=f"/uploads/voice/{unique_filename}",
            language=language,
        )
        
        return VoiceIntakeService.create_voice_intake(db, intake)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=List[VoiceIntakeResponse])
def get_voice_intakes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all voice intakes"""
    return VoiceIntakeService.get_intakes_by_patient(db, None, skip, limit) or []


@router.get("/patient/{patient_id}", response_model=List[VoiceIntakeResponse])
def get_patient_voice_intakes(
    patient_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Get all voice intakes for a patient"""
    return VoiceIntakeService.get_intakes_by_patient(db, patient_id, skip, limit)


@router.get("/{intake_id}", response_model=VoiceIntakeResponse)
def get_voice_intake(
    intake_id: int,
    db: Session = Depends(get_db),
):
    """Get voice intake by ID"""
    intake = VoiceIntakeService.get_intake_by_id(db, intake_id)
    if not intake:
        raise HTTPException(status_code=404, detail="Voice intake not found")
    return intake


@router.post("/{intake_id}/process", response_model=VoiceIntakeResponse)
def process_voice_intake(
    intake_id: int,
    transcript: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Process voice intake with transcript"""
    try:
        return VoiceIntakeService.process_transcript(db, intake_id, transcript)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{intake_id}/extracted-data")
def get_extracted_data(
    intake_id: int,
    db: Session = Depends(get_db),
):
    """Get extracted medical data from voice intake"""
    try:
        data = VoiceIntakeService.get_extracted_data(db, intake_id)
        if not data:
            raise HTTPException(status_code=404, detail="No extracted data found")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{intake_id}/create-medical-record")
def create_medical_record_from_voice(
    intake_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create medical record from voice intake extracted data"""
    try:
        from app.services.medical_record_service import MedicalRecordService
        from app.models.voice_intake import VoiceIntake
        
        intake = VoiceIntakeService.get_intake_by_id(db, intake_id)
        if not intake:
            raise HTTPException(status_code=404, detail="Voice intake not found")
        
        if intake.status != "completed":
            raise HTTPException(status_code=400, detail="Voice intake not processed yet")
        
        extracted_data = VoiceIntakeService.get_extracted_data(db, intake_id)
        
        # Create medical record from extracted data
        from app.schemas.medical_record import MedicalRecordCreate
        
        record_data = MedicalRecordCreate(
            patient_id=intake.patient_id,
            symptoms=", ".join(extracted_data.get("symptoms", [])) or "Not specified",
            diagnosis=None,
            treatment_plan=None,
            doctor_notes=extracted_data.get("other_info"),
            observations=None,
            prescription=None,
            priority="normal",
        )
        
        return MedicalRecordService.create_medical_record(db, record_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{intake_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_voice_intake(
    intake_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete voice intake"""
    try:
        VoiceIntakeService.delete_voice_intake(db, intake_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
