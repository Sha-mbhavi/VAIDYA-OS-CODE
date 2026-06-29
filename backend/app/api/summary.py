from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.summary_service import SummaryService

router = APIRouter(prefix="/summary", tags=["Summary"])


@router.post("", status_code=200)
def generate_summary(
    chief_complaint: str,
    notes: str | None = None,
    db: Session = Depends(get_db),
):
    return SummaryService.build_summary(chief_complaint, notes)
