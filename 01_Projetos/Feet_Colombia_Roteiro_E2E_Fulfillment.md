---
id: proj-feet-01-roteiro-e2e
cliente: Feet Colombia
titulo: Roteiro de teste E2E — Fulfillment ponta a ponta (staging)
status: Ativo
autor: Coordenação 9ª geração (session_01CHbKWeSKdhjKoGD4GA9Won)
data: 2026-08-27
base: staging 7d96a46 (+ #1408 mergeada; #1409 aguardando merge)
tags: [feet-colombia, e2e, fulfillment, roteiro, staging]
---

# Roteiro E2E — Fulfillment ponta a ponta

> Referência: fluxo canônico BPMN do Bruno (20/08). Cada passo traz **o que fazer** e **o resultado esperado** — incluindo o que **não** deve acontecer.
> **Falha = anotar o nº do passo + print.** Um print por falha basta.

## Passo 0 — Pré-condições (sempre)
- Conferir no painel do Medusa Cloud: build de **staging = Ready**, e anotar o commit no ar.
- Abrir o admin em **aba anônima** (evita servir bundle antigo do cache).
- Ter à mão: 1 cliente com limite de crédito aprovado, 1 pedido novo, e o leitor de código de barras.

---

## Bloco 1 — Carteira aprova e reserva (BPMN: Carteira verifica → Aprovado? → Reserva)
1. Criar/abrir um pedido novo de um cliente **dentro do limite**.
   *Esperado*: pedido entra com **"Aprobación de cartera"** resolvida positivamente e segue para a fila de Logística.
2. Repetir com um cliente **acima do limite** (ou pedido que estoure a exposição).
   *Esperado*: o pedido **NÃO** avança para separação — fica retido/rechazado com o motivo visível na tela, e a mensagem cita a **área** responsável (nunca uma pessoa).
3. No pedido aprovado, conferir a reserva de estoque.
   *Esperado*: quantidades reservadas ("tu pedido es tu reserva"); o estoque disponível cai na mesma medida.

## Bloco 2 — Fila → Verificación → Picking (BPMN: Verifica → Separa)
4. Logística → aba **Fila**: localizar o pedido (buscar por número e por cliente).
   *Esperado*: aparece nas duas buscas.
5. Mover para **Verificación** e concluir a verificação.
   *Esperado*: o pedido muda para **Picking** e **permanece lá após F5** (bug #34 morto — persistência da transição).
6. Aba **Picking**: abrir o pedido.
   *Esperado*: lista de linhas com contador "0 / N cajas" por SKU.
7. **[#1408 — aguarda merge]** Completar uma linha até fechar a caixa.
   *Esperado*: linha marca como completa **sem toast vermelho**. Não deve aparecer "Cannot read properties of undefined (reading 'onSettled')".
8. **[#1408 — aguarda merge]** No campo **"Escanear / escribir SKU"**: digitar um SKU + Enter.
   *Esperado*: contador da linha sobe (0/1 → 1/1) e o campo limpa sozinho.
9. **[#1408 — aguarda merge]** Repetir o passo 8 **com o leitor** (scanner emula teclado + Enter).
   *Esperado*: mesmo comportamento, sem precisar clicar no campo entre leituras.

## Bloco 3 — Separação parcial (BPMN: Todos produtos encontrados? → não → registra faltantes + motivo → atualiza valor)
10. Num pedido com 2+ itens, marcar **um item como não encontrado**, informando o motivo.
    *Esperado*: o sistema aceita e **NÃO trava a bodega** — o pedido segue para empaque com o que foi separado (regra canônica: parcial nunca trava).
11. Conferir o valor do pedido após o parcial.
    *Esperado*: valor **atualizado**, com o valor antigo riscado e o badge "Parcial X/Y" visível na fila de Facturación.

## Bloco 4 — Empaque e gate da fatura (BPMN: Empacota → envia p/ faturamento)
12. Fechar a separação e **empacar** o pedido.
    *Esperado*: pedido vai para a fila **"Separados — pendentes de fatura"**; contador de Despacho reflete só os **Listos**.
13. Tentar **Registrar factura** num pedido que **ainda não** foi separado+empacado.
    *Esperado*: ação **indisponível/bloqueada** com explicação na tela (regra: fatura só após separado + empacado).
14. No pedido já empacado, **Registrar factura** (upload do documento + nº de **radicado**).
    *Esperado*: fatura registrada, vínculo ao pedido, e a **expedição é liberada** (gate `FACTURA_ANTES_DESPACHO`).

## Bloco 5 — Divergência → nota de crédito (regra: fatura emitida nunca é editada)
15. Num pedido faturado com divergência (parcial após fatura), abrir **Facturación**.
    *Esperado*: linha com badge (Parcial / Inconsistente) **e um caminho de resolução na própria tela** — botão **"Señalar para nota de crédito"**. Nenhum rótulo sem ação.
16. Acionar a nota de crédito e conferir o estado.
    *Esperado*: badge **"Pendiente nota de crédito"** visível; após registrar a NC (documento + radicado), vira crédito no estado de conta do cliente. A fatura original **não** é editada.

## Bloco 6 — Despacho e guia (BPMN: Recebe faturamento → Gera guias → Envia)
17. Aba **Despacho**: o pedido liberado aparece como pronto.
    *Esperado*: presente na lista, com ação de registrar despacho.
18. Registrar o despacho e abrir a aba **Guía**.
    *Esperado*: guia gerada/acessível para o pedido despachado.
19. **[#1409 — aguarda merge]** Seguir a instrução da tela para achar os **já despachados**.
    *Esperado*: a instrução aponta para um lugar que **existe** e a lista de despachados abre, com busca por nº/cliente (regra: instrução na tela nunca aponta para lugar inexistente).

---

## Situação atual dos passos
- **No ar hoje** (staging 7d96a46): blocos 1, 2 (passos 4–6), 3, 4, 5, 6 (passos 17–18).
- **Aguardando merge**: passos 7, 8, 9 (PR #1408 — já mergeada, aguarda deploy) e passo 19 (PR #1409 — verde, aguarda merge).
- **Fora do escopo atual** (decisão do Bruno): confirmação de recebimento pelo cliente (GAP F2 → Onda 4); notificações e solicitação de devolução pelo cliente (congelados em 20/08).
