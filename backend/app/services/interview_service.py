from typing import List


class InterviewService:
    @staticmethod
    def generate_follow_up_questions(chief_complaint: str) -> List[str]:
        complaint = chief_complaint.lower()
        questions = [
            "When did the symptoms begin?",
            "Is the pain constant or intermittent?",
            "Any fever, breathlessness, or dehydration?",
        ]

        if "fever" in complaint or "cough" in complaint:
            questions.append("Have you noticed any chest pain or shortness of breath?")

        if "pain" in complaint:
            questions.append("Can you describe the pain location and severity?")

        return questions[:4]
