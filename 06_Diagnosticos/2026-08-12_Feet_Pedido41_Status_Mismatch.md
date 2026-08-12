# Diagnóstico — Feet Colombia · Pedido #41 · status exibido ≠ estado real

- **Data:** 2026-08-12
- **Reportado por:** Bruno Medeiros
- **Repositório do código afetado:** `Sants-M13/Medusa` (storefront B2B Feet Colombia)
- **Base do diagnóstico:** duas capturas de tela (portal do cliente + admin Medusa). **Sem acesso ao código-fonte** — ver "Limitação" abaixo.

---

## Limitação importante deste documento

Este diagnóstico **não contém `arquivo:linha`**. A sessão que o produziu está anexada ao repo
`brunosilvamedeiros/visa-portal-hub-3-platforms` e a tentativa de anexar `Sants-M13/Medusa`
foi recusada pelo backend:

```
add_repo: cross-tier adds are not supported in v1: requested "sants-m13/medusa"
but session already has repos from owner(s) [brunosilvamedeiros]
```

As causas abaixo são **hipóteses derivadas da evidência visual**, com alta confiança no
comportamento observado e confiança média na linha de código exata. Cada bug traz âncoras de
busca para localizar o trecho no repo do produto. Quem for aplicar a correção deve confirmar a
causa lendo o código antes de alterar.

---

## Bug 1 — Passo "Despachado" marcado como concluído sem envio real

**Tela:** portal do cliente → `Pedido #41` → bloco `ESTADO DEL PEDIDO` (e o badge de status no topo direito).
**Entidade:** pedido / fulfillment.

### Evidência

| Portal do cliente | Admin Medusa (mesmo pedido) |
|---|---|
| Badge `● Despachado` | `Cumplimiento #1` → **`Awaiting shipping`** |
| Passo `Despachado` com check ✔ | Botões "Marcar como enviado" / "Marcar como entregado" **ainda disponíveis** |
| — | Bitácora com só 2 eventos: *Pedido agregado* (28/7) e *Pedido aprobado* (11/8) — **nenhum evento de despacho** |
| — | Actividad: *"Artículos cumplidos — hace menos de un minuto"* |

O pedido foi **cumprido** (fulfillment criado, itens separados) mas **não foi enviado**.

### Causa (hipótese)

O storefront deriva o passo da timeline do campo de nível de pedido `fulfillment_status`.
No Medusa v2 esse campo passa a `fulfilled` assim que um fulfillment é **criado** — `shipped`
só aparece quando `shipped_at` é preenchido. O código trata `fulfilled` como sinônimo de
"despachado", provavelmente algo na forma de:

```js
if (order.fulfillment_status === "fulfilled") // → marca "Despachado"
```

### Comportamento esperado

| Evento no admin | `fulfillment_status` | Passo correto no cliente |
|---|---|---|
| Fulfillment criado, sem envio | `fulfilled` | **En preparación** |
| "Marcar como enviado" (`shipped_at`) | `shipped` | **Despachado** |
| "Marcar como entregado" (`delivered_at`) | `delivered` | Entregado |

A derivação deve ler os fulfillments, não o status agregado:

```js
const fulfillments = order.fulfillments ?? []
const isPreparing = fulfillments.length > 0 && fulfillments.some(f => !f.shipped_at)
const isShipped   = fulfillments.length > 0 && fulfillments.every(f => !!f.shipped_at)
const isDelivered = fulfillments.length > 0 && fulfillments.every(f => !!f.delivered_at)
```

`partially_shipped` precisa ser tratado explicitamente, senão um envio parcial cai no mesmo buraco.

### Âncoras de busca no repo do produto

- `"Despachado"` / `"En preparación"` / `"Aprobado por cartera"` / `"Facturado"` (labels da timeline)
- `fulfillment_status`
- `ESTADO DEL PEDIDO`

---

## Bug 2 — Data do pedido divergente no card "Detalles"

**Tela:** portal do cliente → `Pedido #41` → card `Detalles` (coluna direita).
**Entidade:** pedido.

### Evidência

| Local | Valor exibido |
|---|---|
| Cabeçalho da página | `Agregado el 28/07/2026` ✅ |
| Admin Medusa | `28 jul 2026 15:44` ✅ |
| Card `Detalles` → `Fecha del pedido` | **`28-6-2026`** ❌ |

Desvio de exatamente **um mês a menos**, na mesma página, para o mesmo pedido.

### Causa (hipótese)

Dois formatadores de data diferentes no mesmo componente; o do card `Detalles` monta a string
manualmente com `getMonth()` sem `+ 1` (`getMonth()` é 0-indexado). O cabeçalho usa um
formatador correto (provavelmente `toLocaleDateString`).

### Comportamento esperado

Ambos os campos devem exibir a mesma data real de criação do pedido (**julho/2026**).
Ideal: consolidar num único helper de formatação de data em vez de manter dois caminhos.

### Âncoras de busca no repo do produto

- `Fecha del pedido`
- `getMonth()`
- `Número de pedido` (label vizinha, no mesmo card)

---

## Observação secundária (não bloqueante)

O passo `Aprobado por cartera` aparece sem data no portal, embora o admin registre a aprovação
em `11/8/2026, 6:05:29 p. m.` por Bruno Medeiros. Vale exibir a data para consistência com o
passo `Pedido agregado`, que mostra a sua.
