import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Building2, Globe, Layers, Plus } from 'lucide-react';
import { initialConeSulCountries, initialMandatesList, trackStatusOptions, initialProducts } from '../mockData';

export default function ClientEditModal({ isOpen, onClose, project, onUpdateProject, onDeleteProject }) {
  const [coneSulCountries, setConeSulCountries] = useState(initialConeSulCountries);
  const [mandatesList, setMandatesList] = useState(initialMandatesList);
  const [productsList, setProductsList] = useState(initialProducts.map(p => p.nome));

  const [nome, setNome] = useState('');
  const [selectedPais, setSelectedPais] = useState('Brasil');
  const [customPais, setCustomPais] = useState('');
  const [descricao, setDescricao] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [status, setStatus] = useState('Em homologação');
  const [tracks, setTracks] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (project) {
      setNome(project.cliente || '');
      setSelectedPais(project.pais || 'Brasil');
      setDescricao(project.descricao || '');
      setLogoUrl(project.logo || '');
      setStatus(project.status || 'Em homologação');
      
      // Format tracks for editing
      const formattedTracks = (project.tracks || []).map((t, idx) => ({
        id: t.id || `tr-${idx}`,
        tipo: t.tipo || (t.produto ? 'Produto' : t.mandato ? 'Mandato' : 'Outro'),
        selectedProduto: t.produto || 'Apple Pay',
        customProduto: '',
        selectedMandato: t.mandato || 'OCT (Original Credit Transaction)',
        customMandato: '',
        descricaoOutro: t.descricaoOutro || (t.tipo === 'Outro' ? t.nome : ''),
        status: t.status || 'Aguardando início',
        responsavel: t.responsavel || ''
      }));
      setTracks(formattedTracks);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleAddTrack = () => {
    setTracks([
      ...tracks,
      {
        id: `tr-${Date.now()}`,
        tipo: 'Produto',
        selectedProduto: 'Apple Pay',
        customProduto: '',
        selectedMandato: 'Click to Pay',
        customMandato: '',
        descricaoOutro: '',
        status: 'Aguardando início',
        responsavel: ''
      }
    ]);
  };

  const handleRemoveTrack = (trackId) => {
    setTracks(tracks.filter(t => t.id !== trackId));
  };

  const handleTrackChange = (index, field, value) => {
    const updated = [...tracks];
    updated[index] = { ...updated[index], [field]: value };
    setTracks(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPais = selectedPais === 'Novo' ? customPais.trim() || 'Desconhecido' : selectedPais;

    const validTracks = tracks.map((t, idx) => {
      let trackNome = '';
      let finalProduto = '';
      let finalMandato = '';

      if (t.tipo === 'Produto') {
        const prodName = t.selectedProduto === 'Novo' ? t.customProduto.trim() || 'Novo Produto' : t.selectedProduto;
        trackNome = prodName;
        finalProduto = prodName;
      } else if (t.tipo === 'Mandato') {
        const mandName = t.selectedMandato === 'Novo' ? t.customMandato.trim() || 'Novo Mandato' : t.selectedMandato;
        trackNome = mandName;
        finalMandato = mandName;
      } else {
        trackNome = t.descricaoOutro.trim() || `Track Outro #${idx + 1}`;
      }

      return {
        id: t.id || `tr-${Date.now()}-${idx}`,
        nome: trackNome,
        tipo: t.tipo,
        produto: finalProduto,
        mandato: finalMandato,
        descricaoOutro: t.descricaoOutro,
        status: t.status || 'Aguardando início',
        progresso: t.status === 'Concluído' ? 100 : t.status === 'Em homologação' ? 80 : t.status === 'Em implementação' ? 50 : 20,
        responsavel: t.responsavel || 'Gerente de Projetos Visa',
        proximo_marco: t.status === 'Concluído' ? 'Entregue' : 'Alinhamento Inicial'
      };
    });

    const updatedProject = {
      ...project,
      cliente: nome,
      titulo: `Projeto Macro — ${nome}`,
      pais: finalPais,
      descricao,
      logo: logoUrl,
      status,
      produtos: Array.from(new Set(validTracks.map(t => t.produto).filter(Boolean))),
      tracks: validTracks
    };

    onUpdateProject(updatedProject);
    onClose();
  };

  const handleDelete = () => {
    onDeleteProject(project.id);
    setShowConfirmDelete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-[#122131] border border-[#273647] rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#273647] pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FAA61A]" />
              Edição do Cliente & Tracks — {project.cliente}
            </h2>
            <p className="text-xs text-slate-400">Atualização de dados institucionais no Cone Sul e gerenciamento de tracks.</p>
          </div>
        </div>

        {showConfirmDelete ? (
          <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-xl space-y-4 text-center">
            <h3 className="text-base font-bold text-rose-400">Tem certeza que deseja excluir este cliente?</h3>
            <p className="text-xs text-slate-300">
              Esta ação excluirá permanentemente o cliente <strong>{project.cliente}</strong> e suas <strong>{tracks.length} tracks</strong>.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="bg-[#1C2B3C] hover:bg-slate-700 text-white text-xs px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2 rounded-xl"
              >
                Sim, Excluir Cliente
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Section 1: Dados Institucionais */}
            <div className="space-y-4 bg-[#1C2B3C] p-4 rounded-xl border border-[#273647]">
              <span className="font-bold text-white text-xs block border-b border-[#273647] pb-2">
                1. Dados Gerais do Cliente (Cone Sul)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Nome do Cliente</label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">País de Origem</label>
                  <select
                    value={selectedPais}
                    onChange={(e) => setSelectedPais(e.target.value)}
                    className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                  >
                    {coneSulCountries.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Novo">+ Cadastrar Novo País...</option>
                  </select>

                  {selectedPais === 'Novo' && (
                    <input
                      type="text"
                      required
                      value={customPais}
                      onChange={(e) => setCustomPais(e.target.value)}
                      placeholder="Nome do novo país..."
                      className="w-full bg-[#1A1F71]/50 border border-[#FAA61A] text-white p-2 rounded-xl outline-none mt-2"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Status Geral do Cliente</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                  >
                    {trackStatusOptions.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Logo / Emoji / Ícone</label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="URL da imagem ou Emoji"
                    className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-300">Descrição Institucional</label>
                  <textarea
                    rows={2}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 2: Tracks do Cliente */}
            <div className="space-y-4 bg-[#1C2B3C] p-4 rounded-xl border border-[#273647]">
              <div className="flex items-center justify-between border-b border-[#273647] pb-2">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#FAA61A]" />
                  2. Tracks de Trabalho ({tracks.length})
                </span>

                <button
                  type="button"
                  onClick={handleAddTrack}
                  className="bg-[#1A1F71] hover:bg-blue-900 text-white text-[11px] font-semibold px-3 py-1 rounded-lg border border-blue-500/30 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FAA61A]" />
                  <span>+ Adicionar Track</span>
                </button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {tracks.map((track, idx) => (
                  <div key={track.id} className="bg-[#122131] p-3 rounded-xl border border-[#273647] space-y-3 relative">
                    <div className="flex items-center justify-between border-b border-[#273647]/50 pb-2">
                      <span className="text-[11px] font-bold text-[#FAA61A]">Track #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTrack(track.id)}
                        className="text-slate-400 hover:text-rose-400 text-[10px] flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Excluir Track
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Tipo */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-medium">Tipo de Track</label>
                        <select
                          value={track.tipo}
                          onChange={(e) => handleTrackChange(idx, 'tipo', e.target.value)}
                          className="w-full bg-[#1C2B3C] border border-[#273647] text-white p-2 rounded-lg text-xs"
                        >
                          <option value="Produto">📦 Produto Contratado</option>
                          <option value="Mandato">📋 Mandato Visa</option>
                          <option value="Outro">⚙️ Outro / Demanda Livre</option>
                        </select>
                      </div>

                      {/* Item Dinâmico */}
                      {track.tipo === 'Produto' ? (
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-medium">Produto</label>
                          <select
                            value={track.selectedProduto}
                            onChange={(e) => handleTrackChange(idx, 'selectedProduto', e.target.value)}
                            className="w-full bg-[#1C2B3C] border border-[#273647] text-white p-2 rounded-lg text-xs"
                          >
                            {productsList.map(p => <option key={p} value={p}>{p}</option>)}
                            <option value="Novo">+ Novo Produto...</option>
                          </select>
                          {track.selectedProduto === 'Novo' && (
                            <input
                              type="text"
                              value={track.customProduto}
                              onChange={(e) => handleTrackChange(idx, 'customProduto', e.target.value)}
                              placeholder="Nome do produto..."
                              className="w-full bg-[#1A1F71]/50 border border-[#FAA61A] text-white p-1.5 rounded-lg text-xs mt-1"
                            />
                          )}
                        </div>
                      ) : track.tipo === 'Mandato' ? (
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-medium">Mandato</label>
                          <select
                            value={track.selectedMandato}
                            onChange={(e) => handleTrackChange(idx, 'selectedMandato', e.target.value)}
                            className="w-full bg-[#1C2B3C] border border-[#273647] text-white p-2 rounded-lg text-xs"
                          >
                            {mandatesList.map(m => <option key={m} value={m}>{m}</option>)}
                            <option value="Novo">+ Novo Mandato...</option>
                          </select>
                          {track.selectedMandato === 'Novo' && (
                            <input
                              type="text"
                              value={track.customMandato}
                              onChange={(e) => handleTrackChange(idx, 'customMandato', e.target.value)}
                              placeholder="Nome do mandato..."
                              className="w-full bg-[#1A1F71]/50 border border-[#FAA61A] text-white p-1.5 rounded-lg text-xs mt-1"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-medium">Descrição da Demanda</label>
                          <input
                            type="text"
                            value={track.descricaoOutro}
                            onChange={(e) => handleTrackChange(idx, 'descricaoOutro', e.target.value)}
                            placeholder="Descreva..."
                            className="w-full bg-[#1C2B3C] border border-[#273647] text-white p-2 rounded-lg text-xs"
                          />
                        </div>
                      )}

                      {/* Status (7 Opções) */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-medium">Status Oficial</label>
                        <select
                          value={track.status}
                          onChange={(e) => handleTrackChange(idx, 'status', e.target.value)}
                          className="w-full bg-[#1C2B3C] border border-[#273647] text-white p-2 rounded-lg text-xs"
                        >
                          {trackStatusOptions.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                      </div>

                      {/* Responsável */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-medium">Responsável</label>
                        <input
                          type="text"
                          value={track.responsavel}
                          onChange={(e) => handleTrackChange(idx, 'responsavel', e.target.value)}
                          placeholder="Responsável"
                          className="w-full bg-[#1C2B3C] border border-[#273647] text-white p-2 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#273647]">
              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                className="text-rose-400 hover:text-rose-300 font-semibold text-xs flex items-center gap-1 px-3 py-2 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Excluir Cliente</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#FAA61A] hover:bg-[#E59510] text-[#0A142F] font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
