from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.config import settings
from app.core.database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

# Import routers
from app.api.auth import router as auth_router
from app.api.patient import router as patient_router
from app.api.consultation import router as consultation_router
from app.api.speech import router as speech_router
from app.api.summary import router as summary_router
from app.api.soap import router as soap_router
from app.api.risk import router as risk_router
from app.api.admin import router as admin_router
from app.api.symptoms import router as symptoms_router
from app.api.audio import router as audio_router
from app.api.doctor_profile import router as doctor_router
from app.api.medical_records import router as medical_records_router
from app.api.appointments import router as appointments_router
from app.api.voice_intake import router as voice_intake_router

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Clinical Intake Platform Backend",
    version=settings.APP_VERSION,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include all routers
app.include_router(auth_router)
app.include_router(patient_router)
app.include_router(consultation_router)
app.include_router(speech_router)
app.include_router(summary_router)
app.include_router(soap_router)
app.include_router(risk_router)
app.include_router(admin_router)
app.include_router(symptoms_router)
app.include_router(audio_router)
app.include_router(doctor_router)
app.include_router(medical_records_router)
app.include_router(appointments_router)
app.include_router(voice_intake_router)


@app.get("/", tags=["Home"])
def home():
    return {
        "message": "Welcome to VaidyaOS Backend",
        "version": "1.0.0",
        "status": "Running",
        "docs": "/docs",
        "api": {
            "auth": "/auth",
            "patients": "/patients",
            "doctors": "/doctors",
            "medical_records": "/medical-records",
            "appointments": "/appointments",
            "voice_intake": "/voice",
            "consultations": "/consultations",
        }
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "version": settings.APP_VERSION}