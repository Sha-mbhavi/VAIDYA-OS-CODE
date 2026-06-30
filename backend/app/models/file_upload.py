from sqlalchemy import Column, Integer, String, DateTime, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class FileUpload(Base):
    __tablename__ = "file_uploads"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(String, unique=True, nullable=False, index=True)
    
    # Foreign Keys
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False, index=True)
    medical_record_id = Column(Integer, ForeignKey("medical_records.id"), nullable=True, index=True)
    
    # File Information
    original_filename = Column(String, nullable=False)
    stored_filename = Column(String, nullable=False, unique=True)
    file_path = Column(String, nullable=False)
    file_url = Column(String, nullable=True)
    file_type = Column(String, nullable=False)  # report, prescription, lab-report, image, document
    mime_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)  # in bytes
    
    # File Metadata
    description = Column(Text, nullable=True)
    uploaded_by = Column(String, nullable=True)  # doctor/patient
    category = Column(String, nullable=True)
    
    # Virus Scan Status
    scan_status = Column(String, nullable=False, default="pending")  # pending, scanned, safe, quarantined
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    scanned_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    patient = relationship("Patient")
    medical_record = relationship("MedicalRecord", back_populates="file_uploads")
