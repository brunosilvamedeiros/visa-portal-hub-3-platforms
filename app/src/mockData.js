// Dados Mockados para o Portal Unificado Visa (OpenProject + BookStack + Data Wiki)

export const initialProjectsMacro = [
  {
    id: "op-macro-01",
    openproject_id: 101,
    titulo: "Programa Onboarding & Wallets — Banco Alfa",
    cliente: "Banco Alfa",
    pais: "Brasil",
    bandeira: "🇧🇷",
    status: "Em Progresso",
    gerente: "Bruno",
    progresso: 75,
    data_inicio: "2026-06-01",
    data_fim: "2026-09-30",
    descricao: "Projeto Macro para Habilitação VTS, Apple Pay e Requisitos do Mandato ISO 8583 Field 48.",
    estante_id: "shelf-alfa-01",
    subprojetos: [
      {
        id: "op-micro-101",
        titulo: "Micro-Projeto 1: Integração SDK Apple Pay iOS",
        status: "Em Homologação",
        progresso: 90,
        responsavel: "Fernando Mendes (Banco Alfa)",
        entregavel: "Build 2.4 Aprovado CTE"
      },
      {
        id: "op-micro-102",
        titulo: "Micro-Projeto 2: Servidor VTS Token Requestor",
        status: "Em Desenvolvimento",
        progresso: 65,
        responsavel: "Carlos Eduardo (Visa)",
        entregavel: "Certificação API Gateway"
      },
      {
        id: "op-micro-103",
        titulo: "Micro-Projeto 3: Adaptação ISO 8583 Field 48 Subfield 22",
        status: "Requisitos",
        progresso: 40,
        responsavel: "Juliana Prado (Banco Alfa)",
        entregavel: "Payload Validator Script"
      }
    ]
  },
  {
    id: "op-macro-02",
    openproject_id: 102,
    titulo: "Programa Expand Mobile Wallets — Banco Sul",
    cliente: "Banco Sul",
    pais: "Argentina",
    bandeira: "🇦🇷",
    status: "Em Progresso",
    gerente: "Bruno",
    progresso: 45,
    data_inicio: "2026-07-01",
    data_fim: "2026-11-15",
    descricao: "Projeto Macro focado em Google Pay e Wearables (Garmin Pay / Fitbit Pay) no Cone Sul.",
    estante_id: "shelf-sul-02",
    subprojetos: [
      {
        id: "op-micro-201",
        titulo: "Micro-Projeto 1: Provisionamento Google Wallet Android",
        status: "Em Homologação",
        progresso: 60,
        responsavel: "Equipe Banco Sul",
        entregavel: "SDK Integration Test"
      },
      {
        id: "op-micro-202",
        titulo: "Micro-Projeto 2: Habilitação Garmin Pay VTS",
        status: "Análise Jurídica",
        progresso: 30,
        responsavel: "Equipe Garmin / Visa",
        entregavel: "Assinatura Contratual"
      }
    ]
  },
  {
    id: "op-macro-03",
    openproject_id: 103,
    titulo: "Programa Click to Pay & Direct Payments — Fintech Uruguai",
    cliente: "Fintech Uruguai",
    pais: "Uruguai",
    bandeira: "🇺🇾",
    status: "Planejamento",
    gerente: "Bruno",
    progresso: 20,
    data_inicio: "2026-07-15",
    data_fim: "2026-12-01",
    descricao: "Projeto Macro de e-commerce seguro com Click to Pay e liquidação via OCT.",
    estante_id: null,
    subprojetos: [
      {
        id: "op-micro-301",
        titulo: "Micro-Projeto 1: Setup Click to Pay Web SDK",
        status: "Início",
        progresso: 15,
        responsavel: "Bruno (Visa)",
        entregavel: "Workshop de Arquitetura"
      }
    ]
  }
];

// Estantes do BookStack (Separadas entre Estantes de Projetos e Estantes Gerais)
export const initialShelves = [
  // --- ESTANTES DE PROJETOS ---
  {
    id: "shelf-alfa-01",
    nome: "Estante: Onboarding Banco Alfa",
    tipo: "projeto", // 'projeto' ou 'geral'
    projeto_id: "op-macro-01",
    descricao: "Documentação técnica, atas de reunião e manuais específicos do projeto Banco Alfa.",
    icone: "FolderGit2",
    cor: "border-blue-500/30 bg-blue-500/5",
    livros: [
      {
        id: "book-alfa-arch",
        nome: "Arquitetura VTS & Apple Pay — Alfa",
        descricao: "Especificações de endpoints, certificados e chaves de criptografia.",
        paginas: [
          {
            id: "pg-alfa-01",
            titulo: "Fluxo de Push Provisioning iOS",
            conteudo: "# Fluxo de Push Provisioning iOS\n\n1. O app do **Banco Alfa** solicita a chave pública de criptografia à Visa.\n2. A Visa devolve o certificado digital assinado.\n3. O app envia os dados para a carteira Apple Pay."
          },
          {
            id: "pg-alfa-02",
            titulo: "Especificação ISO 8583 Field 48",
            conteudo: "# Mapeamento do Field 48 Subfield 22\n\n- **Subfield 22:** Token Cryptogram\n- **Subfield 23:** Token Requestor ID (TRID)"
          }
        ]
      },
      {
        id: "book-alfa-reunioes",
        nome: "Atas & Decisões — Banco Alfa",
        descricao: "Registro de reuniões semanais e alinhamentos de escopo.",
        paginas: [
          {
            id: "pg-alfa-ata-01",
            titulo: "Ata de Alinhamento CTE (20/07/2026)",
            conteudo: "Participantes: Bruno (Visa), Fernando (Banco Alfa).\nDecisão: Ajuste de 3 suítes de teste no simulador CTE até 30/07."
          }
        ]
      }
    ]
  },
  {
    id: "shelf-sul-02",
    nome: "Estante: Mobile Wallets Banco Sul",
    tipo: "projeto",
    projeto_id: "op-macro-02",
    descricao: "Documentos de integração Android Google Wallet e relógios Garmin.",
    icone: "Smartphone",
    cor: "border-emerald-500/30 bg-emerald-500/5",
    livros: [
      {
        id: "book-sul-gpay",
        nome: "Guia de Integração Google Wallet SDK",
        descricao: "Passo a passo para registro de App ID no Google Console.",
        paginas: [
          {
            id: "pg-sul-01",
            titulo: "Configuração do Push Provisioning Android",
            conteudo: "# Google Wallet SDK Setup\n\nUtilizar o pacote oficial `@google/wallet-push-provisioning` no projeto React Native / Android."
          }
        ]
      }
    ]
  },

  // --- ESTANTES DE INFORMAÇÕES GERAIS (Gerais / Não vinculadas a um projeto específico) ---
  {
    id: "shelf-geral-arquitetura",
    nome: "Estante Geral: Arquitetura & Padrões Visa Direct / VTS",
    tipo: "geral",
    projeto_id: null,
    descricao: "Guias globais de arquitetura, padrões de segurança e especificações corporativas da Visa.",
    icone: "BookOpen",
    cor: "border-amber-500/30 bg-amber-500/5",
    livros: [
      {
        id: "book-vts-core",
        nome: "VTS Core Specification v2.4",
        descricao: "Manual completo sobre Lifecycle Manager, Token Requestors e ARQC Cryptograms.",
        paginas: [
          {
            id: "pg-vts-01",
            titulo: "O que é Tokenization e DPAN",
            conteudo: "# Visa Token Service (VTS)\n\nO VTS substitui o número de cartão real (FPAN) por um token (DPAN) exclusivo por dispositivo ou e-commerce."
          },
          {
            id: "pg-vts-02",
            titulo: "Gerenciamento de Ciclo de Vida do Token",
            conteudo: "# Operações de Ciclo de Vida\n\n- **SUSPEND:** Pausa o token temporariamente.\n- **RESUME:** Reativa o token.\n- **DELETE:** Cancela o token permanentemente."
          }
        ]
      },
      {
        id: "book-pci-dss",
        nome: "Normas PCI-DSS & Segurança Tokenizada",
        descricao: "Requisitos de compliance para amostragem e armazenamento de cartões.",
        paginas: [
          {
            id: "pg-pci-01",
            titulo: "Isenção de Escopo PCI com VTS",
            conteudo: "# Redução do Escopo PCI\n\nAo utilizar DPAN e VTS, o emissor reduz drasticamente o escopo do ambiente de dados de cartão (CDE)."
          }
        ]
      }
    ]
  },
  {
    id: "shelf-geral-regulacao",
    nome: "Estante Geral: Regulamentação & Mandatos Bacen / EMVCo",
    tipo: "geral",
    projeto_id: null,
    descricao: "Documentos regulatórios, mandatos globais da Visa e resoluções do Banco Central.",
    icone: "ShieldCheck",
    cor: "border-purple-500/30 bg-purple-500/5",
    livros: [
      {
        id: "book-mandatos-2026",
        nome: "Guia de Mandatos Globais 2026",
        descricao: "Cronograma de mandatos obrigatórios para emissores e credenciadores no Cone Sul.",
        paginas: [
          {
            id: "pg-mandato-01",
            titulo: "Mandato Q3 2026 — COF Tokenization Mandatory",
            conteudo: "# Mandato Q3 2026\n\nTodos os emissores devem suportar renovação automática de tokens via VAU (Visa Account Updater)."
          }
        ]
      }
    ]
  },
  {
    id: "shelf-geral-sops",
    nome: "Estante Geral: Procedimentos Operacionais (SOPs)",
    tipo: "geral",
    projeto_id: null,
    descricao: "Modelos de ata, procedimentos de homologação e roteiros de suporte aos clientes.",
    icone: "FileText",
    cor: "border-cyan-500/30 bg-cyan-500/5",
    livros: [
      {
        id: "book-sop-homologacao",
        nome: "SOP: Processo de Certificação CTE Visa",
        descricao: "Checklist passo a passo para aprovação em ambiente de testes.",
        paginas: [
          {
            id: "pg-sop-01",
            titulo: "Checklist de Pré-Homologação",
            conteudo: "# Checklist CTE\n\n1. Validar certificado mTLS.\n2. Executar suíte de testes 0100/0200.\n3. Gerar relatório de evidências em PDF."
          }
        ]
      }
    ]
  }
];

// Wiki de Dados & Dicionário de Termos Tecnicos
export const initialDataTerms = [
  {
    id: "dt-dpan",
    termo: "DPAN (Device Primary Account Number)",
    categoria: "Tokenização",
    formato: "String (16 dígitos)",
    exemplo: "4921 **** **** 8812",
    definicao: "Número substituto de conta atribuído exclusivamente a um cartão tokenizado em dispositivo móvel ou e-commerce."
  },
  {
    id: "dt-trid",
    termo: "TRID (Token Requestor ID)",
    categoria: "Tokenização",
    formato: "String (11 dígitos)",
    exemplo: "40297100001",
    definicao: "Identificador único atribuído pela Visa ao solicitante de token (ex: Apple Pay, Google, Mercado Pago)."
  },
  {
    id: "dt-field48",
    termo: "ISO 8583 Field 48",
    categoria: "Mensageria",
    formato: "Varbyte / Hex",
    exemplo: "F48.SE22 = Cryptogram",
    definicao: "Campo de dados privados usado na autorização de transações para trafegar criptogramas e dados de token."
  },
  {
    id: "dt-arqc",
    termo: "ARQC (Authorization Request Cryptogram)",
    categoria: "Segurança",
    formato: "Cryptogram (8 bytes)",
    exemplo: "9F26 = A1B2C3D4E5F67890",
    definicao: "Criptograma gerado pelo chip do cartão ou enclave seguro do smartphone para autenticar a transação."
  }
];
