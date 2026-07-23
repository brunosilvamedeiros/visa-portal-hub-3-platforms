import React from 'react';
import { 
  FolderGit2, 
  BookOpen, 
  Database, 
  Globe, 
  CheckCircle2, 
  Server, 
  Layers,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  openHostingGuide,
  dockerStatus
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-lg tracking-wider">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-base tracking-tight">Visa Portal Hub</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-medium">
                  3-Platforms Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">OpenProject + BookStack + Data Wiki</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projetos (OpenProject)</span>
            </button>

            <button
              onClick={() => setActiveTab('shelves')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'shelves'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Wiki & Estantes (BookStack)</span>
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'data'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Wiki de Dados</span>
            </button>
          </nav>

          {/* Right Actions & Docker Status */}
          <div className="flex items-center gap-3">
            {/* Status do Docker / Servicios */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400 text-[11px]">Docker Stack Active</span>
            </div>

            {/* Botão Guia Web Grátis */}
            <button
              onClick={openHostingGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-medium shadow-md shadow-emerald-600/20 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hospedar Grátis na Web</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
