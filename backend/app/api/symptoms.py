from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.symptom_services import SymptomService
from app.services.risk_service import RiskService

router = APIRouter(prefix="/symptoms", tags=["Symptoms"])


@router.post("", status_code=status.HTTP_200_OK)
def analyze_symptoms(
    text: str,
    db: Session = Depends(get_db),
):
    symptoms = SymptomService.extract_symptoms(text)
    risk = RiskService.score_risk(text)
    return {
        "symptoms": symptoms["symptoms"],
        "severity": symptoms["severity"],
        "duration": symptoms["duration"],
        "risk": risk,
    }
