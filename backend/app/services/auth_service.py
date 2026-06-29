from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


class AuthService:

    @staticmethod
    def register_user(db: Session, user: UserCreate):

        # Check if email already exists
        existing_user = (
            db.query(User)
            .filter(User.email == user.email)
            .first()
        )

        if existing_user:
            raise ValueError("Email already registered")

        # Create new user
        new_user = User(
            full_name=user.full_name,
            email=user.email,
            password=hash_password(user.password),
            role=user.role
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    def login_user(db: Session, user: UserLogin):

        db_user = (
            db.query(User)
            .filter(User.email == user.email)
            .first()
        )

        if not db_user:
            raise ValueError("Invalid email or password")

        if not verify_password(
            user.password,
            db_user.password
        ):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            data={
                "sub": db_user.email,
                "role": db_user.role
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }