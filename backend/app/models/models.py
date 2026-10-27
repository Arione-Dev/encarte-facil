import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class Market(Base):
    __tablename__ = "markets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slogan = Column(String(200), nullable=True)
    logo_url = Column(String(500), nullable=True)
    address = Column(String(300), nullable=True)
    phone = Column(String(50), nullable=True)
    whatsapp = Column(String(50), nullable=True)
    instagram = Column(String(100), nullable=True)
    primary_color = Column(String(20), default="#D32F2F")     # Vermelho varejo padrão
    secondary_color = Column(String(20), default="#FFC107")   # Amarelo destaque padrão
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    products = relationship("Product", back_populates="market", cascade="all, delete-orphan")
    flyers = relationship("Flyer", back_populates="market", cascade="all, delete-orphan")


class Sector(Base):
    __tablename__ = "sectors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    icon = Column(String(50), default="tag")  # Lucide icon name ou emoji
    order_index = Column(Integer, default=0)

    products = relationship("Product", back_populates="sector")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    market_id = Column(Integer, ForeignKey("markets.id"), nullable=True)
    sector_id = Column(Integer, ForeignKey("sectors.id"), nullable=True)
    name = Column(String(150), nullable=False)
    brand_or_detail = Column(String(100), nullable=True)  # ex: "Marca X 1kg", "Tipo 1"
    unit = Column(String(20), default="un")                # kg, un, fardo, pacote, bandeja
    retail_price = Column(Float, nullable=False)           # Preço varejo
    wholesale_price = Column(Float, nullable=True)         # Preço atacado (ex: "A partir de 3 un")
    wholesale_min_qty = Column(Integer, nullable=True)     # Quantidade mínima para preço de atacado
    image_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    market = relationship("Market", back_populates="products")
    sector = relationship("Sector", back_populates="products")


class Flyer(Base):
    __tablename__ = "flyers"

    id = Column(Integer, primary_key=True, index=True)
    market_id = Column(Integer, ForeignKey("markets.id"), nullable=True)
    title = Column(String(150), nullable=False)
    subtitle = Column(String(200), nullable=True)
    template_id = Column(String(50), nullable=False, default="atacarejo-a4")
    valid_from = Column(String(50), nullable=True)
    valid_until = Column(String(50), nullable=True)
    primary_color = Column(String(20), default="#D32F2F")
    secondary_color = Column(String(20), default="#FFC107")
    background_style = Column(String(50), default="clean-white")
    
    # Armazena os setores e produtos inseridos no encarte em formato JSON
    layout_data = Column(JSON, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    market = relationship("Market", back_populates="flyers")

