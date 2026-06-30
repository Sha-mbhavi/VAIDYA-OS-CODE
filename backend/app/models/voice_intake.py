from sqlalchemy import Column, Integer, String, DateTime, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class VoiceIntake(Base):
    __tablename__ = "voice_intakes"

    id = Column(Integer, primary_key=True, index=True)
    intake_id = Column(String, unique=True, nullable=False, index=True)
    
    # Foreign Keys
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False, index=True)
    
    # Audio File Information
    audio_file_url = Column(String, nullable=False)
    audio_duration = Column(Float, nullable=True)  # in seconds
    
    # Transcription
    raw_transcript = Column(Text, nullable=True)
    processed_transcript = Column(Text, nullable=True)
    transcription_confidence = Column(Float, nullable=True)
    
    # Extracted Medical Information (JSON)
    extracted_data = Column(Text, nullable=True)  # JSON format
    
    # Processing Status
    status = Column(String, nullable=False, default="pending")  # pending, processing, completed, failed
    processing_error = Column(Text, nullable=True)
    
    # Languages
    language = Column(String, nullable=False, default="en")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    processed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    patient = relationship("Patient", back_populates="voice_intakes")
