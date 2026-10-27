import React from 'react';
import {
  Download,
  FileText,
  Save,
  ZoomIn,
  ZoomOut,
  FolderOpen,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function Navbar({
  onExportPNG,
  onExportPDF,
  onSave,
  onOpenSavedModal,
  zoom,
  setZoom,
  saving = false,
  exporting = false
}) {
  return (
    <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Logo e Nome da Plataforma */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
          <span className="font-bebas text-2xl text-stone-950 font-black">%</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bebas text-2xl tracking-wide text-white leading-none">
              ENCARTE <span className="text-yellow-400">FÁCIL</span>
            </h1>
            <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-400/30">
              PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            Gerador Profissional de Encartes de Mercado & Atacado
          </p>
        </div>
      </div>

      {/* Controles de Zoom */}
      <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-slate-400">
        <button
          onClick={() => setZoom(Math.max(0.4, Number((zoom - 0.1).toFixed(1))))}
          className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition"
          title="Diminuir Zoom"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold px-2 text-slate-300">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(1.5, Number((zoom + 0.1).toFixed(1))))}
          className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition"
          title="Aumentar Zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(0.7)}
          className="text-[10px] font-bold px-2 py-1 text-yellow-400 hover:bg-slate-800 rounded ml-1 transition"
        >
          Ajustar
        </button>
      </div>

      {/* Botões de Ação e Exportação */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenSavedModal}
          className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
        >
          <FolderOpen className="w-4 h-4 text-yellow-400" />
          <span className="hidden md:inline">Encartes Salvos</span>
        </button>

        <button
          onClick={onSave}
          disabled={saving}
          className="bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-yellow-500/30 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Salvar</span>
        </button>

        <button
          onClick={onExportPNG}
          disabled={exporting}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 text-xs font-black px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg shadow-yellow-500/20 transition disabled:opacity-50"
        >
          {exporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          <span>Baixar Imagem (HD)</span>
        </button>

        <button
          onClick={onExportPDF}
          disabled={exporting}
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-lg shadow-red-600/20 transition disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden md:inline">PDF Impressão</span>
        </button>
      </div>
    </header>
  );
}

