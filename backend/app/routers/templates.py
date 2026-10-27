from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/templates", tags=["Modelos de Encarte"])

TEMPLATES_CATALOG: List[Dict[str, Any]] = [
    {
        "id": "campanha-explosao-atacado",
        "name": "💥 Explosão de Ofertas do Atacado (Mega Campanha)",
        "category": "Campanhas de Impacto",
        "format": "A4 / Tabloide",
        "aspect_ratio": "210x297",
        "description": "Cabeçalho explosivo em 3D com chamas, estrelas de desconto e faixas de 'Preço Baixo de Verdade'. Máxima conversão visual.",
        "badge": "CAMPANHA PREMIUM",
        "default_sectors": ["Mercearia Pesada", "Bebidas & Packs", "Limpeza & Fardos"],
        "max_products": 12,
        "primary_color": "#D50000",
        "secondary_color": "#FFD600"
    },
    {
        "id": "campanha-aniversario-atacadao",
        "name": "🎉 Aniversário do Atacado (Festa de Preços Baixos)",
        "category": "Campanhas de Impacto",
        "format": "A4 / Tabloide",
        "aspect_ratio": "210x297",
        "description": "Visual comemorativo festivo com balões 3D dourados e vermelhos, confetes e selos de 'O ANIVERSÁRIO É NOSSO, O PREÇO BAIXO É SEU!'.",
        "badge": "FESTIVAL / ANIVERSÁRIO",
        "default_sectors": ["Ofertas da Festa", "Bebidas & Brinde", "Carnes & Churrasco"],
        "max_products": 12,
        "primary_color": "#B71C1C",
        "secondary_color": "#FFC107"
    },
    {
        "id": "campanha-mega-fim-de-semana",
        "name": "⚡ Mega Fim de Semana / Sextou do Atacarejo",
        "category": "Campanhas de Impacto",
        "format": "A4 / Tabloide",
        "aspect_ratio": "210x297",
        "description": "Cabeçalho com raios elétricos e selo de urgência 'SÓ NESTA SEXTA, SÁBADO E DOMINGO!'. Excelente para queimas de fim de semana.",
        "badge": "URGÊNCIA / FIM DE SEMANA",
        "default_sectors": ["Cervejas & Bebidas", "Carnes para o FDS", "Mercearia"],
        "max_products": 12,
        "primary_color": "#0D47A1",
        "secondary_color": "#FFEB3B"
    },
    {
        "id": "campanha-operacao-combate",
        "name": "🚨 Operação Preço Baixo / Derruba Preços",
        "category": "Campanhas de Impacto",
        "format": "A4 / Tabloide",
        "aspect_ratio": "210x297",
        "description": "Estilo agressivo com faixas zebradas de perigo, carimbos 'BAIXOU!' e 'DIRETO DA INDÚSTRIA'. Destaque gigante para preços de fardo.",
        "badge": "COMBATE À INFLAÇÃO",
        "default_sectors": ["Alimentos Básicos", "Limpeza Industrial", "Bebidas"],
        "max_products": 12,
        "primary_color": "#C62828",
        "secondary_color": "#FDD835"
    },
    {
        "id": "atacarejo-a4",
        "name": "Atacarejo Tradicional (A4 / Tabloide)",
        "category": "Impressão e Tabloide",
        "format": "A4 (Vertical)",
        "aspect_ratio": "210x297",
        "description": "Ideal para grandes atacados e atacarejos. Suporta preço de varejo e preço especial de fardo/caixa.",
        "badge": "Mais Usado",
        "default_sectors": ["Mercearia", "Bebidas", "Limpeza", "Bazar"],
        "max_products": 12,
        "primary_color": "#D32F2F",
        "secondary_color": "#FFC107"
    },
    {
        "id": "acougue-carnes",
        "name": "Quinta / Fim de Semana da Carne",
        "category": "Especial Setorial",
        "format": "A4 ou Digital",
        "aspect_ratio": "A4 / 4:5",
        "description": "Fundo rústico escuro/fogo, com foco em cortes nobres bovinos, aves, linguiças e carvão para churrasco.",
        "badge": "Carnes & Churrasco",
        "default_sectors": ["Açougue Especial", "Aves & Suínos", "Churrasco"],
        "max_products": 8,
        "primary_color": "#8B0000",
        "secondary_color": "#FFA500"
    },
    {
        "id": "hortifruti-feira",
        "name": "Quarta e Sexta da Feira (Hortifrúti)",
        "category": "Especial Setorial",
        "format": "A4 ou Digital",
        "aspect_ratio": "A4 / 4:5",
        "description": "Cores verdes e frescas, destaque de preço por Kg para legumes, verduras e frutas selecionadas.",
        "badge": "Feirinha Fresca",
        "default_sectors": ["Frutas Selecionadas", "Legumes & Raízes", "Verduras Frescas"],
        "max_products": 9,
        "primary_color": "#2E7D32",
        "secondary_color": "#FBC02D"
    },
    {
        "id": "festival-bebidas",
        "name": "Festival de Cervejas & Bebidas",
        "category": "Temático",
        "format": "A4 ou Digital",
        "aspect_ratio": "A4 / 4:5",
        "description": "Design moderno para adega, destilados, cervejas puro malte, engradados, refrigerantes e energéticos.",
        "badge": "Bebidas & Adega",
        "default_sectors": ["Cervejas & Chopp", "Refrigerantes & Sucos", "Destilados & Vinhos"],
        "max_products": 8,
        "primary_color": "#1A237E",
        "secondary_color": "#FFD600"
    },
    {
        "id": "limpeza-higiene",
        "name": "Festival de Limpeza e Perfumaria",
        "category": "Temático",
        "format": "A4 ou Digital",
        "aspect_ratio": "A4 / 4:5",
        "description": "Tons claros, azul e turquesa. Focado em sabões em pó, amaciantes de 5L, desinfetantes e higiene pessoal.",
        "badge": "Casa & Higiene",
        "default_sectors": ["Limpeza Pesada", "Cuidado com as Roupas", "Higiene Pessoal"],
        "max_products": 9,
        "primary_color": "#0288D1",
        "secondary_color": "#00E676"
    },
    {
        "id": "stories-whatsapp-grade",
        "name": "Stories / WhatsApp Status (Super Ofertas)",
        "category": "Digital Redes Sociais",
        "format": "Stories (1080x1920)",
        "aspect_ratio": "9:16",
        "description": "Otimizado para tela cheia de smartphones e disparo em grupos de ofertas do WhatsApp com 4 a 6 itens.",
        "badge": "WhatsApp & Stories",
        "default_sectors": ["Ofertas Relâmpago"],
        "max_products": 6,
        "primary_color": "#E53935",
        "secondary_color": "#FFEB3B"
    },
    {
        "id": "stories-whatsapp-destaque",
        "name": "Stories / WhatsApp (Oferta Estrela)",
        "category": "Digital Redes Sociais",
        "format": "Stories (1080x1920)",
        "aspect_ratio": "9:16",
        "description": "1 super produto do dia em tamanho gigante com preço que chama muita atenção no status do WhatsApp.",
        "badge": "Item Estrela",
        "default_sectors": ["Mega Oferta do Dia"],
        "max_products": 1,
        "primary_color": "#C62828",
        "secondary_color": "#FFC400"
    },
    {
        "id": "feed-instagram-quadrado",
        "name": "Feed Instagram / Facebook (1080x1080)",
        "category": "Digital Redes Sociais",
        "format": "Feed Quadrado (1:1)",
        "aspect_ratio": "1:1",
        "description": "Visual limpo, moderno e organizado em grade 2x2 ou 2x3 para postagens no feed de redes sociais.",
        "badge": "Feed Redes",
        "default_sectors": ["Destaques da Semana"],
        "max_products": 6,
        "primary_color": "#B71C1C",
        "secondary_color": "#F57F17"
    },
    {
        "id": "padaria-confeitaria",
        "name": "Especial Padaria, Laticínios e Café",
        "category": "Especial Setorial",
        "format": "A4 ou Digital",
        "aspect_ratio": "A4 / 4:5",
        "description": "Tons quentes de trigo e café, perfeito para pães, bolos, queijos, iogurtes, leite e café da manhã.",
        "badge": "Padaria & Café",
        "default_sectors": ["Padaria & Confeitaria", "Frios & Laticínios", "Matinais"],
        "max_products": 8,
        "primary_color": "#6D4C41",
        "secondary_color": "#FFB300"
    },
    {
        "id": "saldao-queima-estoque",
        "name": "Super Saldão / Queima de Estoque",
        "category": "Impacto Máximo",
        "format": "A4 ou Digital",
        "aspect_ratio": "A4 / 9:16",
        "description": "Estilo 'grita no olho' com faixas amarelas e pretas ou vermelhas vibrantes. Converte muito em atacarejos.",
        "badge": "Queima Total",
        "default_sectors": ["Preço de Custo", "Últimas Unidades"],
        "max_products": 8,
        "primary_color": "#D50000",
        "secondary_color": "#FFD600"
    }
]

@router.get("/")
def list_templates():
    return TEMPLATES_CATALOG
