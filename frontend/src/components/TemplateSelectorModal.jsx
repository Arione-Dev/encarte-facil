import React from 'react';
import { X, Check, Sparkles, Layout, Smartphone, ShoppingBag } from 'lucide-react';

export default function TemplateSelectorModal({ isOpen, onClose, selectedTemplate, onSelectTemplate, templates = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Escolha um Modelo de Encarte (10 Templates Prontos)
            </h2>
            <p className="text-sm text-slate-400">
              Selecione o formato ideal para impressão em papel, tabloide ou envio no WhatsApp/Instagram.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Grade de Modelos */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl.id);
                  onClose();
                }}
                className={`relative cursor-pointer rounded-xl p-4 transition-all duration-200 border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-500/10'
                    : 'border-slate-800 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {/* Badge Topo */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-700 text-yellow-300">
                    {tpl.badge || tpl.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {tpl.format}
                  </span>
                </div>

                {/* Conteúdo */}
                <div>
                  <h3 className="font-bold text-white text-base mb-1">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Rodapé do Card */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    {tpl.aspect_ratio}
                  </span>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-yellow-400">
                      <Check className="w-4 h-4" /> Selecionado
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 group-hover:text-white">
                      Usar este modelo &rarr;
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

