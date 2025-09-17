# crud.py
from sqlmodel import select
from models import Candidate, Job, Application
from sqlmodel import Session

def create_candidate(session: Session, candidate: Candidate):
    session.add(candidate)
    session.commit()
    session.refresh(candidate)
    return candidate

def get_candidates(session: Session):
    return session.exec(select(Candidate)).all()

def get_candidate(session: Session, candidate_id: int):
    return session.get(Candidate, candidate_id)

def create_job(session: Session, job: Job):
    session.add(job)
    session.commit()
    session.refresh(job)
    return job

def get_jobs(session: Session):
    return session.exec(select(Job)).all()

def get_job(session: Session, job_id: int):
    return session.get(Job, job_id)

def apply_to_job(session: Session, job_id: int, candidate_id: int):
    # check both exist
    job = session.get(Job, job_id)
    candidate = session.get(Candidate, candidate_id)
    if not job or not candidate:
        return None, "Job or Candidate not found"
    # check existing application
    existing = session.exec(select(Application).where(Application.job_id==job_id, Application.candidate_id==candidate_id)).first()
    if existing:
        return None, "Candidate already applied"
    app = Application(candidate_id=candidate_id, job_id=job_id)
    session.add(app)
    session.commit()
    return app, None

def get_applicants_for_job(session: Session, job_id: int):
    job = session.get(Job, job_id)
    if not job:
        return None
    # job.applicants is available due to relationship
    return job.applicants
