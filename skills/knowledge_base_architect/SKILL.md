---
name: kb-architect-visa-kb
description: Skill de Arquitetura de Informação e Gestão de Conhecimento para organização multiformato (transcrições, atas, PPTX, PDFs, links, dicionários).
---

# Skill: Knowledge Base & Information Architect

## Modelo de Informação e Grafo de Conhecimento

### 📊 Taxonomia de Arquivos & Metadados
Toda entidade na base possui um cabeçalho de metadados em **YAML Frontmatter**:

```yaml
---
id: proj-001
cliente: Banco Alfa
produto: Apple Pay & VTS
status: Em Implementacao
fase: Certificacao
gerente: Bruno
data_inicio: 2026-07-01
ult_reuniao: 2026-07-20
tags: [apple-pay, vts, cert, banco-alfa]
---
```

### 📁 Mapeamento de Entidades
1. **Projetos (`/projetos`)**: Concentram o estado atual, entregáveis, histórico de reuniões e documentos associados.
2. **Reuniões & Atas (`/reunioes`)**: Transcrições brutas + resumos processados por IA contendo *Action Items*, *Decisões* e *Riscos*.
3. **Documentação Técnica & Mandatos (`/docs_tecnicos`)**: Manuais de integração, especificações Visa, decks PPTX/PDF convertidos/indexados e links externos.
4. **Produtos (`/produtos`)**: Páginas vivas de referência para Apple Pay, Google Pay, Garmin Pay, Samsung Pay, Click to Pay, etc.
5. **Dicionário de Dados (`/dicionario`)**: Mapeamento de campos, siglas (VTS, TR-TSP, ARQC, ARPC, ISO8583) e regras de validação.

### 🔗 Links Cruzados (Bi-directional Linking)
- Uma nota de **Reunião** se conecta a **1 Projeto**, menciona **N Produtos** e cita **N Termos do Dicionário**.
- O **Dashboard Web** lê essas conexões dinamicamente para renderizar gráficos de relacionamentos e atalhos rápidos.
