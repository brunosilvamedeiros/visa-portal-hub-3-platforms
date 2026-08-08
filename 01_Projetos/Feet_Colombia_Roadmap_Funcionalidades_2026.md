---
id: proj-feet-01
cliente: Feet Colombia
titulo: Roadmap de Funcionalidades 2026 — Plataforma B2B (Medusa v2)
status: Em Planejamento
fase: Levantamento & Organizacao de Frentes
gerente: Bruno
data_inicio: 2026-08-07
proximo_marco: Fase 0 — Fundacoes e Contratos (ago/2026)
produtos: [Carteira B2B, Logistica/Fulfillment, Contabil, Catalogo B2B caja, Catalogo B2B pares, Vitrine Infinita B2B]
tags: [feet-colombia, roadmap, medusa-v2, b2b, fulfillment, carteira, contabil, front-rep, devolucoes]
---

# Feet Colombia — Roadmap de Funcionalidades até o fim de 2026

## 📋 Resumo Executivo

Levantamento das funcionalidades definidas em **07/08/2026** para entrar no produto até o final do ano, organizadas em **1 fase de fundação + 4 frentes de trabalho paralelas** (Carteira, Logística/Fulfillment, Contábil, Front do Representante). O princípio central: **aproveitar ao máximo os módulos nativos do Medusa v2** (estoque, reservas, fulfillment, devoluções/claims, sales channels) e construir custom apenas o que é específico do negócio (carteira de crédito B2B, gate contábil de faturamento, UI operacional de separação, facturación electrónica).

O paralelismo com mínimo conflito é garantido por uma regra: **as frentes não compartilham código — compartilham contratos** (máquina de estados do pedido + eventos de domínio), definidos na Fase 0.

**Fontes**: mapa mental de 07/08/2026 (Back: Carteira, Logística, Contábil, Comercial | Front: Catálogo B2B caja, Catálogo B2B pares, Vitrine Infinita B2B), [RFP Modernização 2025](https://docs.google.com/document/d/1gNFJCW9hbk6ZZuPSP1ZKzZk_CwvWG52egrO-nNUPIv0/edit), board Miro [Feet Colombia — Storefront (Portal Andino)](https://miro.com/app/board/uXjVH6k60vQ=/) (protótipos hi-fi do storefront B2B, Medusa v2).

---

## 🗺️ Mapa do Produto → Domínios

| Domínio (Back) | Sub-itens do mapa | Frente |
|---|---|---|
| **Carteira** 🟡 | Estado de conta 🟡, Comprovantes de pago, Límite de crédito | WS-A |
| **Logística** | Pedidos Programados, Fulfillment, Movimentações (ingresso/saída/transferência), Cadastro 🟡, Devoluções e Garantias | WS-B |
| **Contábil** | Faturas y Nota crédito/débito | WS-C |
| **Comercial** | *(sem detalhamento no mapa — confirmar se entra em 2026)* | — |

| Plataforma (Front) | Papel | Frente |
|---|---|---|
| **Catálogo B2B caja** 🟡 | Venda por caixa fechada (grade de tallas) — canal principal do representante | WS-D |
| **Catálogo B2B pares** | Venda por pares avulsos | WS-D |
| **Vitrine Infinita B2B** | Endless aisle / mostruário digital no lojista | WS-D |

> [!NOTE]
> 🟡 = nós destacados em amarelo no mapa. **Assumido como prioridade desta rodada** — validar essa leitura e a legenda dos badges numéricos (4c, 3h, 2s…) com o time.

---

## 🔍 Levantamento por Demanda

### 1. Carteira — melhorar a funcionalidade existente
A carteira B2B (crédito do lojista junto à distribuidora) precisa evoluir de registro passivo para ferramenta de gestão:
- **Estado de conta**: ledger por cliente — débitos (faturas) e créditos (pagamentos conciliados, notas crédito) — com saldo corrente, aging de vencidos e extrato exportável.
- **Comprovantes de pago**: upload pelo lojista/representante no front, fila de conciliação com aprovação/rejeição auditável e baixa automática no ledger.
- **Límite de crédito**: limite por cliente, exposição calculada (saldo em aberto + pedidos em andamento) e **gate no checkout** — pedido acima do limite é bloqueado ou vai para aprovação manual do comercial.

*Nada disso é nativo do Medusa → módulo custom `wallet`, isolado, integrado por eventos.*

### 2. Logística — máximo aproveitamento do Medusa + módulo de Fulfillment + Devoluções/Garantias
O que o **Medusa v2 já entrega nativo** (objetivo: reduzir desenvolvimento):

| Necessidade do mapa | Cobertura nativa Medusa v2 |
|---|---|
| Estoque multi-localização (bodegas, lojas) | ✅ Stock Location + Inventory Module (níveis por localização) |
| Reserva de estoque ao confirmar pedido | ✅ Reservations automáticas |
| Ingressos / saídas / ajustes | ✅ Inventory adjustments + inventário físico |
| Transferências entre estoques | 🟨 Parcial — ajustes existem; o "documento de transferência" (rastreável, com conferência) é entidade leve custom por cima |
| Fulfillment (packed / shipped / delivered) | ✅ Fulfillment Module + shipping options |
| Devoluções | ✅ Returns nativos (motivos, recebimento, restock) |
| Garantias / avarias | ✅ Claims nativos (reembolso ou reposição) + Exchanges |
| Trocas | ✅ Exchanges |
| Um backend, 3 fronts | ✅ Sales Channels (caja / pares / vitrine com disponibilidade por canal) |
| Preço B2B por segmento | ✅ Customer Groups + Price Lists |
| Pedidos programados | ❌ Custom (Scheduled Jobs + draft orders) — candidato a fase 2 |
| **UI operacional de separação (pick/pack por operador)** | ❌ **Este é "o módulo de fulfillment" a construir** — Admin UI Extensions sobre as APIs nativas |

**Fluxo de fulfillment alvo** (já esboçado no RFP: Verificar → Preparar → Pick → Pack → Envio):
fila de pedidos aprovados → verificação → lista de separação por operador (pick) → conferência/empaque (pack) → **estado "Separado"** → *(gate contábil)* → expedição → entrega.

**Devoluções/Garantias**: fluxo sobre Returns/Claims nativos + camada de negócio: política de garantia (prazos por produto/marca), motivos padronizados, aprovação, logística reversa, restock condicional (produto apto volta ao estoque; avariado vai a estoque de quarentena) e disparo de nota crédito.

### 3. Contábil — fluxo simples, orientado a eventos
O fluxo pedido pelo time, traduzido em arquitetura:

```
Pedido SEPARADO (fulfillment conclui pick/pack)
   └─ evento pedido.separado
        └─ notifica área contábil + entra na fila "Pedidos a Faturar"
             └─ contábil emite/registra a fatura (nº, valor, PDF / facturación electrónica DIAN)
                  └─ evento fatura.emitida
                       ├─ LIBERA a expedição (gate: sem fatura não expede)
                       └─ lança débito no estado de conta da Carteira
Devolução/garantia aprovada → nota crédito/débito → crédito no estado de conta
```

O gate é a única regra que toca a máquina de estados do pedido — por isso ela é definida na Fase 0 e tem dono único. Integração com provedor de facturación electrónica (DIAN — Siigo, Alegra, World Office…) é decisão da Fase 0; o fluxo funciona desde o dia 1 com registro manual da fatura (nº + PDF) e a integração entra depois sem mudar o contrato.

### 4. Front do Representante — verificar o estudo
O estudo (protótipos hi-fi no board Miro "Portal Andino") precisa ser validado contra o que o representante realmente faz em campo. Checklist de avaliação proposto:

- [ ] **Pedido rápido por grade**: montar caixa fechada (curva de tallas) em poucos toques; pedido por pares sem fricção.
- [ ] **Disponibilidade em tempo real** por bodega/canal (evita vender o que não tem).
- [ ] **Visão financeira do cliente na palma da mão**: saldo, limite disponível, vencidos — *antes* de fechar o pedido (integra com WS-A).
- [ ] **Status de pedidos e entregas** da carteira de clientes do rep (RFP: "Representantes: acesso a clientes e pedidos da sua carteira").
- [ ] **Recompra** (repetir último pedido / sugestão de reposição).
- [ ] **Upload de comprovante de pagamento** em nome do cliente.
- [ ] Uso em campo: mobile-first, conexão instável, velocidade.

**Método de verificação**: walkthrough dos protótipos com 2–3 representantes reais (tarefas cronometradas), comparação com o checklist, e métricas de sucesso definidas antes do build (tempo para montar pedido de N caixas, pedidos por visita, taxa de erro de grade).

> [!WARNING]
> O board Miro retornou vazio via API — anexar/exportar o material do estudo para esta KB (ou verificar permissões do board) para a avaliação detalhada.

---

## 🧱 Fase 0 — Fundações e Contratos (pré-requisito de TODAS as frentes)

**Duração alvo: 2 semanas (ago S2–S3). Participam todas as frentes.**

1. **Máquina de estados do pedido ponta a ponta** (contrato central, dono único):
   `Novo → Aprovado (crédito OK) → Em Separação → Separado → Faturado → Expedido → Entregue` + ramificações de `Devolução/Garantia` e `Cancelamento`.
2. **Catálogo de eventos de domínio** (nomes + payloads versionados): `pedido.aprovado`, `pedido.separado`, `fatura.emitida`, `pedido.expedido`, `pedido.entregue`, `devolucao.solicitada/aprovada/recebida`, `nota_credito.emitida`, `comprovante.enviado/conciliado`, `limite.excedido`.
3. **Auditoria do Medusa v2 em produção**: módulos ativos, customizações existentes, qualidade dos dados de estoque/clientes.
4. **Modelagem caixa vs pares** (decisão estruturante — afeta catálogo, estoque e os 3 fronts): caixa fechada como SKU próprio, bundle de variantes ou unidade de venda com fator de conversão. O RFP já previa o atributo "Pares na caixa fechada".
5. **Decisões de arquitetura**: 1 módulo custom por domínio (`wallet`, `invoicing`, `fulfillment-ops`, `returns-policy`) sem imports cruzados; telas operacionais como Admin UI Extensions vs. app dedicado; provedor de facturación electrónica DIAN.

---

## 🔀 Frentes Paralelas (WS-A a WS-D)

### WS-A — Carteira *(módulo custom `wallet`)*
| Etapa | Entrega | Depende de |
|---|---|---|
| A1 | Ledger + Estado de conta (saldo, aging, extrato) | Fase 0 |
| A2 | Comprovantes de pago: upload → conciliação → baixa | A1 |
| A3 | Límite de crédito + gate no checkout + alertas | A1 |
| A4 | Consumo de `fatura.emitida` / `nota_credito.emitida` (reais) + API de saldo/limite para os fronts | C2, C3 *(mock até lá)* |

### WS-B — Logística & Fulfillment *(nativo Medusa + `fulfillment-ops`)*
| Etapa | Entrega | Depende de |
|---|---|---|
| B1 | Fundação: stock locations, níveis, reservas nativas + **Cadastro** 🟡 (produtos, variantes, grades, pares/caixa) | Fase 0 (item 4) |
| B2 | **Módulo de Fulfillment operacional**: fila, verificar → preparar → pick → pack, listas de separação por operador, estado "Separado", emite `pedido.separado`, gate de expedição | B1 |
| B3 | Movimentações: entradas, saídas, documento de transferência entre estoques/estantes, inventário físico | B1 |
| B4 | Devoluções & Garantias: Returns/Claims nativos + política, aprovação, reversa, restock/quarentena; emite `devolucao.aprovada` | B2 |
| B5 | Pedidos Programados *(fase 2 — só se houver folga)* | B2 |

### WS-C — Contábil *(módulo custom `invoicing`)*
| Etapa | Entrega | Depende de |
|---|---|---|
| C1 | Fila "Pedidos a Faturar" + notificações (consome `pedido.separado` — **começa com evento mockado**) | Fase 0 |
| C2 | Registro/emissão de fatura + `fatura.emitida` + liberação da expedição; integração DIAN (sandbox → produção) | C1 |
| C3 | Notas crédito/débito a partir de devoluções (consome `devolucao.aprovada`) | C2, B4 |

### WS-D — Front do Representante *(3 plataformas / sales channels)*
| Etapa | Entrega | Depende de |
|---|---|---|
| D1 | Verificação do estudo (walkthrough com reps + checklist + métricas) → backlog priorizado do front | estudo anexado |
| D2 | Catálogo B2B **caja** 🟡 (matriz de grade) e **pares** conforme modelagem da Fase 0 | D1, B1 |
| D3 | Módulo financeiro no front: saldo, limite, comprovantes (consome APIs WS-A) | A3 |
| D4 | Vitrine Infinita B2B (endless aisle no lojista, estoque em tempo real) | D2 |

---

## 🔗 Matriz de Integração (onde as frentes se tocam — e só aí)

| Produtor | Contrato | Consumidor | Estratégia de paralelismo |
|---|---|---|---|
| B2 | `pedido.separado` | C1 | C1 desenvolve com evento mockado desde o dia 1 |
| C2 | `fatura.emitida` | B2 (gate expedição) | Gate implementado no WS-B lendo o contrato, não o código do WS-C |
| B4 | `devolucao.aprovada` | C3 | Payload fechado na Fase 0 |
| C2 / C3 | fatura / nota crédito | A4 (ledger) | A1–A3 rodam com lançamentos manuais até A4 |
| A3 | API saldo/limite | D3 | Contrato REST definido na Fase 0; front usa fixture até A3 |
| B1 | modelagem grade/caixa | D2 | Decisão única na Fase 0 — evita retrabalho nos 3 fronts |

**Regras anticonflito**: (1) um módulo/pacote por frente, sem import cruzado — comunicação só por eventos/APIs; (2) mudanças na máquina de estados do pedido passam por um único dono (tech lead do WS-B); (3) marcos de integração quinzenais com os eventos reais substituindo mocks; (4) feature flags por sales channel para rollout gradual.

---

## 📅 Cronograma Macro (ago → dez 2026)

| Período | WS-A Carteira | WS-B Logística | WS-C Contábil | WS-D Front Rep | Marco |
|---|---|---|---|---|---|
| **Ago** S2–S3 | ————— Fase 0: contratos, auditoria, modelagem caixa/pares, decisão DIAN ————— | | | | **M0** contratos assinados |
| **Ago S4–Set** | A1 ledger | B1 fundação + cadastro | C1 fila (mock) | D1 verificação do estudo | **M1** fim set: A1+B1+C1 demo |
| **Out** | A2 comprovantes, A3 limite | B2 fulfillment ops, B3 movimentações | C2 fatura + DIAN sandbox | D2 catálogo caja/pares | **M2** fim out: separação→fatura→expedição ponta a ponta em homologação |
| **Nov** | A4 integrações reais | B4 devoluções/garantias | C3 notas crédito | D3 financeiro no front | **M3** fim nov: piloto com grupo de clientes/reps |
| **Dez** | ——— estabilização, treinamento, rollout geral (meta: 100% dos pedidos no novo fluxo até 18/12) ——— | | | D4 vitrine infinita | **M4** go-live geral |

> Com **menos de 4 devs/squads**, priorizar o eixo operacional **B + C** (destrava o fluxo ponta a ponta separação→fatura→entrega), depois **A**, depois **D**. A Fase 0 não se corta nunca.

---

## ⚠️ Riscos & Pendências

| # | Risco / Pendência | Impacto | Ação |
|---|---|---|---|
| 1 | Modelagem caixa vs pares mal definida | Retrabalho em estoque + 3 fronts | Decidir na Fase 0 com dado real de venda |
| 2 | Provedor facturación electrónica (DIAN) — lead time de contrato/homologação | Bloqueia C2 | Iniciar conversa com Siigo/Alegra/World Office **já em agosto**; fluxo manual como fallback |
| 3 | Estudo do front não está na KB (board Miro vazio via API) | Bloqueia D1 | Bruno anexar/exportar o estudo (ou revisar permissão do board) |
| 4 | Legenda do mapa (amarelo = prioridade? badges 4c/3h/2s?) | Priorização errada | Validar com o time na próxima reunião |
| 5 | Capacidade do time p/ 4 frentes paralelas | Cronograma | Confirmar alocação; usar ordem B→C→A→D se reduzido |
| 6 | Convivência/migração com legado Magento (se houver partes vivas) | Dados e integração | Mapear na auditoria da Fase 0 |
| 7 | Escopo de "Comercial" indefinido no mapa | Escopo oculto | Confirmar se fica para 2027 |
| 8 | Gate contábil pode virar gargalo operacional (pedido parado esperando fatura) | SLA de entrega | Definir SLA de faturamento + alerta de fila parada em C1 |

---

## ✅ Próximos Passos Imediatos

1. Validar este levantamento e a leitura do mapa (amarelos = prioridade) com o time.
2. Agendar a semana de **Fase 0** com as 4 frentes (kickoff + workshops de contratos).
3. Anexar o estudo do front do representante à KB para a verificação D1.
4. Abrir conversa com 2–3 provedores de facturación electrónica (DIAN).
5. Auditoria técnica do Medusa v2 em produção (módulos, customizações, dados).

## 📝 Histórico de Reuniões Anexadas
- [07/08/2026 — Definição das Funcionalidades até o Fim do Ano](../02_Reunioes/2026-08-07_Definicao_Funcionalidades_Feet_Colombia.md)
