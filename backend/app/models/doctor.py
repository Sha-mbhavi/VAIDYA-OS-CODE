from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(String, unique=True, nullable=False, index=True)
    
    # Basic Information
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    
    # Professional Information
    specialization = Column(String, nullable=False)
    specialty = Column(String, nullable=True)  # Keeping for backward compatibility
    hospital_clinic_name = Column(String, nullable=True)
    experience_years = Column(Integer, nullable=True)
    license_number = Column(String, nullable=True, unique=True)
    license_expiry = Column(DateTime(timezone=True), nullable=True)
    
    # Education & Certifications
    education = Column(Text, nullable=True)
    certifications = Column(Text, nullable=True)
    
    # Profile
    profile_image_url = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    availability_status = Column(String, nullable=False, default="online")
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    consultations = relationship("Consultation", back_populates="doctor")
    medical_records = relationship("MedicalRecord", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor")
