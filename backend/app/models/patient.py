from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=True, index=True)
    
    patient_id = Column(String, unique=True, nullable=False, index=True)
    full_name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True, unique=True, index=True)
    language = Column(String, nullable=False)
    address = Column(String, nullable=True)
    
    # Medical Information
    blood_group = Column(String, nullable=True)
    height = Column(Float, nullable=True)  # in cm
    weight = Column(Float, nullable=True)  # in kg
    bmi = Column(Float, nullable=True)
    
    # Emergency Contact
    emergency_contact_name = Column(String, nullable=True)
    emergency_contact_phone = Column(String, nullable=True)
    emergency_contact_relation = Column(String, nullable=True)
    
    # Medical History
    medical_history = Column(Text, nullable=True)
    allergies = Column(Text, nullable=True)  # JSON or comma-separated
    current_medications = Column(Text, nullable=True)  # JSON or comma-separated
    previous_diseases = Column(Text, nullable=True)  # JSON or comma-separated
    surgical_history = Column(Text, nullable=True)
    family_history = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    consultations = relationship("Consultation", back_populates="patient")
    medical_records = relationship("MedicalRecord", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient")
    voice_intakes = relationship("VoiceIntake", back_populates="patient")