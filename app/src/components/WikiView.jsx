import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  FileText, 
  Code, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Key, 
  Cpu, 
  Layers, 
  Download, 
  FolderGit2, 
  CheckCircle2,
  FileCode,
  Tag,
  Clock
} from 'lucide-react';

export default function WikiView({ products = [], dictionary = [], generalKnowledge = [], searchQuery, setSearchQuery }) {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'documents'

  // Master Articles Tree
  const wikiTree = [
    {
      id: 'cat-brou-corrientes',
      title: '📁 Projetos Clientes (BROU & Corrientes)',
      icon: FolderGit2,
      articles: [
        {
          id: 'brou-dossier',
          title: 'BROU (Uruguai) — Dossier de Integração',
          category: 'Projetos Clientes',
          updated: '22/07/2026',
          tags: ['BROU', 'Uruguai', 'Sistarbank', 'Click to Pay', 'VTS'],
          type: 'dossier',
          summary: 'Dossier completo de acompanhamento do Banco de la República Oriental del Uruguay (BROU).',
          sections: [
            {
              heading: '1. Ficha Institucional & Contexto',
              paragraphs: [
                'Cliente: Banco de la República Oriental del Uruguay (BROU) — Banco público do Uruguai.',
                'Equipe Visa Lead: Jenny (com apoio da Lina Torres e Bruno).',
                'Engajamento: PMs Visa por ~6 meses (desde 14/abr/2026).',
                'Ecossistema Técnico: Processador Sistarbank (Sistarbanc) | Habilitador CTP: HST / HCT.',
                'Rota Crítica (Débito): Tokenização TD ➔ Click to Pay.'
              ]
            },
            {
              heading: '2. Frentes de Trabalho & Status Atual',
              paragraphs: [
                'Tokenização TD: Em implementação. O foco é destravar a base de dados do próprio banco para liberar o Click to Pay de débito.',
                'Billeteras (Carteiras Digitais): Em preparação. Google Pay já em testes (caso de Joyce); Apple Pay em revalidação de pré-requisitos por Emiliano (CS).',
                'Click to Pay: Aguardando tokenização / Sistarbank. Waiver aprovado até 30/setembro para Crédito e Pré-pago.',
                'Mandatos OCT-AFT & ANI: Em curso. Aguardando retorno das áreas de risco (29/jul) sobre a documentação enviada pelo Klaus.'
              ]
            },
            {
              heading: '3. Riscos & Alertas de Calendário',
              paragraphs: [
                'Congelamento do Banco (Freeze): O BROU possui congelamento total de instalações de 25 de novembro a janeiro. Qualquer ajuste técnico precisa ser implantado antes de fins de novembro.',
                'SteerCo Presencial: 1º Steering Committee agendado em Montevidéu aproveitando a visita de Lina e Vanesa.'
              ]
            }
          ]
        },
        {
          id: 'corrientes-dossier',
          title: 'Banco de Corrientes (Argentina) — Dossier',
          category: 'Projetos Clientes',
          updated: '17/07/2026',
          tags: ['Corrientes', 'Argentina', 'Prisma', 'Thales', 'Apple Pay'],
          type: 'dossier',
          summary: 'Dossier de homologação do Banco de Corrientes na Argentina.',
          sections: [
            {
              heading: '1. Ficha Institucional & Parceiros',
              paragraphs: [
                'Cliente: Banco de Corrientes (Argentina 🇦🇷).',
                'Líderes Visa: Lina Torres, Marlene Migliardi, Javier Cadena, Laura.',
                'Processador: Prisma | TSP/ITSP: Thales | Certificador: FIME.',
                'Frentes Principais: Apple Pay e Click to Pay.'
              ]
            },
            {
              heading: '2. Status por Frente & Diagnóstico Técnico',
              paragraphs: [
                'Click to Pay: Em homologação. Fluxo principal finalizado, ambientes prontos e provas em preprodução agendadas para 22/jul com a Prisma.',
                'Apple Pay Incident (Crash Fluxo Verde): O fluxo amarelo funciona 100% (recebe OTP). No fluxo verde (Push Provisioning), a aplicação do banco crashea antes de exibir os T&C.',
                'Causa Raiz Identificada: A requisição nem chega à Visa/Vital Signs pois o token/payload de login gerado no app do banco está expirado no SDK da Thales.'
              ]
            },
            {
              heading: '3. Ações Imediatas',
              paragraphs: [
                'Publicar build da aplicação no TestFlight (evitar testes apenas em release local no dispositivo).',
                'Reenviar e-mail de confirmação de AID à Apple.',
                'Cadastrar usuários adicionais no Partner Hub para evitar bloqueio único de conta.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cat-vdp',
      title: '🔑 Plataforma Visa Developer (VDP)',
      icon: Key,
      articles: [
        {
          id: 'vdp-config',
          title: 'Guia de Configuração VDP & OpenSSL',
          category: 'Plataforma VDP',
          updated: '23/07/2026',
          tags: ['VDP', '2-Way SSL', 'Shared Secret', 'OpenSSL'],
          type: 'guide',
          sections: [
            {
              heading: '1. Configuração do Projeto no Portal VDP',
              paragraphs: [
                'Acesse developer.visa.com/portal/app/dashboard e abra o projeto "Visa Digital Services Project".',
                'Em Settings, atualize o nome do projeto com a convenção: [Nome do Banco] Visa Digital Services Project.',
                'Em Credentials, configure a autenticação 2-Way SSL (Mutual Authentication) enviando o arquivo CSR.'
              ]
            },
            {
              heading: '2. Geração de Par de Chaves RSA 2048 & Shared Secret',
              paragraphs: [
                'Execute os seguintes comandos no terminal para gerar a chave RSA e descriptografar o Shared Secret (X-Pay Token):',
                'openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048',
                'openssl rsa -pubout -in private_key.pem -out public_key.pem',
                'cat encrypted_shared_secret.txt | base64 --decode > decoded_data.bin',
                'openssl pkeyutl -decrypt -in decoded_data.bin -inkey private_key.pem -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256 > decrypted_shared_secret.txt'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cat-vts-push',
      title: '⚡ Tokenização VTS & Push Provisioning',
      icon: Cpu,
      articles: [
        {
          id: 'vts-jwe-spec',
          title: 'Especificação JWE v1.13 & Parâmetros Payload',
          category: 'Tokenização VTS',
          updated: '23/07/2026',
          tags: ['JWE', 'isIDnV', 'AES-GCM-256', 'Field 48'],
          type: 'spec',
          sections: [
            {
              heading: '1. Estrutura JWE (JSON Web Encryption)',
              paragraphs: [
                'O Push Provisioning criptografa o PAN do cartão utilizando a especificação JWE compacta com o algoritmo AES-GCM-256KW.',
                'Campo accountNumber (Obrigatório): PAN de 13 a 19 dígitos.',
                'Campo isIDnV (Obrigatório): Se "false", indica que o usuário já está autenticado no aplicativo do banco, liberando o Fluxo Verde sem exigir OTP.',
                'Campo clientWalletProvider: TRID (Token Requestor ID) de 50 caracteres (ex: 40010075001 para Google Pay).'
              ]
            },
            {
              heading: '2. Mensageria ISO 8583',
              paragraphs: [
                'Mensagem 0100 TAR: Requisição de autenticação de token para envio de OTP no Fluxo Amarelo.',
                'Mensagem 0100 AV: Verificação automática de conta enviada ao host do emissor.',
                'Subfield 22 do Field 48: Transporta o cryptogram dinâmico EMV.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cat-[#132]',
      title: '🛡️ Gestão de Risco & Metadados (VRM / VCMM)',
      icon: ShieldCheck,
      articles: [
        {
          id: 'vrm-vcmm-rules',
          title: 'Regras VRM & Configuração VCMM (Google Pay)',
          category: 'Regras de Risco',
          updated: '23/07/2026',
          tags: ['VRM', 'VCMM', 'App-to-App', 'Códigos ISO'],
          type: 'rules',
          sections: [
            {
              heading: '1. Regras no Visa Risk Manager (VRM)',
              paragraphs: [
                'Prioridade 1 — Google Pay Lista Branca: Bloqueia cartões fora da lista de testes em Account Management.',
                'Prioridade 2 — Flujo Amarillo (sem Push): Regra Fija enviando código ISO 85 (Request More Information) para forçar o envio de OTP via TSP/Emissor.',
                'Exoneração do Fluxo Verde: Critério PAN Source NOT IN (03) libera requisições originadas do app do banco.',
                'Códigos ISO: ISO 00 (Aprovado), ISO 85 (Desafio OTP), ISO 05 (Recusado/Expirado), ISO 59 (Bloqueio Vermelho / STIP 9027).'
              ]
            },
            {
              heading: '2. Configuração VCMM (App-to-App)',
              paragraphs: [
                'Navegue em Manage Groups > Step Up Details e selecione o Token Requestor Google Inc - 40010075001.',
                'Marque a checkbox "Support App to App authentication".',
                'Em Platform Specific App Information, selecione ANDROID, digite o nome do pacote (ex: com.banco.app.verify) e informe a URL de Deep Link.'
              ]
            }
          ]
        }
      ]
    }
  ];

  // Document Library Records (All PDFs & Decks uploaded by user)
  const documentLibrary = [
    {
      id: 'doc-01',
      title: 'BROU — Banco de la República Oriental del Uruguay (PDF Ficha & Status)',
      client: 'BROU (Uruguai)',
      category: 'Dossier de Cliente',
      format: 'PDF (5 páginas)',
      date: '22/07/2026',
      summary: 'Status completo das frentes de Tokenização TD, Click to Pay, Billeteras e Mandatos OCT-AFT/ANI.',
      link: '#'
    },
    {
      id: 'doc-02',
      title: 'Banco de Corrientes (Argentina) — Status & Ficha Técnica (PDF)',
      client: 'Banco de Corrientes',
      category: 'Dossier de Cliente',
      format: 'PDF (3 páginas)',
      date: '17/07/2026',
      summary: 'Ficha completa do emissor na Argentina, processador Prisma, ITSP Thales e incidentes Apple Pay.',
      link: '#'
    },
    {
      id: 'doc-03',
      title: 'Minuta Oficial Weekly Click to Pay — Banco de Corrientes / Visa / Thales / Prisma',
      client: 'Banco de Corrientes',
      category: 'Minuta de Reunião',
      format: 'PDF Minuta',
      date: '17/07/2026',
      summary: 'Ata formal de alinhamento de ambientes, preprodução em 22/jul e reagendamento do SteerCo (29-31/jul).',
      link: '#'
    },
    {
      id: 'doc-04',
      title: 'BROU Roadmap Digital — Seguimiento Semanal (Apresentação Deck)',
      client: 'BROU (Uruguai)',
      category: 'Apresentação Executiva',
      format: 'PPTX Deck (9 slides)',
      date: '15/07/2026',
      summary: 'Deck executivo mostrando a rota crítica tokenização ➔ CTP e planejamento de waivers.',
      link: '#'
    },
    {
      id: 'doc-05',
      title: 'Google Pay Issuer Onboarding Guide (Accenture / Google)',
      client: 'Geral / Google Pay',
      category: 'Guia de Integração Provedor',
      format: 'PDF Manual (78 páginas)',
      date: '15/07/2026',
      summary: 'Guia oficial do Google com processo de Onboarding na Console, PGP Key Exchange, UPP e Field Testing.',
      link: '#'
    },
    {
      id: 'doc-06',
      title: 'Visa Developer Platform (VDP) — Interactive Clickable Guide',
      client: 'Geral / VDP',
      category: 'Guia de Plataforma',
      format: 'PDF Guia (26 páginas)',
      date: '23/07/2026',
      summary: 'Guia interativo da VDP para cadastro de projetos, 2-Way SSL, certificados MLE e convites de usuários.',
      link: '#'
    },
    {
      id: 'doc-07',
      title: 'VTS Push Provisioning Encrypted Payment Instrument Specification v1.13',
      client: 'Geral / VTS',
      category: 'Especificação Técnica',
      format: 'PDF Spec (17 páginas)',
      date: '03/10/2018',
      summary: 'Especificação técnica da estrutura JWE, criptografia AES-GCM-256KW e parâmetros isIDnV.',
      link: '#'
    },
    {
      id: 'doc-08',
      title: 'Configuration VCMM to Push Provisioning GPAY',
      client: 'Geral / VCMM',
      category: 'Guia de Configuração',
      format: 'PDF Diagrama',
      date: '23/07/2026',
      summary: 'Diagrama de telas do VCMM para habilitar suporte App-to-App e Deep Link no Google Pay.',
      link: '#'
    },
    {
      id: 'doc-09',
      title: 'Reglas de Caso de Uso en VRM — Billetera Google Pay',
      client: 'Geral / VRM',
      category: 'Manual de Risco',
      format: 'PDF Manual (10 páginas)',
      date: '2024',
      summary: 'Manual do Visa Risk Manager com instruções de criação de regras para Flujo Amarillo e Verde.',
      link: '#'
    },
    {
      id: 'doc-10',
      title: 'Proceso Push Provisioning GPAY — CSM & Integrations Team',
      client: 'Geral / Processos',
      category: 'Fluxograma de Processo',
      format: 'PDF Diagrama (3 páginas)',
      date: '2023',
      summary: 'Fluxograma de acompanhamento das 7 etapas entre o Client Success Manager e o Integrations Team.',
      link: '#'
    }
  ];

  // Active article state
  const [selectedArticleId, setSelectedArticleId] = useState('brou-dossier');
  const [expandedCategories, setExpandedCategories] = useState(['cat-brou-corrientes', 'cat-vdp', 'cat-vts-push', 'cat-[#132]']);

  // Find active article
  let activeArticle = null;
  for (const cat of wikiTree) {
    const found = cat.articles.find(a => a.id === selectedArticleId);
    if (found) {
      activeArticle = found;
      break;
    }
  }
  if (!activeArticle) activeArticle = wikiTree[0].articles[0];

  const toggleCategory = (catId) => {
    if (expandedCategories.includes(catId)) {
      setExpandedCategories(expandedCategories.filter(c => c !== catId));
    } else {
      setExpandedCategories([...expandedCategories, catId]);
    }
  };

  const filteredDocuments = documentLibrary.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#051424] text-slate-100 rounded-2xl border border-[#273647] overflow-hidden min-h-[780px] flex flex-col animate-fadeIn">
      
      {/* Top Header & Tab Switcher */}
      <div className="bg-[#0A142F] border-b border-[#273647] p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAA61A] text-[#0A142F] flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              Visa Knowledge Base — Wiki & Biblioteca de Documentos
              <span className="bg-[#1A1F71] text-[10px] font-semibold px-2 py-0.5 rounded text-blue-200 border border-blue-500/30">
                GitBook / Docusaurus Style
              </span>
            </h1>
            <p className="text-xs text-slate-400">Base Viva com Dossiês de Clientes (BROU & Corrientes), Manuais e Repositório de Documentos</p>
          </div>
        </div>

        {/* View Switcher: Artigos da Wiki VS Acervo de Documentos */}
        <div className="flex items-center space-x-2 bg-[#122131] border border-[#273647] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'articles' ? 'bg-[#1A1F71] text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#FAA61A]" />
            <span>Navegação por Artigos</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'documents' ? 'bg-[#1A1F71] text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Acervo de PDFs & Anexos ({documentLibrary.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: NAVEGAÇÃO DE ARTIGOS DA WIKI (GitBook Style) */}
      {activeTab === 'articles' && (
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* LEFT SIDEBAR TREE */}
          <aside className="w-full md:w-72 bg-[#0A142F]/60 border-r border-[#273647] p-4 space-y-4 overflow-y-auto">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center justify-between">
              <span>Módulos de Conhecimento</span>
              <span className="text-[#FAA61A] font-mono">v2.4</span>
            </div>

            <nav className="space-y-2 text-xs">
              {wikiTree.map((cat) => {
                const Icon = cat.icon;
                const isExpanded = expandedCategories.includes(cat.id);

                return (
                  <div key={cat.id} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#122131] transition-colors font-semibold text-left"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Icon className="w-4 h-4 text-[#FAA61A] shrink-0" />
                        <span className="truncate">{cat.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="ml-4 pl-2 border-l border-[#273647] space-y-1">
                        {cat.articles.map((art) => (
                          <button
                            key={art.id}
                            onClick={() => setSelectedArticleId(art.id)}
                            className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                              selectedArticleId === art.id
                                ? 'bg-[#1A1F71] text-white font-bold border border-blue-500/40'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-[#122131]'
                            }`}
                          >
                            <span className="truncate">{art.title}</span>
                            {selectedArticleId === art.id && <ChevronRight className="w-3 h-3 text-[#FAA61A] shrink-0" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* MAIN ARTICLE READING PANEL */}
          <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto bg-[#051424]">
            
            {/* Breadcrumb Header */}
            <div className="space-y-3 border-b border-[#273647] pb-5">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>Wiki</span>
                <span>/</span>
                <span className="text-slate-300">{activeArticle.category}</span>
                <span>/</span>
                <span className="text-[#FAA61A] font-semibold">{activeArticle.title}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className="text-2xl font-black text-white tracking-tight leading-snug">
                  {activeArticle.title}
                </h1>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-[#122131] text-slate-300 px-2.5 py-1 rounded-lg border border-[#273647]">
                    Atualizado em: {activeArticle.updated}
                  </span>
                  <span className="bg-[#1A1F71] text-blue-200 px-2.5 py-1 rounded-lg border border-blue-500/30 font-semibold">
                    Documento Oficial
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(activeArticle.tags || []).map((tag) => (
                  <span key={tag} className="bg-[#1C2B3C] text-[10px] text-amber-300 px-2 py-0.5 rounded font-mono border border-[#273647]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Clean Section Renderer */}
            <div className="space-y-6">
              {(activeArticle.sections || []).map((sec, i) => (
                <div key={i} className="bg-[#122131] border border-[#273647] p-6 rounded-2xl space-y-3">
                  <h3 className="text-base font-bold text-white border-b border-[#273647] pb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FAA61A]" />
                    {sec.heading}
                  </h3>
                  <div className="space-y-2">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Notice */}
            <div className="border-t border-[#273647] pt-6 flex justify-between items-center text-xs text-slate-400">
              <span>Sincronizado com os arquivos oficiais do projeto.</span>
              <span className="text-emerald-400 font-semibold">Status: Atualizado</span>
            </div>

          </main>
        </div>
      )}

      {/* TAB 2: ACERVO COMPLETO DE DOCUMENTOS & ANEXOS */}
      {activeTab === 'documents' && (
        <div className="p-6 md:p-8 space-y-6 flex-1 bg-[#051424] overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#273647] pb-4 gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                Acervo de Documentos, PDFs e Apresentações Ingeridas
              </h2>
              <p className="text-xs text-slate-400">
                Lista de todos os {documentLibrary.length} arquivos originais enviados para a base de conhecimento.
              </p>
            </div>

            {/* Search filter */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por BROU, Corrientes, Google Pay..."
                className="w-full bg-[#122131] border border-[#273647] focus:border-[#FAA61A] text-white text-xs rounded-xl pl-10 pr-4 py-2 outline-none"
              />
            </div>
          </div>

          {/* Document Cards Table / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#122131] border border-[#273647] hover:border-[#FAA61A] p-5 rounded-2xl space-y-3 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-[#1A1F71] text-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded border border-blue-500/30">
                    {doc.client}
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono bg-[#051424] px-2 py-0.5 rounded border border-[#273647]">
                    {doc.format}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#FAA61A] transition-colors leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-300 bg-[#1C2B3C] p-3 rounded-xl border border-[#273647]/50 leading-relaxed">
                  "{doc.summary}"
                </p>

                <div className="pt-2 border-t border-[#273647]/50 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Data: {doc.date}
                  </span>

                  <span className="text-[#FAA61A] font-semibold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Ingerido na Base
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
