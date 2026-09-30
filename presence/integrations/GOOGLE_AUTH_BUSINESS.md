# Google Auth + Google Business

**Verificado em:** 30/09/2026

## Objetivo

Usar Google como login preferencial sem transformar o login inicial em uma tela de permissões excessivas.

## Fluxo V1

### 1. Login

O motorista entra com Google usando apenas o fluxo padrão necessário ao Supabase Auth.

A aplicação não solicita `business.manage` nessa etapa.

### 2. Google Business

Somente quando o motorista escolher:

- criar um perfil;
- ou conectar um perfil existente;

o painel inicia um segundo consentimento Google solicitando:

`https://www.googleapis.com/auth/business.manage`

Parâmetros previstos:

- `access_type=offline`;
- `prompt=consent`.

O objetivo é receber token do provedor e, quando disponibilizado pelo Google, refresh token.

## Tokens

Supabase Auth mantém a sessão MotoristaOPS.

Os tokens do provedor Google são outra credencial.

Regras:

- não gravar `provider_token` em tabela pública;
- não usar localStorage como armazenamento canônico;
- enviar as credenciais recebidas no callback para backend confiável;
- armazenar o segredo em secret storage;
- no PostgreSQL guardar apenas `secret_reference` e metadados não sensíveis;
- tratar revogação;
- o aplicativo é responsável por renovar o token Google quando necessário.

## Google Business Profile

A API exige OAuth 2.0 e o escopo `business.manage`.

Nem toda ação pode ser automatizada.

A documentação do Google mantém ações que exigem participação direta do comerciante, como determinados processos de reivindicação/propriedade.

Portanto, a MotoristaOPS automatiza o que a API permitir e apresenta instrução self-service quando o Google exigir ação direta do cliente.

## Falha fechada

Se o consentimento não for concedido:

- Google Business fica `pending` ou `not_requested`;
- o restante da landing pode continuar conforme o produto;
- a MotoristaOPS não tenta contornar OAuth por automação de navegador.

## Ambiente

A ativação real depende de:

1. Supabase MotoristaOPS ativo;
2. Google Cloud OAuth client;
3. redirect URIs configuradas;
4. branding/consent screen;
5. acesso habilitado às APIs de Business Profile;
6. teste com conta controlada antes de usar cliente real.
