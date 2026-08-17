# Handoff — S2.6 despacho + guía (Codex → coordenação, 17/08/2026)

> Documento entregue pelo Bruno em 17/08 ~13:50 Colômbia, vindo da sessão Codex. Fonte da verdade para a integração da vertical S2.6. NÃO duplicar implementação; ler antes de qualquer trabalho em logística/despacho.

## Ponta canônica
- Branch: `codex/s2-6-despacho-guia` · base pretendida: `staging`
- HEAD local/remoto: `a600a7ee` wip(logistica): preserva preparacao do despacho nativo
- PR existente: **draft #1283**, base `staging` (confirmar status no GitHub antes de qualquer ação)
- Backup preservado: branch `backup/codex-s2-6-despacho-guia-0380b2ee` → `0380b2ee` (NÃO apagar até fechamento formal)
- Rebase não destrutivo feito sobre origin; conflitos add/add em `apps/backend/src/workflows/logistica/steps/prepare-dispatch.ts` e seu teste — mantidas as versões remotas; delta local `created_at?` em `OrderComoLogistica` reaplicado em `a600a7ee`; push com `--force-with-lease` (2fcb193b..a600a7ee)

## Vertical S2.6 JÁ na ponta remota (não reimplementar)
- fc6b5d2d feat(logistica): cria despacho nativo sem tocar estoque
- 39980ca2 feat(logistica): expoe endpoint seguro de despacho
- 4cd452b4 feat(logistica): gera guia de despacho sem valores
- d058a5ac feat(admin): adiciona despacho e guia na logistica
- 479aaf7f test(logistica): prova reflexos do despacho nativo
- e52aed59 test(logistica): fecha a regressao e a documentacao da S2.6
- 494f971e docs(logistica): registra o ledger e as evidências da S2.6
- 641234e1 fix(build): fecha os dois erros de typecheck da ponta da S2.6

## Histórico (Tasks 0–4)
- T0 fulfillment nativo low-level, invariância inventory/reservations provada · T1 autorização/sanitização até 826a0a4f · T2 gate fiscal fail-closed + idempotência (831f61df, 3341c709, 553356d6; review ok) · T3 fila V4 + métricas (48fe41a0, d94fcdda, 5dbf563d; runtime ok, evidência HTTP inconclusiva) · T4 T9/evento (1c77ab6f, 866cc980; ressalva created_at coberta por a600a7ee)
- Follow-up devoluções/crédito documentado, FORA do escopo S2.6

## Decisões obrigatórias (preservar)
- Sem schema/migration/backfill/escrita em massa · NÃO usar `createOrderFulfillmentWorkflow` · despacho low-level não altera inventory/reservations · gate fiscal fail-closed, número fiscal obrigatório para expedir · idempotência/concorrência por pedido/evento · PDF sem valores/dados fiscais/nomes internos · produto em espanhol neutro/tuteo · fora de escopo: carteira, pagamentos, S2.7, runtime de devoluções/crédito · não criar outro frontend/fluxo se já houver implementação na ponta remota

## Ressalvas de evidência
- `git diff --check` passou pós-rebase · tentativa pnpm abortou (sem TTY) · Jest focal SEM resumo observável — **não declarar suíte verde sem nova evidência**

## Próximos passos exatos (do handoff)
1. Ler `AGENTS.md`, `docs/FLUXO_DESENVOLVIMENTO.md`, plano S2.6, `docs/qa/fulfillment-ops/`
2. Confirmar estado da PR #1283 (checks, comentários)
3. Inspecionar commits remotos + ledger antes de modificar arquivos
4. Fechar a evidência HTTP pendente com ambiente/banco de teste JÁ preparado (sem reinstalar deps, sem mexer em timeouts/pool para mascarar)
5. Gates restantes: review, segurança/CSO, persona, QA visual de Admin, validação de valores do PDF
6. Só com evidência completa → fluxo de PR/staging; sem merge/deploy sem autorização
