---
id: proj-feet-01-spec-transportadoras
cliente: Feet Colombia
titulo: Spec curta — Cadastro de transportadoras + Vista completa de despachados
status: Aprovado pelo Bruno (27/08/2026, resultado do E2E)
origem: E2E do fulfillment rodado pelo Bruno em 27/08 — blocos 1-5 OK; bloco 6 com 2 achados
tags: [feet-colombia, onda-2, fulfillment, despacho, transportadoras, guia]
---

# Achados do E2E de 27/08 (Bruno) — Bloco 6

## A1 — Vista de TODOS os despachados, com as guias de cada um
**Relato do Bruno**: "Todos os já despachados não aparecem para mim e por isto não consigo verificar a guia. A aba não mostra todos: mostra apenas os que faltam fatura ou estão prontos para despachar. Gostaria de ter uma forma de consultar todos os que já foram despachados e as guias geradas em cada um."

**Estado**: é a lacuna que a **PR #1409** (branch `claude/despachados-guia`) endereça — verde 4/4, aguardando merge. **ATENÇÃO ao validar o escopo**: o requisito do Bruno é mais amplo do que "achar o caminho". Exigências mínimas:
- Lista de **todos** os pedidos já despachados (histórico, não só os do dia), com paginação.
- **Busca** por nº do pedido e por cliente, e filtro por período.
- Em cada linha, acesso à **guia gerada** (abrir/baixar) e à transportadora usada.
- Se a #1409 entregar apenas o caminho de navegação sem a lista completa + guias, abrir PR complementar.

## A2 — Cadastro de empresas transportadoras (hoje é texto livre)
**Relato do Bruno**: "Na lista de empresas operadoras do envio hoje o texto é livre, gostaria de ter no nosso admin um cadastro de empresas de entrega habilitadas."

**Enquadramento**: adere à estrela-guia do roadmap (aposentar texto livre/controles paralelos; a plataforma é a fonte da verdade). Texto livre gera grafias divergentes e impede relatório por transportadora.

### Escopo proposto (entrega pequena, Onda 2)
1. **Entidade `transportadora`** (módulo do fulfillment): nome (obrigatório), documento/NIT, contato (telefone/e-mail), observações, **ativo/inativo**, timestamps e autor da criação (auditável).
2. **CRUD no admin**: tela de cadastro com lista, busca, criar/editar, e **desativar em vez de excluir** (registro histórico dos despachos anteriores nunca quebra).
3. **Campo do despacho vira seleção do cadastro**: no registrar despacho, o campo "empresa de envio" passa a ser um **select** das transportadoras **ativas**.
   - **Regra de UX (armadilha conhecida)**: o operador precisa poder **cadastrar uma transportadora nova ali mesmo** (opção "＋ Nova transportadora" no próprio select, respeitando permissão) — nunca mandar o operador a outra tela para depois voltar, e nunca travar a bodega por falta de cadastro.
4. **Migração dos dados existentes**: mapear os valores de texto livre já gravados → criar registros iniciais a partir dos valores distintos (normalizando espaços/caixa), vinculando os despachos históricos. Divergências que não puderem ser mapeadas automaticamente ficam visíveis para o time ajustar — sem apagar dado.
5. **Onde aparece**: a transportadora selecionada acompanha o despacho e é exibida na vista de despachados (A1) e na guia.

### Fora do escopo desta entrega
Integração com API de transportadora, cotação de frete, rastreamento automático (Onda 4 ou depois — não abrir agora).

### Critérios de pronto
- Suíte local verde + build de produção provado.
- e2e de **navegador** com screenshots: cadastrar transportadora → registrar despacho escolhendo-a → vê-la na vista de despachados e na guia.
- `/qa` com evidência em comentário na PR ("X achados no total, Y abertos").
- Migração validada com os dados de staging (nenhum despacho histórico perde a informação de transportadora).
