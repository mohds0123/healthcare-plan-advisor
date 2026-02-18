from sqlalchemy import Column, Integer, String, Float
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class Plan(Base):
    __tablename__ = "plans"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    premium = Column(Float)
    deductible = Column(Float)
    coverage = Column(String)
