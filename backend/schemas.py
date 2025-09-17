# schemas.py
from typing import Optional
from sqlmodel import SQLModel

class CandidateCreate(SQLModel):
    name: str
    email: str
    skills: Optional[str] = None

class JobCreate(SQLModel):
    title: str
    description: Optional[str] = None
    required_skills: Optional[str] = None
    recruiter_id: Optional[int] = None

class ApplyPayload(SQLModel):
    candidate_id: int
