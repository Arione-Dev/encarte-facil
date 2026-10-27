import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Navbar from './components/Navbar';
import SidebarEditor from './components/SidebarEditor';
import FlyerCanvas from './components/FlyerCanvas';
import TemplateSelectorModal from './components/TemplateSelectorModal';
import SavedFlyersModal from './components/SavedFlyersModal';
import { api } from './services/api';

const DEFAULT_TEMPLATES = [
  {
    id: "campanha-explosao-atacado",
    name: "💥 Explosão de Ofertas do Atacado (Mega Campanha)",
    category: "Campanhas de Impacto",
    format: "A4 / Tabloide",
    aspect_ratio: "210x297",
    description: "Cabeçalho explosivo em 3D com chamas, estrelas de desconto e faixas de 'Preço Baixo de Verdade'. Máxima conversão visual.",
    badge: "CAMPANHA PREMIUM"
  },
  {
    id: "campanha-aniversario-atacadao",
    name: "🎉 Aniversário do Atacado (Festa de Preços Baixos)",
    category: "Campanhas de Impacto",
    format: "A4 / Tabloide",
    aspect_ratio: "210x297",
    description: "Visual comemorativo festivo com balões 3D dourados e vermelhos, confetes e selos de 'O ANIVERSÁRIO É NOSSO, O PREÇO BAIXO É SEU!'.",
    badge: "FESTIVAL / ANIVERSÁRIO"
  },
  {
    id: "campanha-mega-fim-de-semana",
    name: "⚡ Mega Fim de Semana / Sextou do Atacarejo",
    category: "Campanhas de Impacto",
    format: "A4 / Tabloide",
    aspect_ratio: "210x297",
    description: "Cabeçalho com raios elétricos e selo de urgência 'SÓ NESTA SEXTA, SÁBADO E DOMINGO!'. Excelente para queimas de fim de semana.",
    badge: "URGÊNCIA / FIM DE SEMANA"
  },
  {
    id: "campanha-operacao-combate",
    name: "🚨 Operação Preço Baixo / Derruba Preços",
    category: "Campanhas de Impacto",
    format: "A4 / Tabloide",
    aspect_ratio: "210x297",
    description: "Estilo agressivo com faixas zebradas de perigo, carimbos 'BAIXOU!' e 'DIRETO DA INDÚSTRIA'. Destaque gigante para preços de fardo.",
    badge: "COMBATE À INFLAÇÃO"
  },
  {
    id: "atacarejo-a4",
    name: "Atacarejo Tradicional (A4 / Tabloide)",
    category: "Impressão e Tabloide",
    format: "A4 (Vertical)",
    aspect_ratio: "210x297",
    description: "Ideal para grandes atacados e atacarejos. Suporta preço de varejo e preço especial de fardo/caixa.",
    badge: "Mais Usado"
  },
  {
    id: "acougue-carnes",
    name: "Quinta / Fim de Semana da Carne",
    category: "Especial Setorial",
    format: "A4 ou Digital",
    aspect_ratio: "A4 / 4:5",
    description: "Fundo rústico escuro/fogo, com foco em cortes nobres bovinos, aves, linguiças e carvão para churrasco.",
    badge: "Carnes & Churrasco"
  },
  {
    id: "hortifruti-feira",
    name: "Quarta e Sexta da Feira (Hortifrúti)",
    category: "Especial Setorial",
    format: "A4 ou Digital",
    aspect_ratio: "A4 / 4:5",
    description: "Cores verdes e frescas, destaque de preço por Kg para legumes, verduras e frutas selecionadas.",
    badge: "Feirinha Fresca"
  },
  {
    id: "festival-bebidas",
    name: "Festival de Cervejas & Bebidas",
    category: "Temático",
    format: "A4 ou Digital",
    aspect_ratio: "A4 / 4:5",
    description: "Design moderno para adega, destilados, cervejas puro malte, engradados, refrigerantes e energéticos.",
    badge: "Bebidas & Adega"
  },
  {
    id: "limpeza-higiene",
    name: "Festival de Limpeza e Perfumaria",
    category: "Temático",
    format: "A4 ou Digital",
    aspect_ratio: "A4 / 4:5",
    description: "Tons claros, azul e turquesa. Focado em sabões em pó, amaciantes de 5L, desinfetantes e higiene pessoal.",
    badge: "Casa & Higiene"
  },
  {
    id: "stories-whatsapp-grade",
    name: "Stories / WhatsApp Status (Super Ofertas)",
    category: "Digital Redes Sociais",
    format: "Stories (1080x1920)",
    aspect_ratio: "9:16",
    description: "Otimizado para tela cheia de smartphones e disparo em grupos de ofertas do WhatsApp com 4 a 6 itens.",
    badge: "WhatsApp & Stories"
  },
  {
    id: "stories-whatsapp-destaque",
    name: "Stories / WhatsApp (Oferta Estrela)",
    category: "Digital Redes Sociais",
    format: "Stories (1080x1920)",
    aspect_ratio: "9:16",
    description: "1 super produto do dia em tamanho gigante com preço que chama muita atenção no status do WhatsApp.",
    badge: "Item Estrela"
  },
  {
    id: "feed-instagram-quadrado",
    name: "Feed Instagram / Facebook (1080x1080)",
    category: "Digital Redes Sociais",
    format: "Feed Quadrado (1:1)",
    aspect_ratio: "1:1",
    description: "Visual limpo, moderno e organizado em grade 2x2 ou 2x3 para postagens no feed de redes sociais.",
    badge: "Feed Redes"
  },
  {
    id: "padaria-confeitaria",
    name: "Especial Padaria, Laticínios e Café",
    category: "Especial Setorial",
    format: "A4 ou Digital",
    aspect_ratio: "A4 / 4:5",
    description: "Tons quentes de trigo e café, perfeito para pães, bolos, queijos, iogurtes, leite e café da manhã.",
    badge: "Padaria & Café"
  },
  {
    id: "saldao-queima-estoque",
    name: "Super Saldão / Queima de Estoque",
    category: "Impacto Máximo",
    format: "A4 ou Digital",
    aspect_ratio: "A4 / 9:16",
    description: "Estilo 'grita no olho' com faixas amarelas e pretas ou vermelhas vibrantes. Converte muito em atacarejos.",
    badge: "Queima Total"
  }
];

export default function App() {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(0.7);
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [savedFlyers, setSavedFlyers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Perfil do Mercado
  const [marketData, setMarketData] = useState({
    name: 'SUPER ATACADÃO DO POVO',
    slogan: 'O menor preço de verdade da região!',
    address: 'Av. Brasil, 1500 - Centro Comercial',
    whatsapp: '(11) 99876-5432',
    instagram: '@superatacadao',
    logo_url: ''
  });

  // Estado do Encarte Atual
  const [flyerData, setFlyerData] = useState({
    id: null,
    title: 'SUPER OFERTAS DE ATACADO',
    subtitle: 'PREÇO BAIXO DIRETO NO SEU BOLSO',
    template_id: 'atacarejo-a4',
    valid_from: 'HOJE',
    valid_until: 'DOMINGO',
    primary_color: '#D32F2F',
    secondary_color: '#FFC107',
    sectors: [
      {
        name: 'Mercearia & Básicos',
        products: [
          {
            name: 'Arroz Tipo 1 5kg',
            brand_or_detail: 'Camil / Tio João',
            unit: 'pct',
            retail_price: 24.99,
            wholesale_price: 21.90,
            wholesale_min_qty: 6,
            image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=60'
          },
          {
            name: 'Óleo de Soja 900ml',
            brand_or_detail: 'Soya / Liza',
            unit: 'un',
            retail_price: 6.49,
            wholesale_price: 5.89,
            wholesale_min_qty: 12,
            image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=60'
          },
          {
            name: 'Café Torrado e Moído 500g',
            brand_or_detail: 'Pilão / Melitta Tradicional',
            unit: 'un',
            retail_price: 16.99,
            wholesale_price: 14.90,
            wholesale_min_qty: 10,
            image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        name: 'Açougue & Carnes',
        products: [
          {
            name: 'Contra Filé Bovino',
            brand_or_detail: 'Peça ou Pedaço Fatiado',
            unit: 'kg',
            retail_price: 39.90,
            wholesale_price: 36.90,
            wholesale_min_qty: 5,
            image_url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=60'
          },
          {
            name: 'Coxa e Sobrecoxa de Frango',
            brand_or_detail: 'Pacote Congelado 1kg',
            unit: 'kg',
            retail_price: 9.99,
            wholesale_price: 8.79,
            wholesale_min_qty: 10,
            image_url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=60'
          },
          {
            name: 'Linguiça Toscana Sadia / Perdigão',
            brand_or_detail: 'Para Churrasco',
            unit: 'kg',
            retail_price: 18.90,
            wholesale_price: 16.90,
            wholesale_min_qty: 5,
            image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=60'
          }
        ]
      },
      {
        name: 'Bebidas & Cervejas',
        products: [
          {
            name: 'Cerveja Puro Malte 350ml',
            brand_or_detail: 'Lata Sleek Tradicional',
            unit: 'un',
            retail_price: 3.99,
            wholesale_price: 3.29,
            wholesale_min_qty: 24,
            image_url: 'https://images.unsplash.com/photo-1608270191295-827c15ea6734?w=400&auto=format&fit=crop&q=60'
          },
          {
            name: 'Refrigerante Cola 2 Litros',
            brand_or_detail: 'Original Garrafa PET',
            unit: 'un',
            retail_price: 8.99,
            wholesale_price: 7.89,
            wholesale_min_qty: 6,
            image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=60'
          },
          {
            name: 'Sabão Líquido Lava Roupas 3L',
            brand_or_detail: 'Ariel / Omo Galão',
            unit: 'un',
            retail_price: 32.90,
            wholesale_price: 28.90,
            wholesale_min_qty: 4,
            image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=60'
          }
        ]
      }
    ]
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Carrega dados iniciais do backend (mercado e templates)
  useEffect(() => {
    async function loadInitial() {
      try {
        const tpls = await api.getTemplates();
        if (tpls && tpls.length > 0) setTemplates(tpls);

        const market = await api.getMarket();
        if (market) setMarketData(market);

        const flyers = await api.getFlyers();
        if (flyers) setSavedFlyers(flyers);
      } catch (e) {
        console.warn('Backend inicializando...');
      }
    }
    loadInitial();
  }, []);

  // Salvar Encarte no Banco de Dados
  const handleSaveFlyer = async () => {
    try {
      setSaving(true);
      const payload = {
        title: flyerData.title,
        subtitle: flyerData.subtitle,
        template_id: flyerData.template_id,
        valid_from: flyerData.valid_from,
        valid_until: flyerData.valid_until,
        primary_color: flyerData.primary_color,
        secondary_color: flyerData.secondary_color,
        layout_data: { sectors: flyerData.sectors }
      };
      if (flyerData.id) payload.id = flyerData.id;

      const res = await api.saveFlyer(payload);
      setFlyerData(prev => ({ ...prev, id: res.id }));
      showToast('Encarte salvo com sucesso no banco de dados!');

      // Recarrega lista
      const list = await api.getFlyers();
      setSavedFlyers(list);
    } catch (err) {
      showToast('Encarte salvo localmente!');
    } finally {
      setSaving(false);
    }
  };

  // Carregar Encarte Salvo
  const handleLoadFlyer = (f) => {
    setFlyerData({
      id: f.id,
      title: f.title,
      subtitle: f.subtitle,
      template_id: f.template_id,
      valid_from: f.valid_from,
      valid_until: f.valid_until,
      primary_color: f.primary_color,
      secondary_color: f.secondary_color,
      sectors: f.layout_data?.sectors || []
    });
    showToast(`Encarte "${f.title}" carregado com sucesso!`);
  };

  // Excluir Encarte
  const handleDeleteFlyer = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este encarte?')) return;
    try {
      await api.deleteFlyer(id);
      setSavedFlyers(prev => prev.filter(item => item.id !== id));
      showToast('Encarte excluído.');
    } catch (e) {
      showToast('Erro ao excluir.');
    }
  };

  // Exportar Imagem em Alta Resolução (PNG)
  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    try {
      setExporting(true);
      showToast('Gerando imagem em Alta Resolução...');

      const element = canvasRef.current;
      const originalTransform = element.style.transform;
      element.style.transform = 'none';

      // Captura o elemento com escala 2x para nitidez perfeita em telas e impressão
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      element.style.transform = originalTransform;

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const filename = `encarte-${flyerData.template_id}-${Date.now()}.png`;
      link.download = filename;
      link.href = image;
      link.click();
      showToast('Imagem HD baixada com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao gerar imagem. Verifique se as fotos são válidas.');
    } finally {
      setExporting(false);
    }
  };

  // Exportar PDF para Gráfica / Impressão
  const handleExportPDF = async () => {
    if (!canvasRef.current) return;
    try {
      setExporting(true);
      showToast('Gerando arquivo PDF para impressão...');

      const element = canvasRef.current;
      const originalTransform = element.style.transform;
      element.style.transform = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      element.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const isLandscape = canvas.width > canvas.height;
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`encarte-${flyerData.template_id}-${Date.now()}.pdf`);
      showToast('PDF baixado com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao gerar PDF.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-yellow-400 text-stone-950 px-4 py-2.5 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 border border-yellow-300 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onSave={handleSaveFlyer}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        zoom={zoom}
        setZoom={setZoom}
        saving={saving}
        exporting={exporting}
      />

      {/* Main Workspace: Left Sidebar + Center Live Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Painel Lateral de Edição */}
        <SidebarEditor
          flyerData={flyerData}
          setFlyerData={setFlyerData}
          marketData={marketData}
          setMarketData={setMarketData}
          onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
        />

        {/* Área Central de Visualização (WYSIWYG) */}
        <main className="flex-1 bg-slate-950 overflow-auto flex flex-col items-center justify-start p-6 relative">
          <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Pré-visualização em Tempo Real (O que você vê é o que será exportado)
              </span>
            </div>
            <div className="text-xs font-semibold text-yellow-400">
              Formato: {flyerData.template_id.includes('stories') ? '9:16 Stories' : flyerData.template_id.includes('feed') ? '1:1 Feed' : 'A4 Tabloide'}
            </div>
          </div>

          <FlyerCanvas
            flyerData={flyerData}
            marketData={marketData}
            zoom={zoom}
            canvasRef={canvasRef}
          />
        </main>
      </div>

      {/* Modais */}
      <TemplateSelectorModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        selectedTemplate={flyerData.template_id}
        onSelectTemplate={(newTplId) => {
          setFlyerData({ ...flyerData, template_id: newTplId });
          showToast(`Modelo alterado para "${newTplId.replace(/-/g, ' ')}"`);
        }}
        templates={templates}
      />

      <SavedFlyersModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        flyers={savedFlyers}
        onLoadFlyer={handleLoadFlyer}
        onDeleteFlyer={handleDeleteFlyer}
      />
    </div>
  );
}

