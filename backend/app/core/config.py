from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Encarte Fácil - Gerador de Encartes e Tabloides"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Suporte Multi-banco: SQLite por padrão, ou PostgreSQL configurando DATABASE_URL
    # Exemplo SQLite: sqlite:///./encartes.db
    # Exemplo PostgreSQL: postgresql://usuario:senha@localhost:5432/encartes_db
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./encartes.db")
    
    # Diretório para armazenamento de uploads (logos e imagens de produtos)
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")
    
    # CORS para conexão com o frontend
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

