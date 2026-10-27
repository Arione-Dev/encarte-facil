import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Upload,
  Calendar,
  Store,
  Palette,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { api } from '../services/api';

export default function SidebarEditor({
  flyerData,
  setFlyerData,
  marketData,
  setMarketData,
  onOpenTemplatesModal
}) {
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'header', 'market'
  const [openSectorIdx, setOpenSectorIdx] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Manipuladores de Setor
  const handleAddSector = () => {
    const newSector = {
      name: `Novo Setor ${flyerData.sectors.length + 1}`,
      products: []
    };
    setFlyerData({
      ...flyerData,
      sectors: [...flyerData.sectors, newSector]
    });
    setOpenSectorIdx(flyerData.sectors.length);
  };

  const handleRemoveSector = (secIdx) => {
    const updated = flyerData.sectors.filter((_, idx) => idx !== secIdx);
    setFlyerData({ ...flyerData, sectors: updated });
  };

  const handleSectorNameChange = (secIdx, newName) => {
    const updated = [...flyerData.sectors];
    updated[secIdx].name = newName;
    setFlyerData({ ...flyerData, sectors: updated });
  };

  // Manipuladores de Produto
  const handleAddProduct = (secIdx) => {
    const newProduct = {
      name: 'Novo Produto',
      brand_or_detail: 'Embalagem / Marca',
      unit: 'un',
      retail_price: 9.99,
      wholesale_price: 8.99,
      wholesale_min_qty: 3,
      image_url: ''
    };
    const updated = [...flyerData.sectors];
    updated[secIdx].products = [...(updated[secIdx].products || []), newProduct];
    setFlyerData({ ...flyerData, sectors: updated });
  };

  const handleUpdateProduct = (secIdx, prodIdx, field, value) => {
    const updated = [...flyerData.sectors];
    updated[secIdx].products[prodIdx][field] = value;
    setFlyerData({ ...flyerData, sectors: updated });
  };

  const handleRemoveProduct = (secIdx, prodIdx) => {
    const updated = [...flyerData.sectors];
    updated[secIdx].products = updated[secIdx].products.filter((_, idx) => idx !== prodIdx);
    setFlyerData({ ...flyerData, sectors: updated });
  };

  // Upload de Imagem de Produto
  const handleImageUpload = async (secIdx, prodIdx, e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await api.uploadImage(file, 'products');
      handleUpdateProduct(secIdx, prodIdx, 'image_url', res.url);
    } catch (err) {
      // Fallback para preview local caso o backend não esteja ativo
      const localUrl = URL.createObjectURL(file);
      handleUpdateProduct(secIdx, prodIdx, 'image_url', localUrl);
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="w-full lg:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden select-none">
      {/* Seletor de Abas */}
      <div className="flex border-b border-slate-800 bg-slate-950">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
            activeTab === 'products'
              ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Produtos & Setores
        </button>

        <button
          onClick={() => setActiveTab('header')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
            activeTab === 'header'
              ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Datas & Título
        </button>

        <button
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
            activeTab === 'market'
              ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Store className="w-4 h-4" />
          Mercado
        </button>
      </div>

      {/* Botão de Trocar Modelo no Topo */}
      <div className="p-3 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Modelo Atual:</span>
          <span className="text-xs font-bold text-yellow-300 capitalize">
            {flyerData.template_id?.replace(/-/g, ' ')}
          </span>
        </div>
        <button
          onClick={onOpenTemplatesModal}
          className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition"
        >
          <Palette className="w-3.5 h-3.5" />
          Trocar Modelo
        </button>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ===================== ABA 1: PRODUTOS & SETORES ===================== */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Setores do Encarte ({flyerData.sectors?.length || 0})
              </h3>
              <button
                onClick={handleAddSector}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-yellow-500/30 px-2.5 py-1 rounded flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar Setor
              </button>
            </div>

            {flyerData.sectors?.map((sector, secIdx) => {
              const isOpen = openSectorIdx === secIdx;
              return (
                <div
                  key={secIdx}
                  className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden shadow-sm"
                >
                  {/* Cabeçalho do Setor */}
                  <div className="flex items-center justify-between p-3 bg-slate-800/90 cursor-pointer">
                    <div
                      className="flex-1 flex items-center gap-2"
                      onClick={() => setOpenSectorIdx(isOpen ? null : secIdx)}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                      <input
                        type="text"
                        value={sector.name}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleSectorNameChange(secIdx, e.target.value)}
                        className="bg-transparent border-b border-transparent hover:border-slate-500 focus:border-yellow-400 text-sm font-bold text-white focus:outline-none px-1"
                      />
                      <span className="text-[11px] text-slate-400 font-medium">
                        ({sector.products?.length || 0})
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveSector(secIdx)}
                      title="Excluir Setor"
                      className="text-slate-400 hover:text-red-400 p-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Lista de Produtos do Setor */}
                  {isOpen && (
                    <div className="p-3 space-y-3 bg-slate-900/60 border-t border-slate-700/60">
                      {sector.products?.map((prod, prodIdx) => (
                        <div
                          key={prodIdx}
                          className="bg-slate-800 p-3 rounded-lg border border-slate-700/80 space-y-2 relative"
                        >
                          {/* Nome e Botão Excluir */}
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              placeholder="Nome do Produto (Ex: Arroz Tipo 1)"
                              value={prod.name}
                              onChange={(e) =>
                                handleUpdateProduct(secIdx, prodIdx, 'name', e.target.value)
                              }
                              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-yellow-400 font-semibold"
                            />
                            <button
                              onClick={() => handleRemoveProduct(secIdx, prodIdx)}
                              className="text-slate-500 hover:text-red-400 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Marca/Detalhe e Unidade */}
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Marca / Peso (ex: 5kg)"
                              value={prod.brand_or_detail}
                              onChange={(e) =>
                                handleUpdateProduct(
                                  secIdx,
                                  prodIdx,
                                  'brand_or_detail',
                                  e.target.value
                                )
                              }
                              className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-yellow-400"
                            />
                            <select
                              value={prod.unit || 'un'}
                              onChange={(e) =>
                                handleUpdateProduct(secIdx, prodIdx, 'unit', e.target.value)
                              }
                              className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-yellow-400"
                            >
                              <option value="un">un (unidade)</option>
                              <option value="kg">kg (quilo)</option>
                              <option value="pct">pct (pacote)</option>
                              <option value="cx">cx (caixa)</option>
                              <option value="fardo">fardo</option>
                              <option value="bdj">bdj (bandeja)</option>
                            </select>
                          </div>

                          {/* Preços: Varejo vs Atacado */}
                          <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-2 rounded border border-slate-800">
                            <div>
                              <label className="text-[10px] font-bold text-yellow-400 block mb-0.5">
                                Preço Varejo (R$)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={prod.retail_price}
                                onChange={(e) =>
                                  handleUpdateProduct(
                                    secIdx,
                                    prodIdx,
                                    'retail_price',
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold focus:outline-none focus:border-yellow-400"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-red-400 block mb-0.5">
                                Atacado ({prod.wholesale_min_qty || 3}+ un)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                placeholder="Opcional"
                                value={prod.wholesale_price || ''}
                                onChange={(e) =>
                                  handleUpdateProduct(
                                    secIdx,
                                    prodIdx,
                                    'wholesale_price',
                                    e.target.value ? parseFloat(e.target.value) : null
                                  )
                                }
                                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold focus:outline-none focus:border-yellow-400"
                              />
                            </div>
                          </div>

                          {/* Imagem do Produto */}
                          <div className="flex items-center gap-2 pt-1">
                            <label className="flex-1 bg-slate-900 hover:bg-slate-750 border border-slate-700 hover:border-yellow-400/50 rounded px-2 py-1.5 flex items-center justify-center gap-1.5 cursor-pointer text-[11px] text-slate-300 transition">
                              <Upload className="w-3 h-3 text-yellow-400" />
                              <span>{prod.image_url ? 'Trocar Imagem' : 'Subir Imagem'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(secIdx, prodIdx, e)}
                                className="hidden"
                              />
                            </label>
                            {prod.image_url && (
                              <img
                                src={prod.image_url}
                                alt="Thumb"
                                className="w-8 h-8 object-contain rounded bg-white p-0.5"
                              />
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => handleAddProduct(secIdx)}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-yellow-400 text-xs font-bold rounded-lg border border-dashed border-slate-700 flex items-center justify-center gap-1.5 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Adicionar Produto neste Setor
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ===================== ABA 2: DATAS & TÍTULO ===================== */}
        {activeTab === 'header' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Título Promocional Principal
              </label>
              <input
                type="text"
                value={flyerData.title}
                onChange={(e) => setFlyerData({ ...flyerData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-bold focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Subtítulo / Selo
              </label>
              <input
                type="text"
                value={flyerData.subtitle}
                onChange={(e) => setFlyerData({ ...flyerData, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Válido De:
                </label>
                <input
                  type="text"
                  value={flyerData.valid_from}
                  onChange={(e) => setFlyerData({ ...flyerData, valid_from: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Até:
                </label>
                <input
                  type="text"
                  value={flyerData.valid_until}
                  onChange={(e) => setFlyerData({ ...flyerData, valid_until: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* ===================== ABA 3: PERFIL DO MERCADO ===================== */}
        {activeTab === 'market' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Nome do Mercado
              </label>
              <input
                type="text"
                value={marketData.name}
                onChange={(e) => setMarketData({ ...marketData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white font-bold focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Slogan
              </label>
              <input
                type="text"
                value={marketData.slogan}
                onChange={(e) => setMarketData({ ...marketData, slogan: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Endereço
              </label>
              <input
                type="text"
                value={marketData.address}
                onChange={(e) => setMarketData({ ...marketData, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={marketData.whatsapp}
                  onChange={(e) => setMarketData({ ...marketData, whatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  value={marketData.instagram}
                  onChange={(e) => setMarketData({ ...marketData, instagram: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

