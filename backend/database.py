# database.py
from sqlmodel import create_engine, SQLModel, Session
import os

# For beginners we'll keep creds here (change later for production)
DB_USER = "hruser"
DB_PASS = "hrpass"
DB_HOST = "localhost"
DB_NAME = "hr_project2"

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"

# engine
engine = create_engine(DATABASE_URL, echo=True)  # echo=True logs SQL statements

def init_db():
    # import models to register them with SQLModel metadata
    import models
    SQLModel.metadata.create_all(engine)

# dependency for FastAPI endpoints
def get_session():
    with Session(engine) as session:
        yield session
