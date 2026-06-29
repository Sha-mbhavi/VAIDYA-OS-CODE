from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AudioFileResponse(BaseModel):
    id: int
    consultation_id: int
    filename: str
    content_type: Optional[str] = None
    storage_path: str
    size_bytes: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True
