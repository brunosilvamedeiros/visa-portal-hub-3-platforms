import React, { useState } from 'react';
import { Building2, Globe, FileText, Image, Layers, Plus, Trash2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { initialConeSulCountries, initialMandatesList, trackStatusOptions, initialProducts } from '../mockData';

export default function ClientRegistrationView({ onSaveClient, onCancel }) {
  // Country & Dynamic Countries List
  const [coneSulCountries, setConeSulCountries] = useState(initialConeSulCountries);
  const [mandatesList, setMandatesList] = useState(initialMandatesList);
  const [productsList, setProductsList] = useState(initialProducts.map(p => p.nome));

  // Client Data
  const [nome, setNome] = useState('');
  const [selectedPais, setSelectedPais] = useState('Brasil');
  const [customPais, setCustomPais] = useState('');
  const [descricao, setDescricao] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // Tracks List
  const [tracks, setTracks] = useState([
    {
      id: 'tr-new-1',
      tipo: 'Produto', // 'Produto' | 'Mandato' | 'Outro'
      selectedProduto: 'Apple Pay',
      customProduto: '',
      selectedMandato: 'OCT (Original Credit Transaction)',
      customMandato: '',
      descricaoOutro: '',
      status: 'Aguardando início',
      responsavel: ''
    }
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddTrackField = () => {
    setTracks([
      ...tracks,
      {
        id: `tr-new-${Date.now()}`,
        tipo: 'Produto',
        selectedProduto: 'Google Pay',
        customProduto: '',
        selectedMandato: 'Click to Pay',
        customMandato: '',
        descricaoOutro: '',
        status: 'Aguardando início',
        responsavel: ''
      }
    ]);
  };

  const handleRemoveTrackField = (index) => {
    if (tracks.length === 1) return;
    setTracks(tracks.filter((_, i) => i !== index));
  };

  const handleTrackChange = (index, field, value) => {
    const updated = [...tracks];
    updated[index][field] = value;
    setTracks(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome) return;

    // Resolve Country Name
    const finalPais = selectedPais === 'Novo' ? customPais.trim() || 'Desconhecido' : selectedPais;

    // Resolve and Validate Tracks
    const validTracks = tracks.map((t, idx) => {
      let trackNome = '';
      let finalProduto = '';
      let finalMandato = '';

      if (t.tipo === 'Produto') {
        const prodName = t.selectedProduto === 'Novo' ? t.customProduto.trim() || 'Novo Produto' : t.selectedProduto;
        trackNome = prodName;
        finalProduto = prodName;

        // Add to global products list if new
        if (t.selectedProduto === 'Novo' && t.customProduto.trim() && !productsList.includes(t.customProduto.trim())) {
          setProductsList(prev => [...prev, t.customProduto.trim()]);
        }
      } else if (t.tipo === 'Mandato') {
        const mandName = t.selectedMandato === 'Novo' ? t.customMandato.trim() || 'Novo Mandato' : t.selectedMandato;
        trackNome = mandName;
        finalMandato = mandName;

        // Add to global mandates list if new
        if (t.selectedMandato === 'Novo' && t.customMandato.trim() && !mandatesList.includes(t.customMandato.trim())) {
          setMandatesList(prev => [...prev, t.customMandato.trim()]);
        }
      } else {
        trackNome = t.descricaoOutro.trim() || `Track Outro #${idx + 1}`;
      }

      return {
        id: `tr-${Date.now()}-${idx}`,
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

    const newClient = {
      id: `proj-${Date.now()}`,
      cliente: nome,
      titulo: `Projeto Macro — ${nome}`,
      pais: finalPais,
      descricao: descricao || 'Emissor no Cone Sul em processo de onboarding e implementação.',
      logo: logoUrl || (finalPais === 'Brasil' ? '🇧🇷' : finalPais === 'Argentina' ? '🇦🇷' : finalPais === 'Chile' ? '🇨🇱' : finalPais === 'Uruguai' ? '🇺🇾' : finalPais === 'Paraguai' ? '🇵🇾' : '🌍'),
      status: validTracks.length > 0 ? validTracks[0].status : "Aguardando início",
      faseIndex: 0,
      fases: trackStatusOptions,
      gerente_visa: "Bruno",
      data_inicio: new Date().toLocaleDateString('pt-BR'),
      progresso: 25,
      produtos: Array.from(new Set(validTracks.map(t => t.produto).filter(Boolean))),
      tags: [nome.toLowerCase().replace(/\s+/g, '-'), finalPais.toLowerCase()],
      tracks: validTracks
    };

    onSaveClient(newClient);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onCancel();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Dashboard</span>
        </button>

        <span className="bg-[#1A1F71] text-[#FAA61A] text-xs font-semibold px-3 py-1 rounded-full border border-[#FAA61A]/30">
          Cadastro de Cliente & Tracks (Cone Sul)
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Dados do Cliente */}
        <div className="bg-[#122131] border border-[#273647] p-6 rounded-2xl space-y-6">
          <div className="border-b border-[#273647] pb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A1F71] text-[#FAA61A] flex items-center justify-center border border-[#FAA61A]/20 font-bold">
                1
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#FAA61A]" />
                  Dados do Cliente
                </h2>
                <p className="text-xs text-slate-400">Informações institucionais e localização no Cone Sul</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Nome do Cliente */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-300">Nome do Cliente / Instituição *</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Banco Alfa, Banco Sul, Fintech Uruguai..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              />
            </div>

            {/* País de Origem (Cone Sul + Novo) */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>País de Origem (Cone Sul) *</span>
              </label>
              <select
                value={selectedPais}
                onChange={(e) => setSelectedPais(e.target.value)}
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              >
                {coneSulCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="Novo">+ Cadastrar Novo País...</option>
              </select>

              {selectedPais === 'Novo' && (
                <input
                  type="text"
                  required
                  value={customPais}
                  onChange={(e) => setCustomPais(e.target.value)}
                  placeholder="Digite o nome do novo país..."
                  className="w-full bg-[#1A1F71]/50 border border-[#FAA61A] text-white p-2.5 rounded-xl outline-none mt-2 animate-fadeIn"
                />
              )}
            </div>

            {/* Descrição do Cliente */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Descrição Institucional</span>
              </label>
              <textarea
                rows={2}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o perfil do cliente no Cone Sul, base de cartões ou foco estratégico..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Logo do Cliente */}
            <div className="md:col-span-2 space-y-2">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Image className="w-3.5 h-3.5 text-emerald-400" />
                <span>Logo / Avatar do Cliente (URL da imagem ou Emoji - Opcional)</span>
              </label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Link da imagem da marca ou Emoji de bandeira (deixe em branco para automático)"
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white p-3 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Tracks do Cliente (Simplificado) */}
        <div className="bg-[#122131] border border-[#273647] p-6 rounded-2xl space-y-6">
          <div className="border-b border-[#273647] pb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A1F71] text-[#FAA61A] flex items-center justify-center border border-[#FAA61A]/20 font-bold">
                2
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#FAA61A]" />
                  Tracks de Trabalho do Cliente
                </h2>
                <p className="text-xs text-slate-400">Selecione o tipo de track (Produto, Mandato ou Outro) e os itens específicos</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddTrackField}
              className="bg-[#1A1F71] hover:bg-blue-900 text-white border border-blue-500/30 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4 text-[#FAA61A]" />
              <span>+ Adicionar Track</span>
            </button>
          </div>

          {/* Dynamic Tracks Form List */}
          <div className="space-y-4">
            {tracks.map((track, idx) => (
              <div
                key={track.id}
                className="bg-[#1C2B3C] border border-[#273647] p-5 rounded-xl space-y-4 hover:border-[#FAA61A]/50 transition-all relative"
              >
                <div className="flex items-center justify-between border-b border-[#273647]/60 pb-3">
                  <span className="text-xs font-bold text-[#FAA61A] flex items-center gap-2">
                    <span className="bg-[#122131] text-slate-300 w-5 h-5 rounded-full flex items-center justify-center text-[11px] border border-[#273647]">
                      {idx + 1}
                    </span>
                    Track #{idx + 1}
                  </span>

                  {tracks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTrackField(idx)}
                      className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover Track</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  {/* 1. Selecionar Tipo de Track FIRST */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">1. Tipo de Track *</label>
                    <select
                      value={track.tipo}
                      onChange={(e) => handleTrackChange(idx, 'tipo', e.target.value)}
                      className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                    >
                      <option value="Produto">📦 Produto Contratado</option>
                      <option value="Mandato">📋 Mandato Visa</option>
                      <option value="Outro">⚙️ Outro / Demanda Livre</option>
                    </select>
                  </div>

                  {/* 2. Seleção Dinâmica baseada no Tipo */}
                  {track.tipo === 'Produto' ? (
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-semibold text-slate-300">2. Produto Contratado *</label>
                      <select
                        value={track.selectedProduto}
                        onChange={(e) => handleTrackChange(idx, 'selectedProduto', e.target.value)}
                        className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                      >
                        {productsList.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                        <option value="Novo">+ Cadastrar Novo Tipo de Produto...</option>
                      </select>

                      {track.selectedProduto === 'Novo' && (
                        <input
                          type="text"
                          required
                          value={track.customProduto}
                          onChange={(e) => handleTrackChange(idx, 'customProduto', e.target.value)}
                          placeholder="Digite o nome do novo produto (ex: Visa Direct, B2B Payments)..."
                          className="w-full bg-[#1A1F71]/50 border border-[#FAA61A] text-white p-2.5 rounded-xl outline-none mt-2 animate-fadeIn"
                        />
                      )}
                    </div>
                  ) : track.tipo === 'Mandato' ? (
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-semibold text-slate-300">2. Mandato Visa Disponível *</label>
                      <select
                        value={track.selectedMandato}
                        onChange={(e) => handleTrackChange(idx, 'selectedMandato', e.target.value)}
                        className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                      >
                        {mandatesList.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                        <option value="Novo">+ Cadastrar Novo Mandato...</option>
                      </select>

                      {track.selectedMandato === 'Novo' && (
                        <input
                          type="text"
                          required
                          value={track.customMandato}
                          onChange={(e) => handleTrackChange(idx, 'customMandato', e.target.value)}
                          placeholder="Digite o nome do novo mandato (ex: Mandato 3DS 2.2, Mandato Tokenization Q1)..."
                          className="w-full bg-[#1A1F71]/50 border border-[#FAA61A] text-white p-2.5 rounded-xl outline-none mt-2 animate-fadeIn"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="font-semibold text-slate-300">2. Descrição Livre da Demanda / Track *</label>
                      <input
                        type="text"
                        required
                        value={track.descricaoOutro}
                        onChange={(e) => handleTrackChange(idx, 'descricaoOutro', e.target.value)}
                        placeholder="Descreva a demanda (ex: Migração de Core Banking, Atualização de BIN)..."
                        className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                      />
                    </div>
                  )}

                  {/* 3. Status Oficial da Track (7 Opções) */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-semibold text-slate-300">3. Status Oficial da Track *</label>
                    <select
                      value={track.status}
                      onChange={(e) => handleTrackChange(idx, 'status', e.target.value)}
                      className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                    >
                      {trackStatusOptions.map((st) => (
                        <option key={st} value={st}>
                          {st === 'Bloqueado' ? '⛔ Bloqueado' : st === 'Concluído' ? '✅ Concluído' : st === 'Em homologação' ? '🧪 Em homologação' : st === 'Em implementação' ? '⚙️ Em implementação' : st === 'Verificação jurídica' ? '⚖️ Verificação jurídica' : st === 'Verificando requisitos' ? '🔍 Verificando requisitos' : '⏳ Aguardando início'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Responsável da Track */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Líder / Responsável</label>
                    <input
                      type="text"
                      value={track.responsavel}
                      onChange={(e) => handleTrackChange(idx, 'responsavel', e.target.value)}
                      placeholder="Ex: Fernando Mendes (Cliente)..."
                      className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white p-2.5 rounded-xl outline-none"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions Footer */}
        <div className="flex items-center justify-between bg-[#122131] border border-[#273647] p-6 rounded-2xl">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-xl transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="bg-[#FAA61A] hover:bg-[#E59510] text-[#0A142F] font-bold text-xs px-8 py-3 rounded-xl transition-all shadow-lg flex items-center space-x-2 active:scale-95"
          >
            <span>Salvar Cliente & Tracks no Cone Sul</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs p-4 rounded-xl flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Cliente e Tracks cadastrados com sucesso no Cone Sul!</span>
          </div>
        )}

      </form>
    </div>
  );
}
