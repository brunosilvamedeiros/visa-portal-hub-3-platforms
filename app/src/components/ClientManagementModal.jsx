import React, { useState } from 'react';
import { X, Plus, FolderPlus, Layers, CheckCircle2 } from 'lucide-react';

export default function ClientManagementModal({ isOpen, onClose, projects, onAddProject, onAddTrack }) {
  const [mode, setMode] = useState('create-client'); // 'create-client' | 'add-track'

  // New Client Form State
  const [clientName, setClientName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  
  // New Track Form State
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [trackName, setTrackName] = useState('');
  const [trackType, setTrackType] = useState('Produto Contratado'); // 'Produto Contratado' | 'Mandato Visa'
  const [trackProduct, setTrackProduct] = useState('Apple Pay');
  const [trackOwner, setTrackOwner] = useState('');

  if (!isOpen) return null;

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!clientName || !projectTitle) return;

    const newProj = {
      id: `proj-${Date.now()}`,
      cliente: clientName,
      titulo: projectTitle,
      status: "Em Planejamento",
      gerente_visa: "Bruno",
      data_inicio: new Date().toLocaleDateString('pt-BR'),
      progresso: 10,
      tags: [clientName.toLowerCase().replace(/\s+/g, '-')],
      tracks: []
    };

    onAddProject(newProj);
    setClientName('');
    setProjectTitle('');
    onClose();
  };

  const handleCreateTrack = (e) => {
    e.preventDefault();
    if (!trackName) return;

    const newTrack = {
      id: `tr-${Date.now()}`,
      nome: trackName,
      tipo: trackType,
      produto: trackProduct,
      status: "Em Planejamento",
      progresso: 15,
      responsavel: trackOwner || "Bruno (Visa)",
      proximo_marco: "Kickoff de Alinhamento"
    };

    onAddTrack(selectedProjectId, newTrack);
    setTrackName('');
    setTrackOwner('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#122131] border border-[#273647] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title & Mode Switcher */}
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[#FAA61A]" />
            Manutenção de Clientes & Tracks
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadastre novos projetos macros de clientes ou inclua tracks de produto e mandatos.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 bg-[#1C2B3C] p-1 rounded-xl">
            <button
              onClick={() => setMode('create-client')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'create-client' ? 'bg-[#1A1F71] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              + Novo Cliente / Projeto Macro
            </button>
            <button
              onClick={() => setMode('add-track')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'add-track' ? 'bg-[#1A1F71] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              + Nova Track de Trabalho
            </button>
          </div>
        </div>

        {/* Mode 1: Create Client */}
        {mode === 'create-client' ? (
          <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Nome do Cliente / Emissor</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Banco Delta, Fintech Epsilon, Cooperativa X..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Título do Projeto Macro</label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Ex: Projeto Macro — Onboarding Carteiras Digital Delta 2026..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FAA61A] hover:bg-[#E59510] text-[#0A142F] font-bold py-3 rounded-xl transition-all shadow-lg mt-2 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Cliente / Projeto Macro</span>
            </button>
          </form>
        ) : (
          /* Mode 2: Add Track */
          <form onSubmit={handleCreateTrack} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Selecione o Cliente / Projeto Macro</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.cliente} — {p.titulo}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Nome da Track de Trabalho</label>
              <input
                type="text"
                required
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                placeholder="Ex: Track 3: Garmin Pay Wearables, Track 4: Mandato Field 48..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Tipo de Track</label>
                <select
                  value={trackType}
                  onChange={(e) => setTrackType(e.target.value)}
                  className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
                >
                  <option value="Produto Contratado">Produto Contratado</option>
                  <option value="Mandato Visa">Mandato Visa</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Produto Relacionado</label>
                <select
                  value={trackProduct}
                  onChange={(e) => setTrackProduct(e.target.value)}
                  className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
                >
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="Garmin Pay">Garmin Pay</option>
                  <option value="Visa Token Service (VTS)">Visa Token Service (VTS)</option>
                  <option value="Mandato Operacional">Mandato Operacional</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Líder / Responsável da Track</label>
              <input
                type="text"
                value={trackOwner}
                onChange={(e) => setTrackOwner(e.target.value)}
                placeholder="Ex: Fernando Mendes (Cliente) / Bruno (Visa)..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FAA61A] hover:bg-[#E59510] text-[#0A142F] font-bold py-3 rounded-xl transition-all shadow-lg mt-2 flex items-center justify-center space-x-2"
            >
              <Layers className="w-4 h-4" />
              <span>Adicionar Track ao Cliente</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
