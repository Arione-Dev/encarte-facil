# 🛒 Encarte Fácil - Gerador Profissional de Encartes & Tabloides de Atacarejo

Sistema moderno, rápido e modular para criação automatizada de encartes de supermercados e atacarejos, substituindo o trabalho diário manual e repetitivo em Corel Draw ou Photoshop por um fluxo ágil de **2 minutos**, com exportação em **Alta Resolução (PNG para WhatsApp/Instagram)** e **PDF pronto para Impressão Gráfica**.

---

## 🏛️ Arquitetura do Projeto

O sistema foi concebido com foco em separação de responsabilidades (**Clean Architecture / SOA**):

```
encartes-supermercados/
├── backend/                       # 🐍 Backend em Python (FastAPI + SQLAlchemy)
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py          # Configurações de ambiente (.env) e caminhos
│   │   │   └── database.py        # Engine agnóstica (SQLite / PostgreSQL)
│   │   ├── models/                # Modelos ORM relacionais
│   │   │   └── models.py          # Market, Flyer, Product, Sector
│   │   ├── schemas/               # Schemas de validação Pydantic (Request/Response)
│   │   │   └── schemas.py
│   │   ├── repositories/          # Data Access Layer (Padrão Repositório)
│   │   │   ├── base_repository.py # Operações genéricas de CRUD
│   │   │   └── repositories.py    # FlyerRepo, ProductRepo, MarketRepo
│   │   ├── services/              # Camada de Regras de Negócio
│   │   │   ├── services.py        # FlyerService, ProductService, MarketService
│   │   │   └── image_service.py   # Gerenciador de uploads e imagens
│   │   ├── routers/               # Controladores e Endpoints REST (FastAPI)
│   │   │   ├── flyers.py          # CRUD completo de encartes
│   │   │   ├── products.py        # Catálogo de produtos frequentes
│   │   │   ├── markets.py         # Dados institucionais do mercado
│   │   │   ├── upload.py          # Upload de fotos e logos
│   │   │   └── templates.py       # Catálogo oficial dos templates
│   │   └── main.py                # Inicialização, CORS estático e Seeds automáticos
│   ├── uploads/                   # Diretório de armazenamento local de mídias
│   ├── requirements.txt           # Dependências Python
│   └── .env                       # Variáveis de ambiente locais
│
├── frontend/                      # ⚛️ Interface Visual (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Barra de ferramentas, zoom e botões de exportação
│   │   │   ├── SidebarEditor.jsx  # Editor em tempo real (produtos, setores, preços)
│   │   │   ├── FlyerCanvas.jsx    # Canvas renderizador WYSIWYG com auto-redimensionamento
│   │   │   ├── TemplateSelectorModal.jsx # Galeria visual com os 14 templates
│   │   │   └── SavedFlyersModal.jsx      # Histórico de encartes salvos
│   │   ├── services/
│   │   │   └── api.js             # Integração com a API do Backend
│   │   ├── App.jsx                # Estado central e gerenciador de exportações
│   │   ├── index.css              # Fontes comerciais de varejo, sombras 3D e faixas zebradas
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── iniciar_sistema.bat            # Executável de 1 clique para Windows
├── CHANGELOG.md                   # Registro histórico detalhado de alterações
└── README.md
```

---

## 🗄️ Suporte Multi-Bancos de Dados (SQLite ↔ PostgreSQL)

O backend possui suporte nativo a múltiplos bancos de dados. Para alternar entre desenvolvimento local e produção, basta editar uma linha no arquivo `backend/.env`:

### 1. Modo Padrão (SQLite Local - Zero Instalação):
Já configurado de fábrica! Não precisa instalar nenhum servidor de banco de dados:
```env
DATABASE_URL=sqlite:///./encartes.db
```

### 2. Modo Produção (PostgreSQL):
Quando for hospedar o sistema ou conectar a um banco central:
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/encartes_db
```

---

## 🎨 Catálogo dos 14 Modelos de Encartes

### 💥 Mega Campanhas Comerciais de Impacto (Atacarejo):
1. **💥 Explosão de Ofertas do Atacado (Mega Campanha):** Cabeçalho 3D flamejante com faixas zebradas, selos de *"PREÇO DE CUSTO"* e fitas promocionais dobradas.
2. **🎉 Aniversário do Atacado (Festa de Preços Baixos):** Cabeçalho festivo com balões 3D, confetes e chamada comemorativa *"O ANIVERSÁRIO É NOSSO, O PREÇO BAIXO É SEU!"*.
3. **⚡ Mega Fim de Semana / Sextou do Atacarejo:** Cores elétricas em azul-marinho e amarelo neon, urgência máxima: *"SÓ SEXTA, SÁBADO E DOMINGO!"*.
4. **🚨 Operação Preço Baixo / Derruba Preços:** Estilo agressivo de combate à inflação com carimbos inclinados de *"BAIXOU GERAL"* e destaque de compra direta da indústria.

### 🏪 Tabloides & Setoriais Tradicionais:
5. **Atacarejo Tradicional (A4 / Tabloide):** Grade clássica com setores, preço de varejo e preço de caixa/fardo (*"A partir de X un sai por R$..."*).
6. **Quinta / Fim de Semana da Carne (Açougue):** Fundo escuro/amadeirado e fogo, focado em cortes bovinos, aves e churrasco.
7. **Quarta e Sexta da Feira (Hortifrúti):** Visual verde e fresco, com destaque de preço por Kg para legumes e frutas.
8. **Festival de Cervejas & Bebidas:** Design noturno/moderno com foco em engradados, latas e destilados.
9. **Festival de Limpeza & Perfumaria:** Tons azuis claros e turquesa, fardos de papel e galões de amaciante.
10. **Especial Padaria & Confeitaria:** Tons acolhedores de trigo e café, para bolos, pães e laticínios.
11. **Super Saldão / Queima de Estoque:** Vermelho e amarelo vibrantes com selos de impacto visual total.

### 📱 Formatos Digitais para Redes Sociais:
12. **Stories / WhatsApp Status (1080x1920):** Formato vertical (9:16) para celular com grade de 4 a 6 ofertas.
13. **Stories / WhatsApp (Oferta Estrela):** Destaque gigante para 1 produto estrela do dia (*"SÓ HOJE!"*).
14. **Feed Instagram / Facebook (1080x1080):** Formato quadrado (1:1) com grade moderna e limpa.

---

## 🚀 Como Iniciar

1. Duplo clique no executável **`iniciar_sistema.bat`**.
2. O sistema inicializa o backend na porta `8000` e o frontend na porta `3000`, abrindo automaticamente seu navegador em:
   👉 **`http://localhost:3000`**
