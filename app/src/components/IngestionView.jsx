import React, { useState } from 'react';
import { UploadCloud, FileText, Link, Sparkles, CheckCircle2, FileUp, ArrowRight, Layers, Globe } from 'lucide-react';

export default function IngestionView({ projects, onSaveIngestion }) {
  const [contentType, setContentType] = useState('transcript');
  const [scopeLevel, setScopeLevel] = useState('track'); // 'track' | 'macro' | 'general'
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [selectedTrackId, setSelectedTrackId] = useState(projects[0]?.tracks?.[0]?.id || '');
  const [transcriptText, setTranscriptText] = useState('');
  const [urlLink, setUrlLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const selectedTrack = (selectedProject?.tracks || []).find(t => t.id === selectedTrackId) || selectedProject?.tracks?.[0];

  const handleSave = (e) => {
    e.preventDefault();
    if (!transcriptText && !fileName && !urlLink) return;

    const newMeeting = {
      id: `mtg-${Date.now()}`,
      projeto_id: scopeLevel === 'general' ? null : selectedProject.id,
      track_id: scopeLevel === 'track' ? selectedTrack?.id : null,
      cliente: scopeLevel === 'general' ? 'Conhecimento Geral Visa' : selectedProject.cliente,
      track_nome: scopeLevel === 'track' ? selectedTrack?.nome : scopeLevel === 'macro' ? 'Visão Geral Macro' : 'Base Geral',
      escopo: scopeLevel === 'track' ? 'Track Específica' : scopeLevel === 'macro' ? 'Projeto Macro' : 'Conhecimento Geral',
      titulo: contentType === 'transcript' 
        ? `Reunião Ingerida — ${selectedProject?.cliente || 'Visa'}`
        : contentType === 'deck'
        ? `Apresentação / Deck — ${fileName || 'Arquivo'}`
        : `Documentação Web — ${urlLink || 'Link'}`,
      data: new Date().toLocaleDateString('pt-BR'),
      tipo: contentType === 'transcript' ? 'Transcrição & Ata' : 'Documento / Mídia',
      resumo_ia: transcriptText 
        ? transcriptText.slice(0, 180) + '...' 
        : `Documento "${fileName || urlLink}" processado e integrado à base de conhecimento.`,
      participantes: ["Bruno (Visa)", `Equipe ${selectedProject?.cliente || 'Visa'}`],
      action_items: [
        { text: "Validar itens extraídos da reunião", owner: "Bruno", done: false }
      ]
    };

    onSaveIngestion(newMeeting);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setTranscriptText('');
      setFileName('');
      setUrlLink('');
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#122131] border border-[#273647] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UploadCloud className="w-6 h-6 text-[#FAA61A]" />
            Central de Ingestão Multiformato
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Faça upload ou cole transcrições de reuniões de clientes, tracks técnicas ou materiais de conhecimento geral Visa.
          </p>
        </div>

        <span className="bg-[#1A1F71] text-[#FAA61A] text-xs font-semibold px-3 py-1 rounded-full border border-[#FAA61A]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          IA Extratora Ativa
        </span>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Area (2/3 Left) */}
        <div className="lg:col-span-2 bg-[#122131] border border-[#273647] p-6 rounded-2xl space-y-6">
          
          {/* Nível de Associação (Scope Selector) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">1. Associar Conteúdo A:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setScopeLevel('track')}
                className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left space-y-1 ${
                  scopeLevel === 'track' ? 'bg-[#1A1F71] border-[#FAA61A] text-white' : 'bg-[#1C2B3C] border-[#273647] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#FAA61A]">
                  <Layers className="w-4 h-4" />
                  <span>Track Específica</span>
                </div>
                <div className="text-[10px] text-slate-300 font-normal">Ex: Track Garmin Pay, Track VTS</div>
              </button>

              <button
                type="button"
                onClick={() => setScopeLevel('macro')}
                className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left space-y-1 ${
                  scopeLevel === 'macro' ? 'bg-[#1A1F71] border-[#FAA61A] text-white' : 'bg-[#1C2B3C] border-[#273647] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#FAA61A]">
                  <FileText className="w-4 h-4" />
                  <span>Projeto Macro Cliente</span>
                </div>
                <div className="text-[10px] text-slate-300 font-normal">Alinhamento geral do cliente</div>
              </button>

              <button
                type="button"
                onClick={() => setScopeLevel('general')}
                className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left space-y-1 ${
                  scopeLevel === 'general' ? 'bg-[#1A1F71] border-[#FAA61A] text-white' : 'bg-[#1C2B3C] border-[#273647] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[#FAA61A]">
                  <Globe className="w-4 h-4" />
                  <span>Conhecimento Geral</span>
                </div>
                <div className="text-[10px] text-slate-300 font-normal">Manuais & decolagens de mercado</div>
              </button>
            </div>
          </div>

          {/* Project & Track Dropdowns */}
          {scopeLevel !== 'general' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Cliente / Projeto Macro</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    const proj = projects.find(p => p.id === e.target.value);
                    if (proj?.tracks?.length) setSelectedTrackId(proj.tracks[0].id);
                  }}
                  className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white text-xs rounded-xl p-3 outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.cliente} — {p.titulo}
                    </option>
                  ))}
                </select>
              </div>

              {scopeLevel === 'track' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Track de Trabalho</label>
                  <select
                    value={selectedTrackId}
                    onChange={(e) => setSelectedTrackId(e.target.value)}
                    className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white text-xs rounded-xl p-3 outline-none"
                  >
                    {(selectedProject?.tracks || []).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome} ({t.tipo})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Content Type Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">2. Formato do Material</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setContentType('transcript')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                  contentType === 'transcript'
                    ? 'bg-[#1A1F71] border-[#FAA61A] text-white'
                    : 'bg-[#1C2B3C] border-[#273647] text-slate-400 hover:text-white'
                }`}
              >
                Transcrição / Ata
              </button>

              <button
                type="button"
                onClick={() => setContentType('deck')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                  contentType === 'deck'
                    ? 'bg-[#1A1F71] border-[#FAA61A] text-white'
                    : 'bg-[#1C2B3C] border-[#273647] text-slate-400 hover:text-white'
                }`}
              >
                Apresentação / PDF
              </button>

              <button
                type="button"
                onClick={() => setContentType('spec')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                  contentType === 'spec'
                    ? 'bg-[#1A1F71] border-[#FAA61A] text-white'
                    : 'bg-[#1C2B3C] border-[#273647] text-slate-400 hover:text-white'
                }`}
              >
                Especificação Visa
              </button>

              <button
                type="button"
                onClick={() => setContentType('url')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                  contentType === 'url'
                    ? 'bg-[#1A1F71] border-[#FAA61A] text-white'
                    : 'bg-[#1C2B3C] border-[#273647] text-slate-400 hover:text-white'
                }`}
              >
                Link Web / URL
              </button>
            </div>
          </div>

          {/* Dynamic Content Inputs */}
          {contentType === 'deck' || contentType === 'spec' ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Upload de Arquivo (PPTX, PDF, DOCX)</label>
              <div 
                onClick={() => setFileName("Apresentacao_Arquitetura_Track.pptx")}
                className="border-2 border-dashed border-[#273647] hover:border-[#FAA61A] bg-[#1C2B3C] p-8 rounded-2xl text-center cursor-pointer transition-all space-y-2 group"
              >
                <FileUp className="w-8 h-8 text-[#FAA61A] mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-xs font-medium text-slate-200">
                  {fileName ? `Arquivo selecionado: ${fileName}` : 'Clique para selecionar ou arraste o arquivo aqui'}
                </p>
                <p className="text-[10px] text-slate-400">Suporta PPTX, PDF, MP3 e TXT até 50MB</p>
              </div>
            </div>
          ) : contentType === 'url' ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">URL da Documentação Técnica</label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={urlLink}
                  onChange={(e) => setUrlLink(e.target.value)}
                  placeholder="https://developer.visa.com/site/specifications/vts-api-v2..."
                  className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white text-xs rounded-xl pl-10 pr-4 py-3 outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Cole a Transcrição ou Ata da Reunião</label>
              <textarea
                rows={5}
                value={transcriptText}
                onChange={(e) => setTranscriptText(e.target.value)}
                placeholder="Cole aqui o texto exportado do Teams/Zoom/Meet ou anotações da reunião..."
                className="w-full bg-[#1C2B3C] border border-[#273647] focus:border-[#FAA61A] text-white text-xs rounded-xl p-4 outline-none leading-relaxed"
              ></textarea>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#273647]">
            <button
              type="button"
              onClick={() => { setTranscriptText(''); setFileName(''); setUrlLink(''); }}
              className="text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-xl transition-colors"
            >
              Limpar
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="bg-[#FAA61A] hover:bg-[#E59510] text-[#0A142F] font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center space-x-2 active:scale-95"
            >
              <span>Processar e Salvar na Base Viva</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {isSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs p-4 rounded-xl flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Conteúdo ingerido com sucesso na base viva!</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Preview Panel */}
        <div className="bg-[#122131] border border-[#273647] p-6 rounded-2xl space-y-6">
          <div className="border-b border-[#273647] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FAA61A]" />
              Painel Extrator IA (Preview)
            </h3>
            <p className="text-[10px] text-slate-400">Detecção e indexação semântica</p>
          </div>

          {/* Detected Metadata */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mapeamento de Destino</span>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="bg-[#1C2B3C] p-2.5 rounded-lg border border-[#273647]">
                <span className="text-slate-400">Escopo: </span>
                <strong className="text-white">
                  {scopeLevel === 'track' ? 'Track Específica' : scopeLevel === 'macro' ? 'Visão Macro Cliente' : 'Conhecimento Geral'}
                </strong>
              </div>
              {scopeLevel !== 'general' && (
                <>
                  <div className="bg-[#1C2B3C] p-2.5 rounded-lg border border-[#273647]">
                    <span className="text-slate-400">Cliente: </span>
                    <strong className="text-white">{selectedProject?.cliente}</strong>
                  </div>
                  {scopeLevel === 'track' && (
                    <div className="bg-[#1C2B3C] p-2.5 rounded-lg border border-[#273647]">
                      <span className="text-slate-400">Track: </span>
                      <strong className="text-amber-300">{selectedTrack?.nome}</strong>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* AI Action Items */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Action Items Extraídos</span>
            <div className="bg-[#1C2B3C] border border-[#273647] p-3 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#FAA61A]"></span>
                <span className="text-white font-medium">Validar suítes no simulador</span>
              </div>
              <div className="text-[10px] text-slate-400 pl-4">Responsável: Fernando Mendes</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
