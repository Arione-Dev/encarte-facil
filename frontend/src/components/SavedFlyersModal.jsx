import React from 'react';
import { X, Calendar, Trash2, ArrowRight, FolderOpen } from 'lucide-react';

export default function SavedFlyersModal({ isOpen, onClose, flyers = [], onLoadFlyer, onDeleteFlyer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Meus Encartes Salvos</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista */}
        <div className="p-6 overflow-y-auto space-y-3">
          {flyers.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Nenhum encarte salvo ainda. Crie e clique em "Salvar" no topo.
            </div>
          ) : (
            flyers.map((flyer) => (
              <div
                key={flyer.id}
                className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-500 transition"
              >
                <div>
                  <h3 className="font-bold text-white text-base">{flyer.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="capitalize text-yellow-400 font-medium">
                      Modelo: {flyer.template_id?.replace(/-/g, ' ')}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(flyer.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onLoadFlyer(flyer);
                      onClose();
                    }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                  >
                    <span>Carregar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteFlyer(flyer.id)}
                    className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-700/50 transition"
                    title="Excluir Encarte"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

