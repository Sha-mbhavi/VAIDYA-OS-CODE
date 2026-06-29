from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
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

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Clinical Intake Platform Backend",
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/", tags=["Home"])
def home():
    return {
        "message": "Welcome to VaidyaOS Backend",
        "version": "1.0.0",
        "status": "Running",
    }