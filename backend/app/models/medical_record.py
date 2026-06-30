from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    record_id = Column(String, unique=True, nullable=False, index=True)
    
    # Foreign Keys
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=True, index=True)
    consultation_id = Column(Integer, ForeignKey("consultations.id"), nullable=True, index=True)
    
    # Medical Information
    symptoms = Column(Text, nullable=False)  # JSON or comma-separated
    diagnosis = Column(Text, nullable=True)
    treatment_plan = Column(Text, nullable=True)
    
    # Doctor Notes
    doctor_notes = Column(Text, nullable=True)
    observations = Column(Text, nullable=True)
    
    # Prescription & Lab
    prescription = Column(Text, nullable=True)  # JSON format
    lab_reports = Column(Text, nullable=True)  # File paths or URLs
    test_results = Column(Text, nullable=True)
    
    # Record Status
    status = Column(String, nullable=False, default="pending")  # pending, reviewed, completed
    priority = Column(String, nullable=True, default="normal")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    reviewed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    patient = relationship("Patient", back_populates="medical_records")
    doctor = relationship("Doctor", back_populates="medical_records")
    file_uploads = relationship("FileUpload", back_populates="medical_record")
