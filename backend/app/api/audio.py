import os
from pathlib import Path
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.audio import AudioFile
from app.models.consultation import Consultation
from app.schemas.audio import AudioFileResponse

router = APIRouter(prefix="/audio", tags=["Audio"])
UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("", response_model=AudioFileResponse, status_code=status.HTTP_201_CREATED)
async def upload_audio(
    consultation_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    consultation = db.query(Consultation).filter(Consultation.id == consultation_id).first()
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")

    file_bytes = await file.read()
    storage_path = UPLOAD_DIR / f"{consultation_id}_{file.filename}"
    with storage_path.open("wb") as handle:
        handle.write(file_bytes)

    audio_record = AudioFile(
        consultation_id=consultation_id,
        filename=file.filename or "audio.wav",
        content_type=file.content_type,
        storage_path=str(storage_path),
        size_bytes=len(file_bytes),
    )
    db.add(audio_record)
    db.commit()
    db.refresh(audio_record)
    return audio_record


@router.get("/{consultation_id}", response_model=list[AudioFileResponse])
def list_audio(
    consultation_id: int,
    db: Session = Depends(get_db),
):
    return db.query(AudioFile).filter(AudioFile.consultation_id == consultation_id).all()
