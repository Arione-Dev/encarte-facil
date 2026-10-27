from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import Flyer, Product, Market, Sector
from app.repositories.base_repository import BaseRepository

class FlyerRepository(BaseRepository[Flyer]):
    def __init__(self, db: Session):
        super().__init__(Flyer, db)

    def get_by_market(self, market_id: int) -> List[Flyer]:
        return self.db.query(Flyer).filter(Flyer.market_id == market_id).order_by(Flyer.created_at.desc()).all()


class ProductRepository(BaseRepository[Product]):
    def __init__(self, db: Session):
        super().__init__(Product, db)

    def search_by_name(self, query: str) -> List[Product]:
        return self.db.query(Product).filter(Product.name.ilike(f"%{query}%")).all()

    def get_by_sector(self, sector_id: int) -> List[Product]:
        return self.db.query(Product).filter(Product.sector_id == sector_id).all()


class MarketRepository(BaseRepository[Market]):
    def __init__(self, db: Session):
        super().__init__(Market, db)

    def get_default_or_first(self) -> Optional[Market]:
        return self.db.query(Market).first()


class SectorRepository(BaseRepository[Sector]):
    def __init__(self, db: Session):
        super().__init__(Sector, db)

    def get_all_ordered(self) -> List[Sector]:
        return self.db.query(Sector).order_by(Sector.order_index.asc()).all()

