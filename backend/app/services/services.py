from typing import List, Optional
from sqlalchemy.orm import Session
from app.repositories.repositories import FlyerRepository, ProductRepository, MarketRepository, SectorRepository
from app.schemas.schemas import FlyerCreate, FlyerUpdate, ProductCreate, ProductUpdate, MarketCreate
from app.models.models import Flyer, Product, Market, Sector

class FlyerService:
    def __init__(self, db: Session):
        self.repo = FlyerRepository(db)

    def get_all_flyers(self) -> List[Flyer]:
        return self.repo.get_all()

    def get_flyer_by_id(self, flyer_id: int) -> Optional[Flyer]:
        return self.repo.get_by_id(flyer_id)

    def create_flyer(self, data: FlyerCreate) -> Flyer:
        return self.repo.create(data.model_dump())

    def update_flyer(self, flyer_id: int, data: FlyerUpdate) -> Optional[Flyer]:
        flyer = self.repo.get_by_id(flyer_id)
        if not flyer:
            return None
        return self.repo.update(flyer, data.model_dump(exclude_unset=True))

    def delete_flyer(self, flyer_id: int) -> bool:
        return self.repo.delete(flyer_id)


class ProductService:
    def __init__(self, db: Session):
        self.repo = ProductRepository(db)

    def get_all_products(self) -> List[Product]:
        return self.repo.get_all()

    def search_products(self, query: str) -> List[Product]:
        return self.repo.search_by_name(query)

    def create_product(self, data: ProductCreate) -> Product:
        return self.repo.create(data.model_dump())

    def update_product(self, product_id: int, data: ProductUpdate) -> Optional[Product]:
        prod = self.repo.get_by_id(product_id)
        if not prod:
            return None
        return self.repo.update(prod, data.model_dump(exclude_unset=True))

    def delete_product(self, product_id: int) -> bool:
        return self.repo.delete(product_id)


class MarketService:
    def __init__(self, db: Session):
        self.repo = MarketRepository(db)

    def get_default_market(self) -> Optional[Market]:
        return self.repo.get_default_or_first()

    def save_or_update_market(self, data: MarketCreate) -> Market:
        existing = self.repo.get_default_or_first()
        if existing:
            return self.repo.update(existing, data.model_dump())
        return self.repo.create(data.model_dump())

