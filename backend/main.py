# main.py
from fastapi import FastAPI, Depends, HTTPException
from database import init_db, get_session
from sqlmodel import Session
import crud, models, schemas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HR Project 2 API (FastAPI + MySQL)")

# Allow CORS for frontend dev (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only - restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# Candidates
@app.post("/api/candidates")
def create_candidate(payload: schemas.CandidateCreate, session: Session = Depends(get_session)):
    cand = models.Candidate(name=payload.name, email=payload.email, skills=payload.skills)
    return crud.create_candidate(session, cand)

@app.get("/api/candidates")
def list_candidates(session: Session = Depends(get_session)):
    return crud.get_candidates(session)

@app.get("/api/candidates/{candidate_id}")
def get_candidate(candidate_id: int, session: Session = Depends(get_session)):
    c = crud.get_candidate(session, candidate_id)
    if not c:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return c

# Jobs
@app.post("/api/jobs")
def create_job(payload: schemas.JobCreate, session: Session = Depends(get_session)):
    job = models.Job(title=payload.title, description=payload.description, required_skills=payload.required_skills, recruiter_id=payload.recruiter_id)
    return crud.create_job(session, job)

@app.get("/api/jobs")
def list_jobs(session: Session = Depends(get_session)):
    # return list of jobs (no applicants to keep response small)
    jobs = crud.get_jobs(session)
    return [{"id": j.id, "title": j.title, "description": j.description, "required_skills": j.required_skills} for j in jobs]

@app.get("/api/jobs/{job_id}")
def get_job(job_id: int, session: Session = Depends(get_session)):
    j = crud.get_job(session, job_id)
    if not j:
        raise HTTPException(status_code=404, detail="Job not found")
    # return job details + applicants explicitly
    applicants = []
    for a in j.applicants:
        applicants.append({"id": a.id, "name": a.name, "email": a.email, "skills": a.skills})
    return {"id": j.id, "title": j.title, "description": j.description, "required_skills": j.required_skills, "applicants": applicants}

@app.post("/api/jobs/{job_id}/apply")
def apply(job_id: int, payload: schemas.ApplyPayload, session: Session = Depends(get_session)):
    app_rec, err = crud.apply_to_job(session, job_id, payload.candidate_id)
    if err:
        raise HTTPException(status_code=400, detail=err)
    return {"detail": "applied", "candidate_id": payload.candidate_id, "job_id": job_id}

# update candidate
@app.put("/api/candidates/{candidate_id}")
def update_candidate(candidate_id: int, payload: schemas.CandidateCreate, session: Session = Depends(get_session)):
    existing = crud.get_candidate(session, candidate_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Candidate not found")
    updated = crud.update_candidate(session, candidate_id, payload.dict())
    return updated

# delete candidate
@app.delete("/api/candidates/{candidate_id}")
def delete_candidate(candidate_id: int, session: Session = Depends(get_session)):
    ok = crud.delete_candidate(session, candidate_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return {"detail": "deleted"}
