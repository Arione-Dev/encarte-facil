import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.models.models import Market, Sector, Product
from app.routers import flyers, products, markets, upload, templates

# Inicializa as tabelas no banco de dados configurado (SQLite ou PostgreSQL)
Base.metadata.create_all(bind=engine)

# Garante que o diretório de uploads existe
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "products"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "logos"), exist_ok=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend modular para geração de encartes de supermercado e atacado (Multi-Database: SQLite / PostgreSQL)"
)

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir uploads estaticamente
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Inclui os módulos de rotas (Service Oriented Architecture)
app.include_router(flyers.router, prefix=settings.API_V1_STR)
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(markets.router, prefix=settings.API_V1_STR)
app.include_router(upload.router, prefix=settings.API_V1_STR)
app.include_router(templates.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": "SQLite" if "sqlite" in settings.DATABASE_URL else "PostgreSQL",
        "docs_url": "/docs"
    }

# Função de Seed para dados iniciais demonstrativos
@app.on_event("startup")
def seed_initial_data():
    db = SessionLocal()
    try:
        # Cria mercado padrão se não houver nenhum
        if not db.query(Market).first():
            default_market = Market(
                name="SUPER ATACADÃO DO POVO",
                slogan="O menor preço de verdade da região!",
                address="Av. Brasil, 1500 - Centro Comercial",
                phone="(11) 3456-7890",
                whatsapp="(11) 99876-5432",
                instagram="@superatacadao",
                primary_color="#D32F2F",
                secondary_color="#FFC107"
            )
            db.add(default_market)
            db.commit()

        # Cria setores padrão se vazios
        if not db.query(Sector).first():
            default_sectors = [
                Sector(name="Mercearia & Básicos", icon="shopping-basket", order_index=1),
                Sector(name="Açougue & Carnes", icon="beef", order_index=2),
                Sector(name="Hortifrúti Fresco", icon="apple", order_index=3),
                Sector(name="Bebidas & Cervejas", icon="beer", order_index=4),
                Sector(name="Frios & Laticínios", icon="cheese", order_index=5),
                Sector(name="Higiene & Limpeza", icon="sparkles", order_index=6),
                Sector(name="Padaria & Matinais", icon="croissant", order_index=7),
            ]
            db.add_all(default_sectors)
            db.commit()

        # Cria alguns produtos de exemplo para teste imediato
        if not db.query(Product).first():
            sample_products = [
                Product(
                    name="Arroz Tipo 1 5kg",
                    brand_or_detail="Camil / Tio João",
                    unit="pct",
                    retail_price=24.99,
                    wholesale_price=21.90,
                    wholesale_min_qty=6,
                    image_url="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=60"
                ),
                Product(
                    name="Óleo de Soja 900ml",
                    brand_or_detail="Soya / Liza",
                    unit="un",
                    retail_price=6.49,
                    wholesale_price=5.89,
                    wholesale_min_qty=12,
                    image_url="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=60"
                ),
                Product(
                    name="Contra Filé Bovino",
                    brand_or_detail="Peça ou Pedaço Fatiado",
                    unit="kg",
                    retail_price=39.90,
                    wholesale_price=36.90,
                    wholesale_min_qty=5,
                    image_url="https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=60"
                ),
                Product(
                    name="Cerveja Puro Malte 350ml",
                    brand_or_detail="Lata Sleek",
                    unit="un",
                    retail_price=3.99,
                    wholesale_price=3.29,
                    wholesale_min_qty=24,
                    image_url="https://images.unsplash.com/photo-1608270191295-827c15ea6734?w=400&auto=format&fit=crop&q=60"
                ),
                Product(
                    name="Sabão em Pó 1.6kg",
                    brand_or_detail="Omo Lavagem Perfeita",
                    unit="cx",
                    retail_price=18.90,
                    wholesale_price=16.50,
                    wholesale_min_qty=4,
                    image_url="https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=60"
                )
            ]
            db.add_all(sample_products)
            db.commit()
    finally:
        db.close()

