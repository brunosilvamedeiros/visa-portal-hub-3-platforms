---
id: proj-alfa-01
cliente: Banco Alfa
titulo: Implementação Apple Pay & VTS Tokenization
status: Em Certificação
fase: Certificacao de Testes
gerente_visa: Bruno
data_inicio: 2026-07-01
proximo_marco: Testes de Campo (30/07/2026)
mandato_relacionado: Mandato Q3 2026 - Push Provisioning VTS
produtos: [Apple Pay, Visa Token Service (VTS)]
tags: [banco-alfa, apple-pay, vts, certificacao, tokenizacao]
---

# Banco Alfa — Implementação Apple Pay & VTS Tokenization

## 📋 Resumo Executivo
O Banco Alfa está implementando a solução de carteira digital **Apple Pay** integrada ao **Visa Token Service (VTS)** para permitir o provisionamento automático de cartões (Push Provisioning) via aplicativo mobile iOS e carteiras in-app/in-store.

---

## 🎯 Linha do Tempo e Fases
- [x] **Fase 1: Onboarding & Contrato** *(Concluído em 05/07/2026)*
- [x] **Fase 2: Homologação Técnica & APIs** *(Concluído em 18/07/2026)*
- [ ] **Fase 3: Certificação de Testes (CTE)** *(EM ANDAMENTO - Previsão: 30/07/2026)*
- [ ] **Fase 4: Go-Live em Produção** *(Previsão: 15/08/2026)*

---

## 👥 Equipe & Contatos
- **Gerente de Projetos Visa**: Bruno (PM Client Onboarding)
- **Arquiteto de Soluções Visa**: Carlos Eduardo
- **Líder Técnico Banco Alfa**: Fernando Mendes (CTO Mobile)
- **Gerente de Produto Banco Alfa**: Juliana Prado

---

## 📝 Histórico de Reuniões Anexadas
- [20/07/2026 — Alinhamento Técnico Tokenization](file:///c:/Users/bruno/Desktop/Desktop/Pessoal/4.%20Projetos/Visa%20-%20Base%20de%20Conhecimento%20Ativa/02_Reunioes/2026-07-20_Alinhamento_Tecnico_Tokenization.md)
- [15/07/2026 — Ata de Definição de Escopo Apple Pay](file:///c:/Users/bruno/Desktop/Desktop/Pessoal/4.%20Projetos/Visa%20-%20Base%20de%20Conhecimento%20Ativa/02_Reunioes/2026-07-15_Ata_Escopo_ApplePay.md)

---

## 📌 Decisões Chave & Ações Pendentes
> [!IMPORTANT]
> **Decisão de Arquitetura**: O banco utilizará o **ISO 8583 Field 48 (subfield 22)** para identificação de DPAN nas requisições de autorização.

### Action Items:
- [ ] Banco Alfa enviar logs da suíte de teste CTE até 25/07 (Responsável: Fernando Mendes).
- [x] Visa disponibilizar credenciais do ambiente Sandbox VTS (Responsável: Bruno).
