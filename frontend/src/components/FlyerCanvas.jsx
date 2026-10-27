import React, { useState, useEffect } from 'react';
import { ShoppingBasket, Phone, MapPin, Instagram, Sparkles, Flame, Apple, Beer, Tag } from 'lucide-react';

export default function FlyerCanvas({ flyerData, marketData, zoom = 1, canvasRef }) {
  const [containerHeight, setContainerHeight] = useState(1130);

  const {
    title = 'SUPER OFERTAS DE ATACADO',
    subtitle = 'O MENOR PREÇO DIRETO PARA VOCÊ',
    template_id = 'atacarejo-a4',
    valid_from = 'Hoje',
    valid_until = '31/10/2026',
    primary_color = '#D32F2F',
    secondary_color = '#FFC107',
    sectors = []
  } = flyerData;

  const market = marketData || {
    name: 'SUPER ATACADÃO',
    slogan: 'Preço baixo de verdade no atacado e varejo!',
    address: 'Av. Principal, 1000 - Centro',
    whatsapp: '(11) 99876-5432',
    instagram: '@superatacadao'
  };

  // Determina dimensões e aspect ratio do template
  const isStories = template_id.includes('stories');
  const isFeed = template_id.includes('feed');
  const isDestaque = template_id.includes('destaque');

  // Largura e Altura base em pixels virtuais para renderização HD
  let canvasWidth = 800;
  let canvasHeight = 1130; // Proporção padrão A4 (1:1.414)

  if (isStories) {
    canvasWidth = 720;
    canvasHeight = 1280; // Proporção Stories 9:16
  } else if (isFeed) {
    canvasWidth = 800;
    canvasHeight = 800; // Proporção Feed 1:1
  }

  // Monitora a altura real do conteúdo para que a rolagem nunca corte o cabeçalho nem o rodapé
  useEffect(() => {
    if (!canvasRef.current) return;
    const updateHeight = () => {
      if (canvasRef.current) {
        const h = canvasRef.current.scrollHeight || canvasRef.current.offsetHeight || canvasHeight;
        setContainerHeight(Math.max(h, canvasHeight));
      }
    };
    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [canvasRef, flyerData, canvasHeight]);

  // Estilização temática por template
  const getThemeStyles = () => {
    switch (template_id) {
      case 'acougue-carnes':
        return {
          bg: 'bg-gradient-to-b from-stone-950 via-red-950 to-stone-900',
          headerBg: 'bg-gradient-to-r from-red-800 via-amber-700 to-red-900 border-b-4 border-amber-500',
          cardBg: 'bg-stone-900/90 border border-red-800/60 shadow-xl',
          sectorBg: 'bg-gradient-to-r from-red-700 to-amber-600 text-white',
          priceBg: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950',
          textColor: 'text-amber-100',
          nameColor: 'text-white'
        };
      case 'hortifruti-feira':
        return {
          bg: 'bg-gradient-to-b from-emerald-900 via-green-800 to-emerald-950',
          headerBg: 'bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 border-b-4 border-yellow-400',
          cardBg: 'bg-white/95 text-stone-900 shadow-xl border border-green-200',
          sectorBg: 'bg-gradient-to-r from-green-700 to-emerald-600 text-yellow-300',
          priceBg: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950',
          textColor: 'text-emerald-100',
          nameColor: 'text-stone-900'
        };
      case 'festival-bebidas':
        return {
          bg: 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900',
          headerBg: 'bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 border-b-4 border-yellow-400',
          cardBg: 'bg-slate-900/90 border border-blue-700/60 shadow-2xl',
          sectorBg: 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white',
          priceBg: 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950',
          textColor: 'text-blue-200',
          nameColor: 'text-white'
        };
      case 'limpeza-higiene':
        return {
          bg: 'bg-gradient-to-b from-sky-100 via-cyan-50 to-sky-100',
          headerBg: 'bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 border-b-4 border-yellow-300',
          cardBg: 'bg-white shadow-lg border border-sky-200',
          sectorBg: 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white',
          priceBg: 'bg-gradient-to-r from-blue-600 to-sky-600 text-white',
          textColor: 'text-sky-900',
          nameColor: 'text-slate-800'
        };
      case 'padaria-confeitaria':
        return {
          bg: 'bg-gradient-to-b from-amber-100 via-orange-50 to-amber-100',
          headerBg: 'bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 border-b-4 border-yellow-500',
          cardBg: 'bg-white shadow-md border border-amber-300',
          sectorBg: 'bg-gradient-to-r from-amber-800 to-amber-700 text-amber-100',
          priceBg: 'bg-gradient-to-r from-amber-600 to-orange-500 text-white',
          textColor: 'text-amber-950',
          nameColor: 'text-stone-900'
        };
      case 'saldao-queima-estoque':
        return {
          bg: 'bg-gradient-to-b from-red-700 via-yellow-500 to-red-800',
          headerBg: 'bg-black border-b-4 border-yellow-400 text-yellow-400',
          cardBg: 'bg-white text-stone-900 shadow-2xl border-2 border-yellow-400',
          sectorBg: 'bg-black text-yellow-400',
          priceBg: 'bg-red-600 text-white',
          textColor: 'text-white',
          nameColor: 'text-stone-950'
        };
      default: // 'atacarejo-a4', 'stories-whatsapp-grade', 'feed-instagram-quadrado'
        return {
          bg: 'bg-gradient-to-b from-slate-100 via-white to-slate-100',
          headerBg: 'bg-gradient-to-r from-red-700 via-red-600 to-red-800 border-b-4 border-yellow-400',
          cardBg: 'bg-white text-stone-900 shadow-lg border border-slate-200',
          sectorBg: 'bg-gradient-to-r from-red-600 to-red-700 text-white',
          priceBg: 'bg-gradient-to-r from-yellow-400 to-amber-400 text-stone-950',
          textColor: 'text-slate-700',
          nameColor: 'text-slate-900'
        };
    }
  };

  const theme = getThemeStyles();

  // Helper para formatar moeda brasileira
  const formatPriceParts = (value) => {
    if (value === undefined || value === null || isNaN(value)) return { int: '00', dec: '00' };
    const num = parseFloat(value);
    const parts = num.toFixed(2).split('.');
    return { int: parts[0], dec: parts[1] };
  };

  // Flatten todos os produtos ou por setores
  const allProducts = sectors.flatMap(s => (s.products || []).map(p => ({ ...p, sectorName: s.name })));

  return (
    <div className="w-full flex justify-center items-start py-4 px-2">
      {/* Container proporcional ao zoom que dita o tamanho exato no layout, evitando cortes no topo ou base */}
      <div
        style={{
          width: `${canvasWidth * zoom}px`,
          height: `${containerHeight * zoom}px`,
          position: 'relative',
          transition: 'width 0.15s ease-out, height 0.15s ease-out'
        }}
      >
        <div
          ref={canvasRef}
          id="flyer-render-container"
          className={`relative flex flex-col justify-between overflow-hidden ${theme.bg} select-none shadow-2xl rounded-sm`}
          style={{
            width: `${canvasWidth}px`,
            minHeight: `${canvasHeight}px`,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
        {/* ===================== CABEÇALHO DO ENCARTE ===================== */}
        <header className={`${theme.headerBg} p-4 text-center text-white relative shadow-md`}>
          {/* Faixa superior com Nome do Mercado e Data */}
          <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2">
            <div className="flex items-center gap-3">
              {market.logo_url ? (
                <img src={market.logo_url} alt="Logo" className="h-10 object-contain rounded" />
              ) : (
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bebas text-2xl text-red-700 font-bold shadow">
                  %
                </div>
              )}
              <div className="text-left">
                <h1 className="font-bebas text-2xl tracking-wider leading-none text-yellow-300 drop-shadow">
                  {market.name}
                </h1>
                <p className="text-[11px] opacity-90 font-medium tracking-tight">
                  {market.slogan}
                </p>
              </div>
            </div>

            {/* Selo de Validade */}
            <div className="bg-yellow-400 text-stone-900 font-bold px-3 py-1 rounded text-xs uppercase shadow font-bebas tracking-wide">
              VÁLIDO: {valid_from} ATÉ {valid_until}
            </div>
          </div>

          {/* Faixa Principal de Título */}
          <div className="py-2">
            <h2 className="font-bebas text-4xl sm:text-5xl uppercase tracking-wider title-3d-shadow text-yellow-300">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest bg-black/30 inline-block px-4 py-0.5 rounded-full mt-1">
                ⭐ {subtitle} ⭐
              </p>
            )}
          </div>
        </header>

        {/* ===================== CORPO DO ENCARTE (PRODUTOS) ===================== */}
        <main className="flex-1 p-3 sm:p-4 flex flex-col justify-start gap-4">
          {/* CASO ESPECIAL: STORIES DESTAQUE (1 SUPER PRODUTO GIGANTE) */}
          {isDestaque ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              {allProducts.length > 0 ? (
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-center border-4 border-yellow-400 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-yellow-300 font-bebas text-xl px-6 py-1 rounded-full uppercase shadow">
                    🔥 MEGA OFERTA DO DIA 🔥
                  </div>
                  <div className="h-72 w-full flex items-center justify-center my-4 overflow-hidden">
                    <img
                      src={allProducts[0].image_url || 'https://via.placeholder.com/350x350?text=Foto+Produto'}
                      alt={allProducts[0].name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                  <h3 className="font-bold text-2xl text-stone-900 uppercase leading-snug">
                    {allProducts[0].name}
                  </h3>
                  <p className="text-sm text-stone-500 font-medium mb-4">
                    {allProducts[0].brand_or_detail || 'Qualidade Garantida'}
                  </p>

                  <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-white shadow-xl">
                    <div className="text-xs uppercase font-bold tracking-wider text-yellow-300 mb-1">
                      POR APENAS
                    </div>
                    <div className="flex items-baseline justify-center font-bebas text-yellow-300">
                      <span className="text-2xl mr-1">R$</span>
                      <span className="text-6xl font-black">{formatPriceParts(allProducts[0].retail_price).int}</span>
                      <span className="text-3xl font-bold">,{formatPriceParts(allProducts[0].retail_price).dec}</span>
                      <span className="text-sm ml-1 text-white uppercase">/{allProducts[0].unit || 'un'}</span>
                    </div>

                    {allProducts[0].wholesale_price && (
                      <div className="mt-2 pt-2 border-t border-white/20 text-xs font-bold bg-yellow-400 text-stone-950 py-1.5 px-3 rounded-lg uppercase">
                        ATACADO: A partir de {allProducts[0].wholesale_min_qty || 3} un sai por R$ {allProducts[0].wholesale_price.toFixed(2)} cada
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/70 py-20 font-medium">
                  Adicione um produto estrela no painel lateral
                </div>
              )}
            </div>
          ) : (
            /* RENDERIZAÇÃO EM SETORES OU GRADE GERAL */
            sectors.map((sector, secIdx) => (
              <div key={secIdx} className="w-full flex flex-col gap-2">
                {/* Banner do Setor */}
                <div className={`${theme.sectorBg} font-bebas text-lg px-3 py-1 rounded flex items-center justify-between shadow-sm`}>
                  <div className="flex items-center gap-2 tracking-wide uppercase">
                    <Tag className="w-4 h-4" />
                    <span>{sector.name}</span>
                  </div>
                  <span className="text-xs font-sans font-semibold uppercase opacity-90">
                    OFERTAS IMBATÍVEIS
                  </span>
                </div>

                {/* Grade de Produtos do Setor */}
                <div className={`grid ${isStories ? 'grid-cols-2 gap-2.5' : isFeed ? 'grid-cols-3 gap-2.5' : 'grid-cols-3 sm:grid-cols-4 gap-3'}`}>
                  {(sector.products || []).map((product, pIdx) => {
                    const priceParts = formatPriceParts(product.retail_price);
                    return (
                      <div
                        key={pIdx}
                        className={`${theme.cardBg} rounded-lg p-2.5 flex flex-col justify-between relative group hover:scale-[1.01] transition-transform`}
                      >
                        {/* Imagem do Produto */}
                        <div className="h-28 w-full flex items-center justify-center p-1 bg-white/40 rounded mb-1.5 overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow"
                            />
                          ) : (
                            <div className="text-xs text-stone-400 font-medium text-center">
                              Sem Foto
                            </div>
                          )}
                        </div>

                        {/* Nome e Detalhe */}
                        <div className="text-center min-h-[42px] flex flex-col justify-center">
                          <h4 className={`font-bold text-xs uppercase leading-tight line-clamp-2 ${theme.nameColor}`}>
                            {product.name}
                          </h4>
                          {product.brand_or_detail && (
                            <p className="text-[10px] text-stone-500 font-medium truncate mt-0.5">
                              {product.brand_or_detail}
                            </p>
                          )}
                        </div>

                        {/* Bloco de Preço Comercial de Impacto */}
                        <div className="mt-2">
                          <div className={`${theme.priceBg} rounded py-1 px-1.5 text-center shadow-md relative`}>
                            <div className="text-[9px] font-bold tracking-tight uppercase opacity-90 leading-none">
                              Varejo
                            </div>
                            <div className="flex items-baseline justify-center font-bebas leading-none my-0.5">
                              <span className="text-xs font-bold mr-0.5">R$</span>
                              <span className="text-2xl font-black tracking-tight">{priceParts.int}</span>
                              <span className="text-sm font-bold">,{priceParts.dec}</span>
                              <span className="text-[10px] ml-0.5 font-sans font-bold uppercase opacity-80">
                                /{product.unit || 'un'}
                              </span>
                            </div>
                          </div>

                          {/* Preço de Atacado (Fardo/Caixa) */}
                          {product.wholesale_price ? (
                            <div className="bg-red-700 text-yellow-300 text-[9px] font-bold text-center py-0.5 px-1 rounded mt-1 uppercase tracking-tight shadow-sm">
                              NO ATACADO ({product.wholesale_min_qty || 3}+ un):
                              <span className="text-white ml-0.5 font-black text-[10px]">
                                R$ {product.wholesale_price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <div className="h-4"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </main>

        {/* ===================== RODAPÉ DO ENCARTE ===================== */}
        <footer className="bg-stone-950 text-white p-3 border-t-2 border-yellow-400 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              {market.address && (
                <div className="flex items-center gap-1 text-[11px] text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{market.address}</span>
                </div>
              )}
              {market.whatsapp && (
                <div className="flex items-center gap-1 text-[11px] text-green-400 font-bold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{market.whatsapp}</span>
                </div>
              )}
              {market.instagram && (
                <div className="flex items-center gap-1 text-[11px] text-pink-400 font-bold">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{market.instagram}</span>
                </div>
              )}
            </div>

            <div className="text-[9px] text-stone-400 text-right">
              Ofertas válidas enquanto durarem os estoques. Imagens meramente ilustrativas.
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
);
}

