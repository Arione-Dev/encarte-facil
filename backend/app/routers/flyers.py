from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.schemas import FlyerCreate, FlyerUpdate, FlyerResponse
from app.services.services import FlyerService

router = APIRouter(prefix="/flyers", tags=["Encartes"])

@router.get("/", response_model=List[FlyerResponse])
def list_flyers(db: Session = Depends(get_db)):
    service = FlyerService(db)
    return service.get_all_flyers()

@router.get("/{flyer_id}", response_model=FlyerResponse)
def get_flyer(flyer_id: int, db: Session = Depends(get_db)):
    service = FlyerService(db)
    flyer = service.get_flyer_by_id(flyer_id)
    if not flyer:
        raise HTTPException(status_code=404, detail="Encarte não encontrado")
    return flyer

@router.post("/", response_model=FlyerResponse, status_code=status.HTTP_201_CREATED)
def create_flyer(data: FlyerCreate, db: Session = Depends(get_db)):
    service = FlyerService(db)
    return service.create_flyer(data)

@router.put("/{flyer_id}", response_model=FlyerResponse)
def update_flyer(flyer_id: int, data: FlyerUpdate, db: Session = Depends(get_db)):
    service = FlyerService(db)
    flyer = service.update_flyer(flyer_id, data)
    if not flyer:
        raise HTTPException(status_code=404, detail="Encarte não encontrado")
    return flyer

@router.delete("/{flyer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_flyer(flyer_id: int, db: Session = Depends(get_db)):
    service = FlyerService(db)
    if not service.delete_flyer(flyer_id):
        raise HTTPException(status_code=404, detail="Encarte não encontrado")

