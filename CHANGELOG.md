# 📝 Changelog do Projeto - Encarte Fácil

Todas as mudanças, melhorias e novas funcionalidades registradas por data.

---

## [2026-10-27] - Versão 1.2.0 (Branch: `feature/campanhas-atacarejo-2026-10-27`)

### 💥 Novas Funcionalidades (Modelos de Campanhas de Impacto)
- **4 Novos Modelos de Alta Conversão para Atacarejo:**
  1. `campanha-explosao-atacado`: Cabeçalho 3D flamejante com faixas zebradas em vermelho e amarelo, selo "PREÇO DE CUSTO" e título 3D amarelo sombreado.
  2. `campanha-aniversario-atacadao`: Cabeçalho comemorativo festivo com balões dourados/vermelhos, confetes e slogan "O ANIVERSÁRIO É NOSSO, O PREÇO BAIXO É SEU!".
  3. `campanha-mega-fim-de-semana`: Visual elétrico em azul-marinho e amarelo com selo de urgência "SÓ SEXTA, SÁBADO E DOMINGO!".
  4. `campanha-operacao-combate`: Visual agressivo com faixas zebradas de perigo (preto e amarelo), carimbo inclinado "BAIXOU O PREÇO" e selo "DIRETO DA INDÚSTRIA".
- **Efeitos Visuais de Varejo no CSS (`frontend/src/index.css`):**
  - Efeito 3D de sombra em múltiplas camadas para títulos de campanha (`.title-3d-yellow`, `.title-3d-shadow`).
  - Faixas zebradas de advertência/promoção (`.caution-stripes`, `.retail-stripes`).
  - Efeito de fita 3D com pontas dobradas (`.ribbon-banner`).
  - Selos promocionais dinâmicos adicionados automaticamente aos cards de produtos.
  - Tag destacada de atacado com contraste vermelho e amarelo e indicação clara de economia.

### 🐛 Correções de Layout & Visualização
- **Correção do Corte do Cabeçalho e 1º Setor no Canvas:**
  - Substituição do alinhamento flexbox `items-center` por `items-start` no container do encarte.
  - Implementação de um `ResizeObserver` dinâmico em `FlyerCanvas.jsx` para calcular e acompanhar a altura real do conteúdo em pixels, mantendo as proporções perfeitas mesmo com zoom reduzido (50%, 70%, 100%).
  - Remoção temporária do `transform: scale` durante a exportação com `html2canvas`, garantindo imagens e PDFs em escala 100% pura sem distorções.

### 🏛️ Arquitetura Inicial do Projeto
- **Backend Modular em Python (FastAPI):**
  - Camada de Acesso a Dados isolada (`BaseRepository`, `FlyerRepository`, `ProductRepository`, `MarketRepository`).
  - Camada de Serviços para regras de negócio (`FlyerService`, `ProductService`, `MarketService`, `ImageService`).
  - Suporte Multi-banco (SQLite como padrão local e PostgreSQL ativável via `.env`).
  - Endpoints REST documentados automaticamente via OpenAPI/Swagger em `/docs`.
  - Serviço de upload de fotos de produtos e logos.
- **Frontend Moderno (React + Vite + Tailwind CSS):**
  - Editor em tempo real (WYSIWYG) com divisão por abas (Produtos & Setores, Datas & Título, Mercado).
  - Exportação direta de alta resolução para PNG (escala 2x) e PDF para gráfica.
  - Galeria de seleção de modelos com modal dedicado.
  - Histórico de encartes salvos com opção de recarregar e excluir.
- **Automação de Inicialização:**
  - Criação do script `iniciar_sistema.bat` para inicializar Backend e Frontend com 1 clique.
