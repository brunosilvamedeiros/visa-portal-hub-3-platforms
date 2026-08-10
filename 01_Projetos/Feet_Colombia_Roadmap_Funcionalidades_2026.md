---
id: proj-feet-01
cliente: Feet Colombia
titulo: Roadmap de Funcionalidades 2026 — Plataforma B2B (Medusa v2)
status: Em Planejamento
fase: Plano em Ondas (v2.2 — 10/08/2026)
gerente: Bruno
data_inicio: 2026-08-07
proximo_marco: Fase 0 enxuta — Contratos e Modelagem (ago S3)
produtos: [Carteira B2B, Logistica/Fulfillment, Contabil, Comercial/Front REP, Catalogo B2B caja, Catalogo B2B pares, Vitrine Infinita B2B]
tags: [feet-colombia, roadmap, medusa-v2, b2b, fulfillment, carteira, contabil, front-rep, devolucoes, radicado]
---

# Feet Colombia — Roadmap de Funcionalidades até o fim de 2026

> **v2 (10/08/2026)** — atualizado após alinhamento: ordem de largada definida (Carteira → Logística → Contábil → Comercial/REP), Contábil simplificado (fatura gerada em **sistema terceiro**; nosso sistema só notifica, recebe o **documento + nº de radicado** e libera o envio) e Comercial passa a ser as melhorias de funcionalidades/UI para os REPs com base no **estudo já realizado**.
>
> **v2.1 (10/08/2026)** — estudo do redesenho do painel do REP **publicado** (PR #1228 no repo do produto, doc-only em base `staging`: `docs/specs/estudo-mercado-b2b/REDESENHO_PAINEL_REP.md` + [protótipo hi-fi](https://claude.ai/code/artifact/a0a19e13-e41d-4612-a7d8-16bf86a74170)) → **Onda 4 desbloqueada**. Achado crítico incorporado: **a cobrança/mora não vive no Medusa — mora no Oasis** e chega via texto livre (Asana).
>
> **v2.2 (10/08/2026)** — reorientação da estrela-guia: **aposentar as planilhas de controle e os fluxos do Asana**. O ledger da Onda 1 nasce como **fonte da verdade da cobrança** (sem sincronização contínua com o Oasis — carga inicial única + convivência curta) e cada marco passa a carregar as aposentadorias correspondentes como critério de pronto.

## 📋 Resumo Executivo

O plano se organiza em **4 ondas com ordem de largada definida** — Carteira primeiro, depois Logística, depois Contábil, depois Comercial/Front REP — mas desenhadas como **frentes independentes que se sobrepõem no tempo** com o mínimo de conflito: cada onda é um módulo isolado, e onde uma depende da outra existe um **contrato** (evento ou API) fechado na Fase 0.

**⭐ Estrela-guia: aposentar as planilhas de controle e os fluxos do Asana.** A plataforma é a fonte da verdade operacional; sistemas terceiros ficam **apenas no papel fiscal** (emissão de fatura/nota). Nada de sincronização permanente com controles paralelos: o padrão é **cutover** — carga inicial única, janela curta de convivência (dupla checagem ≤ 2 semanas) e **aposentadoria com data**, amarrada aos marcos. Cada onda só está "pronta" quando a planilha/board que ela substitui for formalmente desligada.

Com 2 devs/squads, o plano roda em **2 trilhas paralelas naturais**:
- **Trilha Financeira**: Carteira → Contábil → Financeiro no front (compartilham o ledger — mesmo eixo).
- **Trilha Operacional**: Logística (estoque → fulfillment → movimentações → devoluções) — auto-contida no Medusa.

O Front REP (Comercial) entra como discovery imediato (revisão do estudo, sem código) e implementação a partir de outubro.

**Fontes**: mapa mental 07/08, alinhamento 10/08, [RFP Modernização 2025](https://docs.google.com/document/d/1gNFJCW9hbk6ZZuPSP1ZKzZk_CwvWG52egrO-nNUPIv0/edit), board Miro [Portal Andino](https://miro.com/app/board/uXjVH6k60vQ=/) (Medusa v2).

---

## 🗺️ Mapa do Produto → Ondas

| Domínio (Back) | Sub-itens do mapa | Onda |
|---|---|---|
| **Carteira** 🟡 | Estado de conta 🟡, Comprovantes de pago, Límite de crédito | **1** |
| **Logística** | Fulfillment, Movimentações (ingresso/saída/transferência), Cadastro 🟡, Devoluções e Garantias, Pedidos Programados | **2** |
| **Contábil** | Faturas y Nota crédito/débito — *emissão em sistema terceiro; aqui só registro (doc + radicado) e gate* | **3** |
| **Comercial** | Melhorias de funcionalidades e UI para os REPs (estudo já realizado) | **4** |

| Plataforma (Front) | Papel | Onda |
|---|---|---|
| **Catálogo B2B caja** 🟡 | Venda por caixa fechada (grade de tallas) — canal principal do REP | 4 |
| **Catálogo B2B pares** | Venda por pares avulsos | 4 |
| **Vitrine Infinita B2B** | Endless aisle / mostruário digital no lojista | 4 |

🟡 = destacado em amarelo no mapa (lido como prioridade — validar).

---

## 🧱 Fase 0 enxuta — Contratos e Modelagem (1 semana, ago S3)

Mesmo com ondas sequenciadas, os contratos vêm antes de qualquer código para que as sobreposições não gerem conflito:

1. **Máquina de estados do pedido** (dono único):
   `Novo → Aprovado (limite OK) → Em Separação → Separado → Aguardando Fatura → Faturado → Expedido → Entregue` + ramificações `Devolução/Garantia` e `Cancelado`.
2. **Eventos de domínio** (payloads versionados): `pedido.aprovado`, `pedido.separado`, `fatura.registrada`, `pedido.expedido`, `pedido.entregue`, `devolucao.solicitada/aprovada/recebida`, `nota_credito.registrada`, `comprovante.enviado/conciliado`, `limite.excedido`.
3. **Modelagem caixa vs pares** (estruturante p/ estoque, catálogo e fronts — RFP já previa "pares na caixa fechada").
4. **Auditoria do Medusa v2 em produção** (módulos ativos, customizações, dados).
5. **Definições do fluxo contábil**: qual sistema terceiro emite a fatura, formato do documento (PDF/XML), campo **nº de radicado** e regras de validação.
6. **Plano de aposentadoria dos controles paralelos**: inventariar **todas** as planilhas e fluxos de Asana operacionais (dono → onda que substitui → marco de desligamento). Para a cobrança/mora (hoje Oasis + texto livre no Asana): o **ledger da Onda 1 assume como fonte da verdade** — carga inicial única dos saldos em aberto, convivência de dupla checagem ≤ 2 semanas, planilha arquivada e fluxo do Asana encerrado. O Oasis permanece **apenas como emissor fiscal** *(confirmar se ele é o "sistema terceiro" da Onda 3 — se sim, o doc + radicado já é o único ponto de contato necessário)*.

---

## 🌊 Onda 1 — Carteira *(largada imediata · módulo custom `wallet` · ~4–6 semanas)*

| Etapa | Entrega |
|---|---|
| 1.1 | **Estado de conta**: ledger por cliente (débito = fatura registrada; crédito = pagamento conciliado / nota crédito), saldo corrente, aging de vencidos, extrato exportável |
| 1.2 | **Comprovantes de pago**: upload pelo lojista/REP, fila de conciliação, aprovação/rejeição auditável, baixa no ledger |
| 1.3 | **Límite de crédito**: limite por cliente, exposição (saldo aberto + pedidos em curso), gate no checkout (bloqueio ou aprovação manual), alertas |

*O ledger nasce **fonte da verdade da cobrança** — é ele quem aposenta a planilha de saldos e o texto livre do Asana. Cutover: carga inicial única dos saldos em aberto na entrada em produção; daí em diante os lançamentos vivem **só na plataforma** (registro dentro do sistema até a Onda 3; automático via `fatura.registrada` a partir do M2). Sem sincronização contínua com o Oasis; convivência de dupla checagem ≤ 2 semanas e planilha arquivada.*

## 🌊 Onda 2 — Logística *(largada ~2 semanas após Onda 1 · nativo Medusa + `fulfillment-ops` · ~8–10 semanas)*

| Etapa | Entrega |
|---|---|
| 2.1 | **Fundação**: stock locations, níveis, reservas nativas + **Cadastro** 🟡 (produtos, variantes, grades, pares/caixa) |
| 2.2 | **Módulo de Fulfillment**: fila de pedidos, verificar → preparar → pick → pack, listas de separação por operador, estado **"Separado"** → emite `pedido.separado`; **gate de expedição** (só expede com fatura registrada) |
| 2.3 | **Movimentações**: entradas, saídas, documento de transferência entre estoques/estantes, inventário físico |
| 2.4 | **Devoluções & Garantias**: Returns/Claims nativos + política de garantia, aprovação, logística reversa, restock/quarentena → emite `devolucao.aprovada` |
| 2.5 | Pedidos Programados *(fase 2 — só se houver folga em dezembro)* |

**Cobertura Medusa v2 nativa** (por isso a Onda 2 cabe no ano): multi-bodega (Stock Location + Inventory), reservas automáticas, ajustes/inventário, fulfillment packed/shipped/delivered, Returns + Claims + Exchanges com restock, Sales Channels (3 fronts), Customer Groups + Price Lists. **Construção**: UI operacional de pick/pack (Admin UI Extensions), documento de transferência, política de garantia.

## 🌊 Onda 3 — Contábil *(enxuta · módulo custom `invoicing` · ~2–3 semanas de build)*

Fluxo fechado no alinhamento de 10/08 — **sem integração com provedor de faturação nesta fase**:

```
Pedido SEPARADO no fulfillment
   └─ evento pedido.separado
        └─ notificação à área contábil + fila "Separados — pendentes de fatura"
             └─ contábil gera a fatura NO SISTEMA TERCEIRO (fora da plataforma)
                  └─ registra na plataforma: upload do documento + nº de radicado
                       └─ evento fatura.registrada
                            ├─ LIBERA a expedição (gate)
                            └─ débito no estado de conta (Carteira)
Devolução aprovada → nota crédito no sistema terceiro → upload + radicado → crédito no ledger
```

| Etapa | Entrega |
|---|---|
| 3.1 | Notificações + fila "Separados — pendentes de fatura" (consome `pedido.separado`; **pode nascer com evento mockado antes da 2.2**) |
| 3.2 | Registro da fatura: upload do documento + **nº de radicado** (track), validações, vínculo ao pedido → emite `fatura.registrada` |
| 3.3 | Liberação do envio (gate na expedição — implementado junto com 2.2 pelo contrato) |
| 3.4 | Notas crédito/débito de devoluções: upload + radicado vinculado à devolução → crédito no ledger |

*Integração direta com o sistema terceiro (emissão automática) fica como evolução futura — o contrato `fatura.registrada` não muda.*

*Aposentadorias desta onda: a **3.1** mata o aviso manual de "pode faturar" (Asana/WhatsApp); a **3.2** mata a planilha de controle fatura ↔ pedido — o vínculo passa a viver no próprio pedido, com documento + radicado.*

> [!NOTE]
> **Confirmado 10/08**: o sistema terceiro é o **Oasis** — faturas seguem manuais lá, como hoje, e sobem na plataforma para auditoria e acompanhamento. Em paralelo roda a implantação do **Odoo** (entrega prevista até dez/2026; migração Oasis → Odoo em 2027). O contrato `fatura.registrada` **não muda com a troca de emissor** — a integração direta com o Odoo (registro automático) entra futuramente como provider da 3.2, sem retrabalho no fluxo.

## 🌊 Onda 4 — Comercial / Front do REP *(discovery imediato · implementação a partir de out)*

| Etapa | Entrega |
|---|---|
| 4.1 | **Estudo publicado ✔** (PR #1228: diagnóstico, 8 telas, corte Now/Next/Later; rep modelado como "cliente com crachá" em `/account`) → resta **validar com 2–3 REPs** contra o checklist abaixo e ratificar o corte antes do build |
| 4.2 | Melhorias no catálogo **caja** 🟡 e **pares**: pedido rápido por grade, disponibilidade em tempo real, status de pedidos da carteira do REP, recompra |
| 4.3 | Financeiro no front: saldo, limite, vencidos, upload de comprovante (consome APIs da Onda 1) |
| 4.4 | Vitrine Infinita B2B: ajustes de endless aisle com estoque em tempo real |

**Checklist de verificação do estudo (4.1)**: pedido por grade em poucos toques · disponibilidade por bodega · saldo/limite do cliente *antes* de fechar pedido · status de pedidos e entregas da carteira do REP · recompra 1 toque · comprovante em nome do cliente · mobile-first com conexão instável.

> [!NOTE]
> **Estudo publicado em 10/08** — PR #1228 (doc-only, base `staging`), **aguardando merge do Bruno**; enquanto não mergear, outras sessões só encontram o doc pela branch `claude/sales-rep-dashboard-redesign-2ff66a`. Desdobramentos: issues **#589 (metas)** e **#590 (visitas)** ficaram *fora do corte* → backlog fase 2; **#593 (bug do timeline "Facturado") sugerido como P1** — tratar junto do gate da Onda 3, que introduz o estado *Faturado* no fluxo. Timing do estudo: redesenho aterrissa **pós-IFLS**, compatível com a implementação 4.2 a partir de outubro.

---

## 🔗 Contratos entre ondas (onde se tocam — e só aí)

| Produtor | Contrato | Consumidor | Estratégia |
|---|---|---|---|
| 2.2 | `pedido.separado` | 3.1 | 3.1 pode nascer com mock; troca pelo real quando 2.2 entrar |
| 3.2 | `fatura.registrada` | 2.2 (gate) + 1.1 (ledger) | gate e ledger leem o contrato, não o código |
| 2.4 | `devolucao.aprovada` | 3.4 | payload fechado na Fase 0 |
| 1.3 | API saldo/limite | 4.3 | contrato REST na Fase 0; front usa fixture |
| 2.1 | modelagem grade/caixa | 4.2 | decisão única na Fase 0 |

**Regras anticonflito**: um módulo por onda, sem import cruzado · máquina de estados com dono único · marco de integração quinzenal (mock → real) · feature flag por sales channel.

---

## 📅 Cronograma Macro (ago → dez 2026)

| Período | Trilha Financeira | Trilha Operacional | Comercial/Front | Marco |
|---|---|---|---|---|
| **Ago S3** | ——— Fase 0 enxuta: contratos, modelagem caixa/pares, auditoria, definições do fluxo contábil ——— | | | **M0** |
| **Ago S4–Set** | Onda 1: 1.1 → 1.2 → 1.3 | 2.1 fundação + cadastro (a partir de set) | 4.1 revisão do estudo | **M1** fim set: carteira demo + estoque fundado |
| **Out** | 3.1 fila (mock→real) + 3.2 registro | 2.2 fulfillment + 2.3 movimentações | 4.2 kickoff | **M2** fim out: separado → fatura (doc+radicado) → expedição ponta a ponta em homologação |
| **Nov** | 3.3 gate ativo + 3.4 notas crédito | 2.4 devoluções/garantias | 4.2 → 4.3 | **M3** piloto com clientes/REPs |
| **Dez** | ——— estabilização · treinamento · rollout (100% até ~18/12) ——— | | 4.4 vitrine | **M4** go-live geral |

**Aposentadorias por marco** (critério de pronto — a onda só fecha quando o controle paralelo desliga):

| Marco | O que se desliga |
|---|---|
| **M1** (fim set) | Carga inicial de saldos no ledger feita → começa a convivência controlada com a planilha de cobrança (dupla checagem, prazo fechado) |
| **M2** (fim out) | Aviso manual de "pode faturar" (Asana/WhatsApp) · planilha da fila de separação · planilha fatura ↔ pedido |
| **M3** (fim nov) | **Planilha de cobrança/saldos arquivada** (ledger é a única verdade) · fluxo de devoluções fora do sistema |
| **M4** (dez) | Planilhas restantes de estoque/movimentações · Asana sai da operação de pedidos (fica só para o que não é operação) |

---

## ⚠️ Riscos & Pendências

| # | Risco / Pendência | Impacto | Ação |
|---|---|---|---|
| 1 | Modelagem caixa vs pares mal definida | retrabalho em estoque + fronts | decidir na Fase 0 com dado real de venda |
| 2 | Definições do fluxo contábil: qual sistema terceiro, formato do doc, padrão do radicado | bloqueia 3.2 | fechar na Fase 0 (é definição, não integração) |
| 3 | ~~Estudo do REP não acessível~~ **Resolvido 10/08**: estudo publicado (PR #1228 + protótipo) | — | mergear a PR e agendar a validação com REPs |
| 3b | Cutover da cobrança (Oasis/planilha → ledger) mal executado | saldos errados no estado de conta | carga inicial validada item a item com o financeiro + dupla checagem ≤ 2 semanas + dono da conciliação |
| 3c | Convivência prolongada com controles paralelos (dupla digitação) | time volta para a planilha e a plataforma perde a verdade | data de aposentadoria por marco + desligamento formal (planilha arquivada, board encerrado, acesso somente-leitura) |
| 3d | Projeto Odoo rodando em paralelo no Q4 (entrega dez/2026) compete pela agenda do financeiro/contábil durante nosso piloto e rollout | atraso em M3/M4 | zero dependência do Odoo em 2026 (Oasis manual + upload); coordenar janelas de treinamento das duas iniciativas |
| 4 | Legenda do mapa (amarelo = prioridade?) | priorização | validar com o time |
| 5 | Capacidade do time (2 trilhas = 2 devs/squads) | cronograma | confirmar alocação; com 1 dev, seguir ordem 1→2→3→4 estrita |
| 6 | Gate contábil como gargalo (pedido parado esperando fatura) | SLA de entrega | SLA de faturamento + alerta de fila parada (3.1) |
| 7 | Convivência/migração com legado (se houver partes vivas) | dados | mapear na auditoria da Fase 0 |

---

## ✅ Próximos Passos Imediatos

1. Confirmar capacidade (1 ou 2 trilhas) e datas da Fase 0 (ago S3).
2. **Mergear a PR #1228** do estudo (base `staging`) e agendar a validação 4.1 com 2–3 REPs.
3. Fechar as definições do fluxo contábil (sistema terceiro, doc, radicado) — reunião de 1h resolve.
4. **Inventariar planilhas e fluxos de Asana** (com donos) e fechar o plano de cutover da cobrança (Oasis → ledger) — pauta central da Fase 0.
5. Validar leitura do mapa (amarelos = prioridade) e escopo de Pedidos Programados (fase 2?).
6. Auditoria técnica do Medusa v2 em produção.

## 📝 Histórico
- [07/08/2026 — Definição das Funcionalidades até o Fim do Ano](../02_Reunioes/2026-08-07_Definicao_Funcionalidades_Feet_Colombia.md)
- 10/08/2026 — Alinhamento: ordem de largada, contábil simplificado (doc + radicado), comercial = estudo REPs *(refletido nesta v2)*
- 10/08/2026 — Estudo do redesenho do painel do REP publicado: PR #1228, [protótipo](https://claude.ai/code/artifact/a0a19e13-e41d-4612-a7d8-16bf86a74170), issues #589/#590/#593, memórias `wip-redesenho-painel-representante` e `ar-cobranca-mora-no-oasis` *(integrado nesta v2.1)*
- 10/08/2026 — Reorientação: **aposentar planilhas e fluxos do Asana**; ledger como fonte da verdade da cobrança, cutover com carga inicial + aposentadorias por marco *(esta v2.2)*
