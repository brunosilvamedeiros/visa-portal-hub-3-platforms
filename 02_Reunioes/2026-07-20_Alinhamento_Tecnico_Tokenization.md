---
id: mtg-20260720-01
projeto_id: proj-alfa-01
cliente: Banco Alfa
titulo: Alinhamento Técnico Tokenization & Certificação CTE
data: 2026-07-20
participantes: [Bruno (Visa), Carlos Eduardo (Visa), Fernando Mendes (Banco Alfa)]
tags: [ata, tokenization, vts, iso8583, cte]
---

# Ata de Reunião: Alinhamento Técnico Tokenization & Certificação CTE

**Data**: 20/07/2026 | **Duração**: 45 min | **Local**: Microsoft Teams

## 📝 Resumo dos Pontos Discutidos
1. **Andamento da Fase CTE**: Fernando apresentou os relatórios de teste do simulador Visa. Das 50 suítes de transação, 47 foram aprovadas com sucesso.
2. **Tratamento do ISO 8583 Field 48**: Confirmada a estrutura do subfield 22 para trafegar o Cryptogram e o indicador de token (DPAN).
3. **Prazos para Go-Live**: A meta é finalizar os 3 testes pendentes de recusa e erro de senha até sexta-feira (25/07).

---

## 🎯 Action Items Extraídos pela IA
- [ ] **Fernando Mendes (Banco Alfa)**: Enviar os logs das 3 suítes com erro ajustadas.
- [ ] **Carlos Eduardo (Visa)**: Analisar payload do Field 48 enviado na mensagem de autorização `0100`.
- [x] **Bruno (Visa)**: Atualizar o status do projeto no sistema para "Em Certificação".
