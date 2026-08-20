---
id: proj-feet-01-fluxos-bpmn
cliente: Feet Colombia
titulo: Fluxos-base BPMN (Bruno, 20/08/2026) × Aderência da implementação
status: Referencia Canonica
fonte: BPMNs enviados pelo Bruno no chat da coordenação (6ª geração) em 20/08/2026
analise: coordenação 6ª geração (session_01MAP1kDiPH67vQhnsCo7xYz), 20/08/2026 ~12:00 Colômbia
tags: [feet-colombia, bpmn, fulfillment, devolucoes, aderencia, gaps]
---

# Fluxos-base (BPMN) × Aderência da implementação — 20/08/2026

> **Estes BPMNs do Bruno são a referência canônica dos processos.** Toda evolução do fulfillment e das devoluções deve convergir para eles. Análise feita contra o estado de staging em 20/08 (pós-merges #1344–#1356).

## 1. Processo de Fulfillment

**Fluxo canônico (macro)**: Pedido realizado → Carteira verifica → [Aprovado?] → não: Arquiva o pedido · sim: Reserva produtos → Fullfil.

**Fluxo canônico (detalhe)**: Pedido na fila de fullfil → Verifica pedido → Separa pedido → Separa produtos → [Todos produtos encontrados?] → não: Registra produtos não encontrados + motivo → Atualiza valor do pedido → Empacota → Envia p/ fila de faturamento → *(lane Faturamento: Recebe pedido → Realiza faturamento no ERP → Sobe documentos + dados → Finaliza)* → Recebe faturamento → Gera guias → Envia → (Recebe confirmação de recebimento do cliente) → Registra recebimento → fim.

### Matriz de aderência

| Passo canônico | Estado | Implementação |
|---|---|---|
| Carteira verifica / Aprovado? | ✅ | "Aprobación de cartera" + gate de límite (#1281/#1348); validado pelo Bruno (pedido #136) |
| Não aprovado → arquiva | ⚠️ | Vira estado **Rechazado** (histórico); sem "arquivamento" formal — equivalente funcional |
| Reserva produtos | ✅ | Reserva de estoque na criação ("Tu pedido es tu reserva") |
| Fila → Verifica → Separa → Empacota | ✅ | Abas Fila / Verificación / Picking / Empaque (filtros pós-#1354) |
| **Separação parcial** (não encontrados + motivo + atualiza valor) | ❌ **GAP F1** | Não existe — fluxo atual assume separação completa |
| Envia p/ fila de faturamento | ✅ | `pedido.separado` → fila "Separados — pendentes de fatura" |
| Faturamento no ERP + sobe documentos | ✅ | Emissão no Oasis + registro na plataforma (upload doc + radicado) |
| Recebe faturamento (libera) | ✅ | Gate `FACTURA_ANTES_DESPACHO` fail-closed |
| Gera guias → Envia | ✅ | Aba Guía + registrar despacho (#1350: marca fulfillment existente como enviado) |
| **Confirmação de recebimento do CLIENTE** | ❌ **GAP F2** | Entrega marcada internamente; não há evento/confirmação ativa do cliente |

## 2. Processo de Devolução

**Fluxo canônico** (lanes Cliente/REP · Admin · Logística · Faturamento): Cliente/REP solicita e informa dados → Admin recebe → [Aprova?] → não: informa motivo → envia motivo ao cliente → cancela · sim: cliente recebe aviso de aprovação → envia produto → Logística recebe → avalia → faz recepção → indica o estoque do produto → Faturamento gera créditos → informa créditos gerados e como utilizar → cliente recebe créditos → fim.

### Matriz de aderência

| Passo canônico | Estado | Implementação |
|---|---|---|
| **Solicitação pelo cliente/REP** | ❌ **GAP D1 (estrutural)** | Devolução nasce no ADMIN (Logística → Crear devolución, #1356); solicitação pelo cliente/REP no storefront = escopo Onda 4 (4.2/4.3) |
| Admin aprova / rejeita | ✅ | Fila "por aprobar" + aprovação com garantia/motivo; cancelamento (#1347) |
| **Notificação ao cliente** (aprovação · motivo de rejeição) | ❌ **GAP D2** | Nenhuma notificação implementada |
| Logística recebe → avalia → recepção → indica estoque | ✅* | Recepção com OK×dañado; *em build (S-DEVOL-DEF): tipo caixa×par declarado na criação → default no recebimento → roteamento automático (decisão de produto 20/08, adendo ADR-001/S2.10) |
| Faturamento gera créditos | ✅ | Nota de crédito (Oasis) registrada + crédito no estado de cuenta (#1351) |
| **Informa créditos gerados e como utilizar** | ❌ **GAP D3** | Notificação do crédito ao cliente não existe |
| Cliente recebe créditos | ✅ | Visível no estado de conta (front do cliente = Onda 4.3) |

## 3. Gaps consolidados e priorização (decisão do Bruno pendente)

| # | Gap | Porte | Sugestão da coordenação |
|---|---|---|---|
| D2+D3 | Notificações da devolução (aprovação, motivo, crédito) | **Pequeno** (eventos `devolucao.aprobada`/`nota_credito.registrada` já existem; falta template+disparo) | Despachar já |
| F1 | Separação parcial (faltantes + motivo + atualiza valor) | Médio | Próxima build pós-E2E |
| F2 | Confirmação de recebimento pelo cliente | Médio (canal a definir: WhatsApp/portal) | Onda 4 |
| D1 | Solicitação de devolução pelo cliente/REP no front | Grande | Onda 4 (4.2/4.3) |

**Decisão de produto registrada em 20/08 (adendo ADR-001/S2.10)**: na criação da devolução, cada item declara o tipo — **caja completa × par suelto** (com quantidade); o tipo viaja ao recebimento como default editável; com tipo confirmado + estado (OK × dañado), o destino de estoque é automático (caja OK → stock de cajas · par OK → "Stock de pares sueltos" · dañado → descarte × quarentena), auditado por item.
