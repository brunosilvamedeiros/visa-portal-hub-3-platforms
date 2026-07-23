---
id: dict-emv-visa
titulo: Dicionário de Dados & Glossário Técnico da Indústria
categoria: Dicionario de Dados
---

# Dicionário de Dados & Glossário de Meios de Pagamento (Visa / EMV)

| Termo / Sigla | Categoria | Descrição Técnica | Padrão / Aplicação |
| :--- | :--- | :--- | :--- |
| **DPAN (Device Primary Account Number)** | Tokenização | Número de conta substituto de 16 dígitos atribuído exclusivamente a um dispositivo ou aplicativo móvel. | Padrão Visa VTS / Apple Pay / Google Pay |
| **PAN (Primary Account Number)** | Cartões | O número real de 16 dígitos impresso no cartão de plástico físico do cliente. | ISO/IEC 7812 |
| **ISO 8583 Field 48** | Mensageria | Campo de dados adicionais privados presente nas mensagens de autorização (0100/0200) contendo subcampos de token e criptogramas. | Protocolo de Autorização Visa BASE I |
| **ARQC (Authorization Request Cryptogram)** | Criptografia EMV | Criptograma dinâmico gerado pelo chip do cartão ou token para validar a autenticidade junto ao emissor. | Padrão EMV Co |
| **ARPC (Authorization Response Cryptogram)** | Criptografia EMV | Resposta criptográfica gerada pelo emissor na aprovação da autorização para validar a transação no chip do terminal. | Padrão EMV Co |
| **TR-TSP (Token Requestor - Token Service Provider)** | Regras de Rede | Entidade parceira credenciada e registrada na Visa responsável por solicitar e gerenciar o ciclo de vida de tokens. | Visa Token Service |
| **ID&V (Identification & Verification)** | Segurança | Processo de identificação e verificação do portador do cartão durante o provisionamento (SMS OTP, App-to-App, Call Center). | VTS Framework |
| **Cryptogram (Criptograma de Token)** | Tokenização | Valor de segurança de uso único gerado a cada transação tokenizada para garantir que o token só seja aceito se originado do dispositivo correto. | EMV Payment Token Specification |
