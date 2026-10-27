from pydantic import BaseModel, Field
from typing import Optional, List, Any
import datetime

# --- Market Schemas ---
class MarketBase(BaseModel):
    name: str
    slogan: Optional[str] = None
    logo_url: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    instagram: Optional[str] = None
    primary_color: str = "#D32F2F"
    secondary_color: str = "#FFC107"

class MarketCreate(MarketBase):
    pass

class MarketResponse(MarketBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True


# --- Sector Schemas ---
class SectorBase(BaseModel):
    name: str
    icon: Optional[str] = "tag"
    order_index: int = 0

class SectorCreate(SectorBase):
    pass

class SectorResponse(SectorBase):
    id: int

    class Config:
        from_attributes = True


# --- Product Schemas ---
class ProductBase(BaseModel):
    name: str
    brand_or_detail: Optional[str] = None
    unit: str = "un"
    retail_price: float
    wholesale_price: Optional[float] = None
    wholesale_min_qty: Optional[int] = None
    image_url: Optional[str] = None
    sector_id: Optional[int] = None
    market_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand_or_detail: Optional[str] = None
    unit: Optional[str] = None
    retail_price: Optional[float] = None
    wholesale_price: Optional[float] = None
    wholesale_min_qty: Optional[int] = None
    image_url: Optional[str] = None
    sector_id: Optional[int] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime.datetime
    sector: Optional[SectorResponse] = None

    class Config:
        from_attributes = True


# --- Flyer Schemas ---
class FlyerBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    template_id: str = "atacarejo-a4"
    valid_from: Optional[str] = None
    valid_until: Optional[str] = None
    primary_color: str = "#D32F2F"
    secondary_color: str = "#FFC107"
    background_style: str = "clean-white"
    layout_data: Optional[Any] = None
    market_id: Optional[int] = None

class FlyerCreate(FlyerBase):
    pass

class FlyerUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    template_id: Optional[str] = None
    valid_from: Optional[str] = None
    valid_until: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    background_style: Optional[str] = None
    layout_data: Optional[Any] = None

class FlyerResponse(FlyerBase):
    id: int
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True

