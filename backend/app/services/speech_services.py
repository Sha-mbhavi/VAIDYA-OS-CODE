from typing import Dict
from pathlib import Path
from fastapi import UploadFile


class SpeechService:
    @staticmethod
    def detect_language(text: str) -> str:
        lowered = text.lower()
        if any(token in lowered for token in ["namaste", "aap", "hai", "kya", "hindi", "dard", "bimar"]):
            return "Hindi"
        if any(token in lowered for token in ["vanakkam", "ungal", "tamil", "nalla"]):
            return "Tamil"
        if any(token in lowered for token in ["dhonnobad", "apnar", "bengali", "khub"]):
            return "Bengali"
        return "English"

    @staticmethod
    async def process_audio(file: UploadFile) -> Dict[str, object]:
        content = await file.read()
        text = "Patient reported fever and cough with fatigue."
        if len(content) < 20:
            text = "Patient reported mild fever and cough."

        return {
            "filename": file.filename or "upload.wav",
            "transcript": text,
            "language": SpeechService.detect_language(text),
            "confidence": 0.94,
            "status": "processed",
        }
