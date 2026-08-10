---
id: proj-feet-01-sessoes
cliente: Feet Colombia
titulo: Quadro de Sessões — Execução do Roadmap 2026
status: Em Execucao
gerente: Bruno
coordenadora: session_01N2HTXDVaGku5z29N3sSJAJ (Roadmap de funcionalidades fim de ano)
repo_produto: https://github.com/Sants-M13/Medusa (base: staging)
data_inicio: 2026-08-10
tags: [feet-colombia, sessoes, orquestracao, roadmap-2026]
---

# Quadro de Sessões — Execução do Roadmap 2026

Gestão das sessões de trabalho do roadmap [Feet Colombia 2026](./Feet_Colombia_Roadmap_Funcionalidades_2026.md): **pequenas entregas coordenadas, 1 sessão = 1 entrega mergeável**, cada uma com o modelo adequado à complexidade.

## 🎛️ Como funciona

1. **Coordenadora**: esta sessão (`session_01N2HTXDVaGku5z29N3sSJAJ`) cria as sessões de trabalho com o modelo certo, acompanha o andamento (check-ins periódicos), integra os resultados ao roadmap e despacha a leva seguinte quando dependências fecham.
2. **Contrato de entrega de cada sessão**: branch própria `claude/<slug>` a partir de `staging` → PR pequena para `staging` (specs = doc-only; builds = código + testes) → memória `wip-<id>` → resumo de 5 linhas para a coordenadora (send_message, quando disponível).
   **Protocolo de merge (definido 10/08)**: o Bruno NÃO executa merges — a coordenadora lista as PRs prontas com resumo, o Bruno **autoriza no chat**, e a coordenadora executa: direto nos repos `brunosilvamedeiros/*`; no repo do produto (`Sants-M13/*`, fora do escopo da coordenadora) via sessão *merge-runner* (Haiku) com a autorização citada no prompt.
3. **Paralelismo sem conflito**: specs doc-only rodam em paralelo à vontade; **nunca duas sessões no mesmo módulo/pasta**; contratos entre ondas vêm da spec S0.1 (estados + eventos).
4. **Etiquetas**: sessões nascem com tags `feet-2026`, `fase-0|onda-1|…` e `feet-sessao:<id>`.

## 🧠 Guia de modelos por complexidade

| Modelo | Uso | Exemplos |
|---|---|---|
| **Opus 5** (`claude-opus-5`) | Arquitetura, contratos estruturantes, decisões caras de reverter | S0.1 estados/eventos, S0.3 caixa×pares, S2.3 spec fulfillment-ops, plano do cutover |
| **Sonnet 5** (`claude-sonnet-5`) | Desenvolvimento padrão de módulos, features e investigações | módulos wallet/invoicing/fulfillment-ops, auditoria, fronts |
| **Haiku 4.5** (`claude-haiku-4-5-20251001`) | Mecânico bem especificado | inventários, templates de notificação, relatórios simples, roteiros |
| **Fable 5** (esta sessão) | Coordenação, planejamento, integração dos achados | roadmap, quadro, despacho |

## 📋 Quadro de entregas

**Status**: 🚀 lançada · 📋 na fila · ⏸️ aguardando insumo · 🔎 PR aberta aguardando autorização · ✅ mergeada

### Fase 0 — Contratos e Modelagem (ago S3)
| ID | Entrega (PR pequena) | Modelo | Depende | Status |
|---|---|---|---|---|
| S0.1 | Spec: máquina de estados + catálogo de eventos (gate configurável `FACTURA_ANTES_DESPACHO`) | Opus 5 | — | ✅ #1231 |
| S0.2 | Auditoria Medusa v2 em produção (completa) | Sonnet 5 | — | ✅ #1230 |
| S0.3 | Decisão caixa × pares (ADR com dados reais de venda) | Opus 5 | ✅ + extração Asana | 📋 |
| S0.4 | Inventário de controles paralelos (7 controles mapeados) | Haiku 4.5 | — | ✅ #1229 |
| S0.5 | Spec do registro de fatura (base: fatura real FEET59785; 311 linhas) — via S0.5b | Haiku 4.5 | — | 🔎 PR #1233 |
| S0.6 | Extração de vendas históricas do Asana — **reatribuída à coordenadora** (conector Asana habilitado no chat; sessão bloqueada em ASANA_PAT arquivada) | Coordenadora (Fable) | conector ✔ | 🔁 10/08 |

### Onda 1 — Carteira (ago S4 → set)
| ID | Entrega | Modelo | Depende | Status |
|---|---|---|---|---|
| S1.0 | **Spec consolidada da Carteira** (`docs/specs/CARTEIRA.md`): ledger, estado de conta, comprovantes/conciliação, limite/gate, cutover, APIs, permissões — p/ revisão do Bruno | Opus 5 | specs Fase 0 ✅ | 🚀 10/08 |
| S1.1 | Módulo `wallet`: entidades do ledger + serviços + testes | Sonnet 5 | ✅ S0.1 | 🚀 10/08 |
| S1.2 | Estado de conta no admin: extrato, saldo, aging, export | Sonnet 5 | S1.1 | 📋 |
| S1.3 | Comprovantes: upload → fila de conciliação → baixa | Sonnet 5 | S1.1 | 📋 |
| S1.4 | Límite de crédito + gate no checkout + API saldo/limite | Sonnet 5 | S1.1 | 📋 |
| S1.5 | Cutover da cobrança: plano (Opus) + carga inicial e validação (Sonnet) | Opus → Sonnet | S1.1, S0.4 | 📋 |
| S1.6 | Alertas de vencimento / notificações | Haiku 4.5 | S1.2 | 📋 |

### Onda 2 — Logística (set → nov)
| ID | Entrega | Modelo | Depende | Status |
|---|---|---|---|---|
| S2.1 | Config estoque nativo: locations, níveis, reservas (1.405 testes verdes; `FUNDACAO_ESTOQUE.md` com roteiro de validação) | Sonnet 5 | ✅ S0.2 | 🔎 PR #1234 |
| S2.2 | Cadastro/grades + import (modelagem aplicada) | Sonnet 5 | S0.3 | 📋 |
| S2.3 | Spec das telas do fulfillment-ops (fila → pick → pack) | Opus 5 | S0.1 | 📋 |
| S2.4 | Build: fila + verificar + preparar | Sonnet 5 | S2.3 | 📋 |
| S2.5 | Build: pick/pack por operador + estado "Separado" + evento | Sonnet 5 | S2.4 | 📋 |
| S2.6 | Gate de expedição (consome `fatura.registrada`) | Sonnet 5 | S0.1 | 📋 |
| S2.7 | Movimentações + documento de transferência | Sonnet 5 | S2.1 | 📋 |
| S2.8 | Devoluções & garantias (Returns/Claims + política) | Sonnet 5 | S2.5 | 📋 |
| S2.9 | Relatórios operacionais | Haiku 4.5 | S2.5 | 📋 |

### Onda 3 — Contábil (out)
| ID | Entrega | Modelo | Depende | Status |
|---|---|---|---|---|
| S3.1 | Módulo `invoicing`: fila "pendentes de fatura" + notificações (evento mockável) | Sonnet 5 | S0.1 | 📋 |
| S3.2 | Registro de fatura: upload doc + radicado + `fatura.registrada` | Sonnet 5 | S3.1, S0.5 | 📋 |
| S3.3 | Notas crédito/débito de devoluções | Haiku 4.5 | S3.2, S2.8 | 📋 |

### Onda 4 — Comercial / Front REP (out → dez)
| ID | Entrega | Modelo | Depende | Status |
|---|---|---|---|---|
| S4.1 | Merge autorizado da PR #1228 ✅ (executado) + roteiro de validação com REPs | Haiku 4.5 | — | 🔎 PR #1232 |
| S4.2 | Quick wins "Now" do estudo + bug #593 (timeline Facturado) | Sonnet 5 | S4.1 | 📋 |
| S4.3 | Financeiro no front (saldo/limite/comprovante) | Sonnet 5 | S1.4 | 📋 |
| S4.4 | Vitrine Infinita: ajustes endless aisle | Sonnet 5 | S4.2 | 📋 |

## 📨 Template de kickoff (usado pela coordenadora)

> Contexto: plataforma B2B da Feet Colombia (Medusa v2), repo `Sants-M13/Medusa`, base `staging`. Estrela-guia do roadmap: aposentar planilhas e fluxos do Asana — a plataforma é a fonte da verdade; Oasis (e Odoo em 2027) fica só como emissor fiscal.
> Missão: <escopo fechado da entrega>.
> Branch: `claude/<slug>` a partir de `staging`. Entregável: <doc-only | código+testes>, PR pequena para `staging` (merge é do Bruno).
> Contratos: respeitar `docs/specs/pedidos/ESTADOS_E_EVENTOS.md` (quando existir).
> Reporte: memória `wip-<id>` + resumo de 5 linhas para `session_01N2HTXDVaGku5z29N3sSJAJ`.

## 🔄 Log de coordenação
- **10/08** — Quadro criado; leva 1 lançada: S0.1 (Opus), S0.2 (Sonnet), S0.4 (Haiku). Aguardando de Bruno: exemplo de radicado (S0.5), merge PR #1228 (S4.1), dados de venda (S0.3), capacidade de trilhas.
- **10/08 (13)** — Check-in: **#1233 mergeada** (MR-3, arquivada) — spec do registro de fatura viva em staging. **S2.1 entregou a primeira PR de CÓDIGO do roadmap: #1234** (fundação de estoque, 1.405 testes verdes, doc com roteiro de validação) → aguardando autorização do Bruno; após merge + build verde, disparar o primeiro "pode testar em staging". S1.0 (spec carteira) e S1.1 (wallet core) rodando. Asana segue oscilando — extração e S0.3 re-agendadas para o próximo check-in (23:01 UTC), com fallback: S0.3 via dados do Medusa.
- **10/08 (12)** — Bruno perguntou pela spec da Carteira → gap identificado: o desenho estava distribuído (roadmap + eventos #1231 + registro de fatura #1233) sem documento único. **S1.0 lançada (Opus)**: spec consolidada `docs/specs/CARTEIRA.md` para revisão do Bruno, alinhando-se ao código em andamento da S1.1 (`claude/wallet-core`) e sinalizando divergências. Inclui cutover da planilha, APIs para os fronts, permissões e até 8 perguntas de negócio.
- **10/08 (11)** — Bruno autorizou **#1233** → **MR-3 despachada** para o merge. **Higiene do painel**: arquivadas as 7 sessões finalizadas (S0.1, S0.2, S0.4, S0.5b, S4.1, MR-1, MR-2) — política daqui em diante: a coordenadora arquiva cada sessão ao confirmar a entrega. Painel ativo agora: S1.1 (wallet), S2.1 (estoque), MR-3 (merge #1233) + coordenadora.
- **10/08 (10)** — **Fase 0 ciclo 1: 100% mergeada** (MR-2 concluiu #1230 e #1231 em ~2 min, resolvendo conflito trivial de MEMORY.md; MR-1 já havia mergeado #1229 e #1232). **S0.5b entregou**: spec de 311 linhas, **PR #1233 aguardando autorização do Bruno**. Esclarecido: sessões "paradas" no painel = concluídas (trabalham em rajadas e encerram o turno). **Ciclo 2 lançado nas 2 trilhas**: S1.1 módulo `wallet` (Sonnet, trilha financeira) + S2.1 fundação de estoque (Sonnet, trilha operacional) — primeiras sessões de CÓDIGO do roadmap. Pendente da coordenadora: extração Asana (vendas B2B 2026 + 84 tarefas de requisitos de fulfillment) → destrava S0.3 e S2.3.
- **10/08 (9)** — Pergunta do Bruno ("sessões paradas?") respondida com diagnóstico: sessões IDLE após entregar = **normal** (S0.1/S0.2/S0.4/S4.1 concluídas). Dois casos reais corrigidos: **(a) S0.5 parou após declarar o plano** (quirk de skill interativa) → arquivada e relançada como **S0.5b** com instrução de execução contínua; **(b) MR-1 mergeou 2/4 PRs** e barrou 2 por conterem arquivos de memória de sessão fora de `docs/` (convenção legítima do repo) → **MR-2 despachada** com guarda ajustada (docs/ + caminhos de memória; código continua vetado).
- **10/08 (8)** — Compromisso de coordenação: **avisar o Bruno (com push) assim que houver algo testável em `staging`** — critério: primeira PR de CÓDIGO mergeada + build de staging verde, acompanhada de mini-roteiro de teste. Primeiros candidatos: fila "Pedidos a Faturar" com evento mockado (S3.1) e estado de conta da carteira (S1.1+S1.2). Specs doc-only não contam como testável.
- **10/08 (7)** — Bruno **autorizou as 4 PRs** do ciclo 1 → **MR-1 despachada** (merge-runner Haiku: #1229, #1230, #1232 + PR da branch `claude/spec-estados-eventos-pedido`, com guarda doc-only obrigatória). **ERP confirmado: Odoo** — projeto "Migración SAP Business One" no Asana é antigo, desconsiderar. Bruno enviou o link do projeto **Pedidos/Vendas B2B 2026** no Asana (workspace `1209119687274857`, projeto `1212717513880483`) → fonte oficial para a extração de vendas (S0.6/coordenadora) e para a S0.3; conector Asana oscilando no momento — extração agendada para o check-in.
- **10/08 (6)** — **Primeiro ciclo da Fase 0 fechado**: S0.1 (spec estados/eventos, com gate configurável `FACTURA_ANTES_DESPACHO`), S0.2 (auditoria, PR #1230), S0.4 (inventário, PR #1229) e S4.1 (#1228 **mergeada** ✅ + roteiro na PR #1232) prontas — **4 PRs aguardando autorização do Bruno**. S0.5 em execução. S0.6 arquivada (bloqueio ASANA_PAT) e extração reatribuída à coordenadora via conector Asana habilitado no chat. **Recon do Asana**: fulfillment já tem 5 projetos de requisitos com 84 tarefas abertas (Validação/Picking/Packing/Filtros/Guia → insumo direto p/ S2.3); projetos de Cadastro/Tipos de Curva; Traslados/Transferências; "Cuentas por pagar" com 2.9k+ tarefas; ⚠️ projeto ativo "Migración ERP – SAP Business One" (8/19 concluídas) — confirmar com Bruno se o destino ERP é Odoo ou SAP B1.
- **10/08 (5)** — Fatura de exemplo **FEET59785** recebida (upload no chat; a resposta no Slack ficou inacessível por queda do conector — retentativa cancelada). Estrutura extraída e confirmações: emissor **OasisCom S.A.S.**; nº padrão `FEET`+5 dígitos na faixa DIAN FEET-45001→60700 (Resolución 18764091509735, 04/2025–04/2027); **CUFE** 96 hex; vínculo pedido↔fatura via **OP/Orden de compra**; condição de crédito + vencimento na fatura (alimenta aging da Carteira); linhas com **curva de tallas + cajas + pares** estruturados (insumo para S0.3). → **S0.5 lançada** (Haiku). Novo protocolo de merge registrado: Bruno autoriza, coordenação executa (merge-runner no repo do produto).
- **10/08 (4)** — Bruno confirmou: **o sistema já tem integração com o Asana** → lançada S0.6 (Sonnet) para localizar a integração no repo e extrair as vendas históricas pela mesma via, somente leitura, entregando CSV + resumo em `docs/specs/dados/`. Alimenta a S0.3 (caixa × pares). Se o token não estiver no ambiente da sessão, ela reporta a variável exata que falta.
- **10/08 (3)** — Slack conectado. Pedido do radicado + exemplos de fatura do Oasis postado no canal **#ia** ([mensagem](https://feet-colombia-espacio.slack.com/archives/C0BQ3PBSV6C/p1786389399555169)); quando a resposta chegar, a coordenadora lança a S0.5. Canal #ia passa a ser a via padrão de pedidos de informação ao time.
- **10/08 (2)** — Respostas do Bruno processadas: **(1) Radicado** solicitado por ele; pedidos de informação passarão a rodar pelo Slack (grupo IA) — conectores Slack e Asana ainda não instalados no org, sugestão de instalação enviada; até conectar, a coordenadora não alcança o Slack. **(2) Merge #1228** autorizado → delegado à S4.1 (a coordenadora é limitada ao owner brunosilvamedeiros; a S4.1 nasce no repo do produto e mergeia como primeiro passo). **(3) Vendas históricas** podem estar no Asana — verificação pendente do conector; vendas B2B atuais entram 100% pelo Medusa, então a S0.3 rodará com dados do Medusa assim que a S0.2 entregar, e o histórico do Asana entra como validação. **(4) Capacidade**: decisão da coordenadora — **2 trilhas paralelas com limite de WIP de ~3 PRs abertas** aguardando merge (o gargalo real é a revisão do Bruno, não as sessões). S4.1 lançada (Haiku).
