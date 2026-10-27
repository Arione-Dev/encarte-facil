# 🛒 Encarte Fácil - Gerador Profissional de Encartes & Tabloides

Sistema moderno e modular para criação rápida de encartes de supermercados e atacarejos, substituindo o trabalho diário manual em Corel Draw ou Photoshop por um fluxo automatizado de 2 minutos com exportação em **Alta Resolução (PNG para WhatsApp/Instagram)** e **PDF para Impressão**.

---

## 🏛️ Arquitetura do Projeto

O sistema foi estruturado seguindo as melhores práticas de **Clean Architecture** e **Service-Oriented Design (SOA)**:

```
encartes-supermercados/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py           # Configurações do ambiente e banco
│   │   │   └── database.py         # Engine agnóstica (SQLite / PostgreSQL)
│   │   ├── models/                 # Modelos ORM (SQLAlchemy)
│   │   │   └── models.py           # Market, Flyer, Product, Sector
│   │   ├── schemas/                # Schemas de validação de dados (Pydantic)
│   │   │   └── schemas.py
│   │   ├── repositories/           # Camada de Acesso a Dados (Data Access Layer)
│   │   │   ├── base_repository.py  # Genérico CRUD
│   │   │   └── repositories.py     # FlyerRepo, ProductRepo, MarketRepo
│   │   ├── services/               # Regras de Negócio e Processamento
│   │   │   ├── services.py         # FlyerService, ProductService, MarketService
│   │   │   └── image_service.py    # Gerenciador de uploads e imagens
│   │   ├── routers/                # Controladores / Endpoints REST (FastAPI)
│   │   │   ├── flyers.py           # CRUD de encartes
│   │   │   ├── products.py         # Catálogo de produtos
│   │   │   ├── markets.py          # Perfil da empresa/supermercado
│   │   │   ├── upload.py           # Upload de logos e fotos de produtos
│   │   │   └── templates.py        # Catálogo dos 10 templates de encartes
│   │   └── main.py                 # Ponto de entrada, CORS e Seed inicial
│   ├── uploads/                    # Armazenamento local de imagens
│   ├── requirements.txt            # Dependências Python
│   └── .env                        # Variáveis de ambiente
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Barra superior com ações de exportação
│   │   │   ├── SidebarEditor.jsx   # Editor lateral em tempo real
│   │   │   ├── FlyerCanvas.jsx     # Canvas renderizador WYSIWYG
│   │   │   ├── TemplateSelectorModal.jsx # Galeria dos 10 modelos
│   │   │   └── SavedFlyersModal.jsx      # Histórico de encartes salvos
│   │   ├── services/
│   │   │   └── api.js              # Cliente de integração com o Backend
│   │   ├── App.jsx                 # Componente raiz e gerenciador de estado
│   │   ├── index.css               # Estilos, fontes de varejo e sombras 3D
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── iniciar_sistema.bat             # Atalho de 1 clique para iniciar tudo
└── README.md
```

---

## 🗄️ Suporte Multi-Bancos de Dados (SQLite ↔ PostgreSQL)

O backend foi preparado para trocar de banco de dados sem alterar uma única linha de código, bastando mudar a variável `DATABASE_URL` no arquivo `backend/.env`:

### 1. Modo Padrão (SQLite Local - Zero Configuração):
Já vem ativado por padrão! Cria automaticamente o arquivo `backend/encartes.db`.
```env
DATABASE_URL=sqlite:///./encartes.db
```

### 2. Modo Produção (PostgreSQL):
Quando você quiser conectar a um servidor PostgreSQL:
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/encartes_db
```
*(O driver `psycopg2-binary` já está listado no `requirements.txt`).*

---

## 🎨 Os 10 Modelos de Encartes Prontos

1. **Atacarejo Tradicional (A4 / Tabloide):** Grade de setores com preço normal e preço de atacado (*"A partir de X unidades..."*).
2. **Quinta / Fim de Semana da Carne:** Fundo escuro/rústico com chamas, destaque para cortes bovinos, aves e suínos.
3. **Quarta e Sexta da Feira (Hortifrúti):** Visual verde e fresco com destaque de preço por Kg.
4. **Festival de Cervejas & Bebidas:** Design para adega, packs de latinhas, refrigerantes e destilados.
5. **Festival de Limpeza & Perfumaria:** Tons azuis/turquesa, fardos de papel e galões de amaciante/sabão.
6. **Stories / WhatsApp Status (Super Ofertas):** Formato vertical 1080x1920 (9:16) para telas de celular.
7. **Stories / WhatsApp (Oferta Estrela):** Destaque gigante para 1 produto estrela do dia.
8. **Feed Instagram / Facebook (1080x1080):** Formato quadrado (1:1) com grade limpa.
9. **Especial Padaria & Confeitaria:** Tons aconchegantes de trigo e café, para bolos, pães e laticínios.
10. **Super Saldão / Queima de Estoque:** Vermelho e amarelo vibrantes com selos de *"Preço Baixo"* e impacto visual total.

---

## 🚀 Como Iniciar o Sistema

### Maneira Mais Rápida (1 Clique):
Dê um duplo clique no arquivo **`iniciar_sistema.bat`**. Ele irá:
1. Subir o backend FastAPI na porta `8000` (com Swagger em `http://localhost:8000/docs`);
2. Subir o frontend Vite na porta `3000`;
3. Abrir automaticamente seu navegador em `http://localhost:3000`.

### Início Manual por Linha de Comando:
**Terminal 1 (Backend):**
```powershell
cd backend
.\venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm run dev
```

