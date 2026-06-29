from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.consultation import Consultation
from app.schemas.consultation import ConsultationCreate, ConsultationResponse, ConsultationUpdate
from app.services.interview_service import InterviewService
from app.services.summary_service import SummaryService

router = APIRouter(prefix="/consultations", tags=["Consultations"])


@router.post("", response_model=ConsultationResponse, status_code=status.HTTP_201_CREATED)
def create_consultation(
    consultation: ConsultationCreate,
    db: Session = Depends(get_db),
):
    consultation_id = f"CONS{len(db.query(Consultation).all()) + 1:06d}"
    new_consultation = Consultation(
        consultation_id=consultation_id,
        patient_id=consultation.patient_id,
        chief_complaint=consultation.chief_complaint,
        notes=consultation.notes,
        priority=consultation.priority,
        status="pending",
    )
    db.add(new_consultation)
    db.commit()
    db.refresh(new_consultation)

    follow_up_questions = InterviewService.generate_follow_up_questions(consultation.chief_complaint)
    summary_payload = SummaryService.build_summary(consultation.chief_complaint, consultation.notes)
    new_consultation.summary = summary_payload["summary"]
    new_consultation.risk_level = summary_payload["risk_level"]
    db.commit()
    db.refresh(new_consultation)

    return new_consultation


@router.get("", response_model=List[ConsultationResponse])
def list_consultations(
    db: Session = Depends(get_db),
):
    return db.query(Consultation).order_by(Consultation.created_at.desc()).all()


@router.get("/{consultation_id}", response_model=ConsultationResponse)
def get_consultation(
    consultation_id: int,
    db: Session = Depends(get_db),
):
    consultation = db.query(Consultation).filter(Consultation.id == consultation_id).first()
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")
    return consultation


@router.patch("/{consultation_id}", response_model=ConsultationResponse)
def update_consultation(
    consultation_id: int,
    consultation_update: ConsultationUpdate,
    db: Session = Depends(get_db),
):
    consultation = db.query(Consultation).filter(Consultation.id == consultation_id).first()
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")

    update_data = consultation_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(consultation, key, value)

    db.commit()
    db.refresh(consultation)
    return consultation
