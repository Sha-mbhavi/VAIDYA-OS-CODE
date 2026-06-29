from typing import Dict, List


class RiskService:
    @staticmethod
    def score_risk(text: str) -> Dict[str, object]:
        lowered = text.lower()
        red_flags = [term for term in ["breathlessness", "chest pain", "severe", "unconscious", "bleeding", "high fever"] if term in lowered]
        score = 0
        if red_flags:
            score = min(100, 40 + len(red_flags) * 15)
        elif any(term in lowered for term in ["fever", "cough", "fatigue"]):
            score = 35
        else:
            score = 15

        if score >= 70:
            level = "critical"
        elif score >= 45:
            level = "high"
        elif score >= 25:
            level = "medium"
        else:
            level = "low"

        return {
            "score": score,
            "level": level,
            "red_flags": red_flags,
            "recommendation": "AI Generated Draft: escalate if symptoms worsen or new red flags appear.",
        }
