# models.py
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Application(SQLModel, table=True):
    candidate_id: Optional[int] = Field(default=None, foreign_key="candidate.id", primary_key=True)
    job_id: Optional[int] = Field(default=None, foreign_key="job.id", primary_key=True)

class Candidate(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    skills: Optional[str] = None
    # relationship to jobs via Application
    jobs: List["Job"] = Relationship(back_populates="applicants", link_model=Application)

class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    required_skills: Optional[str] = None
    recruiter_id: Optional[int] = None
    applicants: List[Candidate] = Relationship(back_populates="jobs", link_model=Application)
