from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/users", status_code=status.HTTP_200_OK)
def list_users(
    db: Session = Depends(get_db),
):
    return db.query(User).all()


@router.get("/overview", status_code=status.HTTP_200_OK)
def admin_overview(
    db: Session = Depends(get_db),
):
    return {
        "active_users": 4,
        "doctors": 2,
        "receptionists": 1,
        "patients": 8,
    }
