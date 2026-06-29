from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.soap import SOAPNote
from app.models.consultation import Consultation

router = APIRouter(prefix="/soap", tags=["SOAP"])


@router.post("", status_code=status.HTTP_201_CREATED)
def create_soap_note(
    consultation_id: int,
    subjective: str,
    objective: str,
    assessment: str,
    plan: str,
    db: Session = Depends(get_db),
):
    consultation = db.query(Consultation).filter(Consultation.id == consultation_id).first()
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")

    existing = db.query(SOAPNote).filter(SOAPNote.consultation_id == consultation_id).first()
    if existing:
        existing.subjective = subjective
        existing.objective = objective
        existing.assessment = assessment
        existing.plan = plan
        db.commit()
        db.refresh(existing)
        return existing

    note = SOAPNote(
        consultation_id=consultation_id,
        subjective=subjective,
        objective=objective,
        assessment=assessment,
        plan=plan,
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


@router.get("/{consultation_id}")
def get_soap_note(
    consultation_id: int,
    db: Session = Depends(get_db),
):
    note = db.query(SOAPNote).filter(SOAPNote.consultation_id == consultation_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="SOAP note not found")
    return note
