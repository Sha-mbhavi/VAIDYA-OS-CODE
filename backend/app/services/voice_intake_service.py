from sqlalchemy.orm import Session
from datetime import datetime
import json
import re
from app.models.voice_intake import VoiceIntake
from app.schemas.voice_intake import VoiceIntakeCreate, ExtractedMedicalData


class VoiceIntakeService:

    @staticmethod
    def generate_intake_id(db: Session):
        """Generate unique voice intake ID"""
        total_intakes = db.query(VoiceIntake).count() + 1
        return f"VIN{total_intakes:08d}"

    @staticmethod
    def create_voice_intake(db: Session, intake: VoiceIntakeCreate):
        """Create new voice intake record"""
        try:
            new_intake = VoiceIntake(
                intake_id=VoiceIntakeService.generate_intake_id(db),
                patient_id=intake.patient_id,
                audio_file_url=intake.audio_file_url,
                language=intake.language or "en",
                status="pending",
            )
            db.add(new_intake)
            db.commit()
            db.refresh(new_intake)
            return new_intake
        except Exception as e:
            db.rollback()
            raise Exception(f"Error creating voice intake: {str(e)}")

    @staticmethod
    def get_intake_by_id(db: Session, intake_id: int):
        """Get voice intake by ID"""
        return db.query(VoiceIntake).filter(VoiceIntake.id == intake_id).first()

    @staticmethod
    def get_intakes_by_patient(db: Session, patient_id: int, skip: int = 0, limit: int = 100):
        """Get all voice intakes for a patient"""
        return db.query(VoiceIntake).filter(
            VoiceIntake.patient_id == patient_id
        ).offset(skip).limit(limit).all()

    @staticmethod
    def process_transcript(db: Session, intake_id: int, transcript: str):
        """Process and extract medical information from transcript"""
        try:
            db_intake = db.query(VoiceIntake).filter(VoiceIntake.id == intake_id).first()
            if not db_intake:
                return None

            db_intake.raw_transcript = transcript
            db_intake.status = "processing"
            db.commit()

            # Extract medical information from transcript
            extracted = VoiceIntakeService._extract_medical_data(transcript)
            
            db_intake.processed_transcript = transcript
            db_intake.extracted_data = json.dumps(extracted)
            db_intake.status = "completed"
            db_intake.processed_at = datetime.now()
            
            db.commit()
            db.refresh(db_intake)
            return db_intake
        except Exception as e:
            db.rollback()
            db_intake = db.query(VoiceIntake).filter(VoiceIntake.id == intake_id).first()
            if db_intake:
                db_intake.status = "failed"
                db_intake.processing_error = str(e)
                db.commit()
            raise Exception(f"Error processing transcript: {str(e)}")

    @staticmethod
    def _extract_medical_data(transcript: str) -> dict:
        """Extract medical information from transcript using NLP patterns"""
        data = {
            "name": None,
            "age": None,
            "symptoms": [],
            "duration": None,
            "previous_diseases": [],
            "allergies": [],
            "current_medications": [],
            "other_info": None,
        }

        if not transcript:
            return data

        lower_transcript = transcript.lower()

        # Extract name - look for "My name is" or "I am"
        name_patterns = [
            r"my name is (\w+)",
            r"i am (\w+)",
            r"call me (\w+)",
            r"i'?m (\w+)",
        ]
        for pattern in name_patterns:
            match = re.search(pattern, lower_transcript)
            if match:
                data["name"] = match.group(1).capitalize()
                break

        # Extract age - look for numbers followed by "years" or "years old"
        age_patterns = [
            r"(\d{1,3})\s*years?\s*old",
            r"i'?m\s*(\d{1,3})\s*years?",
            r"age\s*(?:is\s*)?(\d{1,3})",
        ]
        for pattern in age_patterns:
            match = re.search(pattern, lower_transcript)
            if match:
                age = int(match.group(1))
                if 0 < age < 150:
                    data["age"] = age
                    break

        # Extract symptoms - look for common medical terms
        symptom_keywords = {
            "fever": ["fever", "high temperature", "temperature"],
            "headache": ["headache", "head pain", "head ache"],
            "cough": ["cough", "coughing", "persistent cough"],
            "cold": ["cold", "runny nose", "sore throat"],
            "dizziness": ["dizzy", "dizziness", "vertigo"],
            "nausea": ["nausea", "feel sick", "feel nauseous"],
            "vomiting": ["vomiting", "vomit", "throwing up"],
            "pain": ["pain", "ache", "hurts", "painful"],
            "fatigue": ["fatigue", "tired", "exhausted"],
            "weakness": ["weakness", "weak"],
            "anxiety": ["anxiety", "anxious"],
            "depression": ["depression", "depressed"],
            "sleep issues": ["can't sleep", "insomnia", "sleep issues"],
        }

        for symptom, keywords in symptom_keywords.items():
            for keyword in keywords:
                if keyword in lower_transcript:
                    if symptom not in data["symptoms"]:
                        data["symptoms"].append(symptom)
                    break

        # Extract duration - look for time patterns
        duration_patterns = [
            r"(?:for|last)\s+(\d+)\s*(day|week|month)s?",
            r"(\d+)\s*(day|week|month)s?\s*(?:ago|now)",
        ]
        for pattern in duration_patterns:
            match = re.search(pattern, lower_transcript)
            if match:
                duration = f"{match.group(1)} {match.group(2)}s"
                data["duration"] = duration
                break

        # Extract allergies
        allergy_patterns = [
            r"allerg(?:ic|y)\s+to\s+([^.,]+)",
            r"allergies?:?\s+([^.,]+)",
        ]
        for pattern in allergy_patterns:
            matches = re.findall(pattern, lower_transcript)
            for match in matches:
                items = [item.strip() for item in match.split(",")]
                data["allergies"].extend(items)

        # Extract current medications
        med_patterns = [
            r"(?:taking|on|taking)\s+([^.,]+)\s+(?:medicine|medication|tablets?)",
            r"medications?:?\s+([^.,]+)",
        ]
        for pattern in med_patterns:
            matches = re.findall(pattern, lower_transcript)
            for match in matches:
                items = [item.strip() for item in match.split(",")]
                data["current_medications"].extend(items)

        # Extract previous diseases
        disease_keywords = ["diabetes", "hypertension", "heart", "asthma", "tuberculosis", "thyroid"]
        for disease in disease_keywords:
            if disease in lower_transcript:
                if disease not in data["previous_diseases"]:
                    data["previous_diseases"].append(disease)

        # Store any remaining info
        data["other_info"] = transcript[:500] if len(transcript) > 500 else transcript

        return data

    @staticmethod
    def get_extracted_data(db: Session, intake_id: int) -> dict:
        """Get extracted medical data from voice intake"""
        db_intake = db.query(VoiceIntake).filter(VoiceIntake.id == intake_id).first()
        if not db_intake or not db_intake.extracted_data:
            return {}
        
        try:
            return json.loads(db_intake.extracted_data)
        except:
            return {}

    @staticmethod
    def delete_voice_intake(db: Session, intake_id: int):
        """Delete voice intake"""
        try:
            db_intake = db.query(VoiceIntake).filter(VoiceIntake.id == intake_id).first()
            if not db_intake:
                return False
            
            db.delete(db_intake)
            db.commit()
            return True
        except Exception as e:
            db.rollback()
            raise Exception(f"Error deleting voice intake: {str(e)}")
