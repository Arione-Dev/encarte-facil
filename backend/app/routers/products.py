from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.schemas import ProductCreate, ProductUpdate, ProductResponse
from app.services.services import ProductService

router = APIRouter(prefix="/products", tags=["Produtos"])

@router.get("/", response_model=List[ProductResponse])
def list_products(query: Optional[str] = Query(None), db: Session = Depends(get_db)):
    service = ProductService(db)
    if query:
        return service.search_products(query)
    return service.get_all_products()

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(data: ProductCreate, db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.create_product(data)

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, data: ProductUpdate, db: Session = Depends(get_db)):
    service = ProductService(db)
    product = service.update_product(product_id, data)
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    service = ProductService(db)
    if not service.delete_product(product_id):
        raise HTTPException(status_code=404, detail="Produto não encontrado")

