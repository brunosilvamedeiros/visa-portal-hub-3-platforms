import React from 'react';
import { Search, PlusCircle, LayoutDashboard, UploadCloud, BookOpen, UserPlus } from 'lucide-react';

export default function TopNavbar({ activeTab, setActiveTab, searchQuery, setSearchQuery, onOpenIngestion, onOpenRegisterClient }) {
  return (
    <header className="bg-[#0A142F] border-b border-[#1e293b] sticky top-0 z-50 shadow-md">
      {/* Top Header Row */}
      <div className="max-w-[1440px] mx-auto px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Branded Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#FAA61A] text-[#0A142F] font-black px-3 py-1 rounded text-xl tracking-tighter shadow-md">
            VISA
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Base de Conhecimento Ativa
              <span className="bg-[#1A1F71] text-xs font-semibold px-2 py-0.5 rounded text-blue-200 border border-blue-500/30">
                GESTÃO CONE SUL
              </span>
            </h1>
            <p className="text-xs text-slate-400">Projetos Macros, Mandatos & Transcrições</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-xl w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar clientes (BROU, Corrientes), tracks (Apple Pay, VTS, CTP), atas ou dicionário..."
            className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-slate-200 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
          />
        </div>

        {/* Action Buttons & User Profile */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={onOpenRegisterClient}
            className="bg-[#1A1F71] hover:bg-blue-900 text-white border border-blue-500/30 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 active:scale-95 shadow"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#FAA61A]" />
            <span>+ Novo Cliente & Tracks</span>
          </button>

          <button
            onClick={onOpenIngestion}
            className="bg-[#FAA61A] hover:bg-[#E59510] text-[#0A142F] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center space-x-1.5 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Ingerir Conteúdo</span>
          </button>

          <div className="flex items-center space-x-2 bg-[#122131] border border-[#273647] px-3 py-1.5 rounded-xl text-xs">
            <div className="w-6 h-6 rounded-full bg-[#1A1F71] text-[#FAA61A] font-bold flex items-center justify-center text-xs border border-[#FAA61A]/30">
              B
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-white leading-tight">Bruno</div>
              <div className="text-[10px] text-slate-400">PM Client Onboarding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Clean Tabs Bar */}
      <div className="bg-[#051424] border-t border-[#1e293b] px-6">
        <div className="max-w-[1440px] mx-auto flex space-x-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dashboard' || activeTab === 'projects' || activeTab === 'project-detail'
                ? 'bg-[#1A1F71] text-white border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#122131]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#FAA61A]" />
            <span>Dashboard & Clientes (Cone Sul)</span>
          </button>

          <button
            onClick={() => setActiveTab('ingestion')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ingestion'
                ? 'bg-[#1A1F71] text-white border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#122131]'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#FAA61A]" />
            <span>Central de Ingestão</span>
          </button>

          <button
            onClick={onOpenRegisterClient}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'register-client'
                ? 'bg-[#1A1F71] text-white border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#122131]'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#FAA61A]" />
            <span>Cadastrar Cliente & Tracks</span>
          </button>

          <button
            onClick={() => setActiveTab('wiki')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'wiki'
                ? 'bg-[#1A1F71] text-white border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#122131]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#FAA61A]" />
            <span>Wiki & Conhecimento Geral</span>
          </button>
        </div>
      </div>
    </header>
  );
}
