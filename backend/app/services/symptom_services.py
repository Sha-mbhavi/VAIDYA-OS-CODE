from typing import Dict, List


class SymptomService:
    @staticmethod
    def extract_symptoms(text: str) -> Dict[str, object]:
        lowered = text.lower()
        symptoms = []
        if "fever" in lowered:
            symptoms.append("fever")
        if "cough" in lowered:
            symptoms.append("cough")
        if "fatigue" in lowered:
            symptoms.append("fatigue")
        if "pain" in lowered:
            symptoms.append("pain")
        if "breathlessness" in lowered:
            symptoms.append("breathlessness")
        if "headache" in lowered:
            symptoms.append("headache")

        return {
            "symptoms": symptoms,
            "severity": "moderate" if len(symptoms) >= 3 else "mild",
            "duration": "acute" if "days" in lowered or "day" in lowered else "chronic",
        }
