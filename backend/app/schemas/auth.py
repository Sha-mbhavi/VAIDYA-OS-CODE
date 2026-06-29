from pydantic import BaseModel, EmailStr
from datetime import datetime


# -----------------------------
# User Registration Request
# -----------------------------
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str


# -----------------------------
# User Login Request
# -----------------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# -----------------------------
# User Response
# -----------------------------
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# JWT Token Response
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str


# -----------------------------
# JWT Payload
# -----------------------------
class TokenData(BaseModel):
    email: str | None = None