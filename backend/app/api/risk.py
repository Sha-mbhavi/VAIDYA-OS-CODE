from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db

router = APIRouter(prefix="/risk", tags=["Risk"])


@router.get("", status_code=status.HTTP_200_OK)
def get_risk_summary(
    db: Session = Depends(get_db),
):
    return {
        "critical_cases": 1,
        "high_risk": 2,
        "summary": "AI Generated Draft: monitor oxygen saturation and escalation if symptoms worsen.",
    }
