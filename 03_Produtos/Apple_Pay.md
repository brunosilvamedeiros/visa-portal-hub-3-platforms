---
id: prod-apple-pay
nome: Apple Pay
categoria: Carteira Digital / Mobile Wallet
provedor: Apple Inc. & Visa
suporte_tokenizacao: Sim (Visa Token Service - VTS)
modalidades: [In-Store (NFC), In-App (iOS SDK), Web (Safari/Apple Pay Web), Push Provisioning]
---

# Apple Pay — Guia Completo de Produto & Integração Visa

## 📱 Visão Geral
O **Apple Pay** permite que portadores de cartões Visa realizem pagamentos por aproximação (NFC) em terminais físicos e em aplicativos/sites no ecossistema iOS/macOS com autenticação via **Face ID** ou **Touch ID**.

---

## 🔑 Componentes Principais
1. **Push Provisioning**: Permite que o cliente adicione o cartão à Apple Wallet diretamente dentro do aplicativo bancário do emissor com 1 clique (sem digitar o número de 16 dígitos).
2. **DPAN (Device PAN)**: Número de cartão virtual exclusivo armazenado no Secure Element do dispositivo Apple. O PAN real do cliente nunca é transmitido na transação.
3. **Cryptogram (ARQC)**: Criptograma único gerado a cada transação para impedir clonagem ou fraudes.

---

## 🛠️ Requisitos de Integração com o VTS (Visa Token Service)
- Cadastro de **TR-ID (Token Requestor ID)** de acordo com as regras de emissão.
- Homologação de artes de cartão (*Card Artwork Guidelines*): Formato PNG com transparência e perfil de cor SRGB.
- Implementação de APIs VTS para gerenciamento de ciclo de vida (Bloqueio, Desbloqueio, Cancelamento de Token).
