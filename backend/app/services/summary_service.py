from typing import Dict

from app.services.risk_service import RiskService
from app.services.symptom_services import SymptomService


class SummaryService:
    @staticmethod
    def build_summary(chief_complaint: str, notes: str | None = None) -> Dict[str, object]:
        symptoms = SymptomService.extract_symptoms(chief_complaint)
        risk = RiskService.score_risk(chief_complaint)
        return {
            "summary": f"AI Generated Draft: {chief_complaint}. Symptoms detected: {', '.join(symptoms['symptoms']) or 'none'}.",
            "risk_level": risk["level"],
            "follow_up_questions": [
                "When did symptoms start?",
                "Any fever or breathlessness?",
                "Any worsening or new symptoms?",
            ],
            "symptoms": symptoms,
            "risk": risk,
        }
