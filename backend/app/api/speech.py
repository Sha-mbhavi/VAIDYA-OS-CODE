from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.speech_services import SpeechService

router = APIRouter(prefix="/speech", tags=["Speech"])


@router.post("/process", status_code=status.HTTP_200_OK)
async def process_speech(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    result = await SpeechService.process_audio(file)
    return result
