from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.schemas.schemas import MarketCreate, MarketResponse
from app.services.services import MarketService

router = APIRouter(prefix="/markets", tags=["Mercado"])

@router.get("/current", response_model=Optional[MarketResponse])
def get_current_market(db: Session = Depends(get_db)):
    service = MarketService(db)
    return service.get_default_market()

@router.post("/", response_model=MarketResponse)
def save_market(data: MarketCreate, db: Session = Depends(get_db)):
    service = MarketService(db)
    return service.save_or_update_market(data)

