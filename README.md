# HR Project 2 – Job Posting and Application Portal

## 📌 Project Description
This is a full-stack **HR candidate management system** built with:
- **Backend:** FastAPI (Python) with MySQL
- **Frontend:** React (Vite)
- **Database:** MySQL Workbench

The system allows recruiters to manage **candidates, jobs, and applications** efficiently.  
It follows a clean architecture with a REST API and modern frontend.

---

## ⚡ Technology Stack
- **Backend:** FastAPI, SQLModel, Alembic, PyMySQL
- **Frontend:** React (Vite), Axios, React Router
- **Database:** MySQL
- **API Docs:** Swagger (via FastAPI auto-generated OpenAPI docs)

---

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Ravikanth1432/hr-project-2.git
cd hr-project-2
2. Backend Setup (FastAPI + MySQL)
bash
Copy code
cd backend
py -m venv .venv
source .venv\Scripts\activate  # Windows
pip install -r requirements.txt
Configure MySQL connection in backend/database.py
Example:

python
Copy code
DATABASE_URL = "mysql+pymysql://root:yourpassword@localhost/hr_project2"
Run backend:

bash
Copy code
uvicorn main:app --reload --host 127.0.0.1 --port 8000
API available at:
👉 http://127.0.0.1:8000/api

Swagger docs:
👉 http://127.0.0.1:8000/docs

3. Frontend Setup (React + Vite)
bash
Copy code
cd ../frontend
npm install
Create .env in frontend/:

env
Copy code
VITE_API_URL=http://127.0.0.1:8000/api
Run frontend:

bash
Copy code
npm run dev
Frontend available at:
👉 http://127.0.0.1:5173/

🔗 API Overview
Candidate API
POST /api/candidates/ → Create new candidate

GET /api/candidates/ → Get all candidates

GET /api/candidates/{id} → Get candidate by ID

PUT /api/candidates/{id} → Update candidate

DELETE /api/candidates/{id} → Delete candidate

Job API
POST /api/jobs/ → Create new job

GET /api/jobs/ → Get all jobs

GET /api/jobs/{id} → Get job by ID

PUT /api/jobs/{id} → Update job

DELETE /api/jobs/{id} → Delete job

Application API
POST /api/applications/ → Apply candidate to job

GET /api/applications/ → Get all applications

📖 Swagger Documentation
FastAPI automatically generates API documentation.

Swagger UI: http://127.0.0.1:8000/docs

ReDoc: http://127.0.0.1:8000/redoc

👨‍💻 Author
Ravi Kanth
Project for learning React + FastAPI + MySQL stack.
