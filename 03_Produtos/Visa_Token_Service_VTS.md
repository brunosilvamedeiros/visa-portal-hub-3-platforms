---
id: prod-vts
nome: Visa Token Service (VTS)
categoria: Plataforma de Tokenização de Rede
provedor: Visa Inc.
suporte_tokenizacao: Nativo
modalidades: [Token Requestor, TSP, Device Binding, E-commerce Cloud Tokens]
---

# Visa Token Service (VTS) — Arquitetura de Referência

## 🛡️ O que é o VTS?
O **Visa Token Service (VTS)** é a tecnologia de segurança global da Visa que substitui números de cartão de 16 dígitos (PAN - Primary Account Number) por tokens numéricos exclusivos (**DPAN** ou **Token de E-commerce**).

---

## 🔄 Fluxo de Tokenização
```mermaid
sequenceDiagram
    participant App as App do Emissor / Wallet
    participant VTS as Visa Token Service (VTS)
    participant Issuer as Emissor (Banco)
    
    App->>VTS: 1. Solcita Token (Push Provisioning / In-App)
    VTS->>Issuer: 2. Solicita Validação de Elegibilidade (ID&V)
    Issuer-->>VTS: 3. Aprova Tokenização (Green/Yellow/Red Path)
    VTS-->>App: 4. Emite DPAN & Armazena no Secure Element
```

---

## 📊 Vantagens Principais
- **Redução de Fraude**: Tokens roubados em vazamentos não funcionam fora do dispositivo/carteira específica.
- **Atualização Automática (ABO - Account Updater)**: Se o cartão físico expirar ou for reemitido, o token continua funcionando sem o cliente ter que recadastrar.
