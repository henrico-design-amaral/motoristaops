# MotoristaOPS Presença — Decisões aprovadas

## 2026-09-26

### D-001 — Produto

Criar uma linha MotoristaOPS Presença com presença digital, social e física integradas.

### D-002 — Página individual

O endereço padrão do motorista será:

`motoristaops.com.br/{slug}`

Domínio próprio será adicional comercial.

### D-003 — Painel

O painel ficará em:

`motoristaops.com.br/painel`

### D-004 — Página comercial

A landing comercial do produto ficará em:

`motoristaops.com.br/presenca`

A raiz atual `motoristaops.com.br` permanece preservada neste estágio.

### D-005 — Banco

PostgreSQL é o banco canônico.

Supabase pode ser usado como plataforma gerenciada de PostgreSQL, Auth e Storage.

### D-006 — Fonte da verdade

Skills, agentes, prompts, memória de modelo e screenshots não são fonte da verdade.

A verdade operacional deve estar em dados canônicos, contratos, templates, regras e estados persistidos.

### D-007 — Layout

É proibido depender de imagem -> interpretação por IA -> reconstrução de layout para produção automática.

A produção deve usar templates determinísticos.

### D-008 — Redes sociais

Instagram, LinkedIn, TikTok e YouTube são informados por URL/perfil.

A MotoristaOPS não publica nem administra conteúdo dessas redes dentro do painel na V1.

### D-009 — Google Business

Google Business é a integração social/local que deve fazer parte do painel quando o cliente autorizar.

### D-010 — Influenciadores

Influenciadores são clientes reais, inclusive quando recebem Press Kit promocional.

Não são testers.

### D-011 — Primeiro usuário de aceitação

Henrico será o primeiro usuário de validação de ponta a ponta depois que a estrutura estiver pronta.

Seu cadastro deve seguir o fluxo comum, sem perfil pré-criado.

### D-012 — Printi

Printi é a gráfica utilizada para materiais gráficos.

Enquanto uma API/webhook não for comprovada, o envio do pedido para a Printi permanece manual e explícito.

### D-013 — Kit físico

O kit completo é enviado em uma única remessa e pode incluir:

- cartão;
- placa;
- organizador;
- bala;
- lixinho automotivo;
- lenço umedecido;
- lenço seco;
- álcool em gel;
- brinde;
- embalagem.

### D-014 — Montagem

Após o recebimento dos materiais gráficos, a MotoristaOPS terá 2 a 3 dias úteis para montagem, embalagem e despacho.

### D-015 — Rastreamento

O painel deve exibir previsão e rastreamento do pacote com atualização automática quando a integração logística fornecer eventos verificáveis.


### D-016 — Publicação estática das páginas de motorista

As páginas públicas em `motoristaops.com.br/{slug}` serão renderizadas de forma determinística no momento da publicação.

O PostgreSQL permanece fonte da verdade. O HTML é artefato derivado, versionado e reproduzível.

Visitas públicas não devem depender de consulta ao banco em tempo real na arquitetura inicial.


### D-017 — Gateway de pagamento V1

A integração de pagamento V1 será implementada com **Mercado Pago Checkout Pro via Orders API**.

Regras:

- a order MotoristaOPS é enviada como `external_reference`;
- toda criação usa `X-Idempotency-Key`;
- retorno do navegador não confirma pagamento;
- somente webhook autenticado + consulta server-side do recurso Mercado Pago pode autorizar `PAYMENT_PENDING -> PAID`;
- nenhum dado de cartão é persistido pela MotoristaOPS;
- o valor comercial do produto continua pendente de precificação real do kit.


### D-018 — Logística V1

A camada logística V1 será implementada com **Melhor Envio**.

Regras:

- cotação, compra, geração e rastreamento usam a API do Melhor Envio;
- webhooks só são aceitos após validação HMAC-SHA256 do `X-ME-Signature`;
- etiquetas precisam ser geradas pelo mesmo aplicativo integrado;
- eventos externos são traduzidos para estados MotoristaOPS antes de persistir;
- retentativas são idempotentes por hash do payload;
- falha, pausa ou suspensão nunca avançam silenciosamente o pedido;
- a transportadora concreta pode variar sem alterar a máquina principal.


### D-019 — Autenticação Google e consentimento progressivo

Google será o login preferencial do painel.

O login inicial não solicita acesso ao Google Business.

O escopo `https://www.googleapis.com/auth/business.manage` será solicitado somente quando o cliente escolher criar ou conectar Google Business.

Tokens do provedor Google são segredos server-side e não podem ser persistidos em tabelas públicas.

Quando o Google exigir ação direta do comerciante, o fluxo será self-service guiado em vez de automação de navegador.


## 2026-10-02

### D-020 — Persistência canônica do onboarding

O onboarding deve persistir todos os campos obrigatórios em uma única transação PostgreSQL antes de avançar de `ONBOARDING` para `DATA_VALID`.

Regras:

- `slug` é escolhido e validado no onboarding; nunca é derivado silenciosamente por IA ou pelo backend;
- personalização gráfica pertence ao pedido e é persistida em registro próprio vinculado a `orders.id`, porque pode divergir do perfil público e precisa ser congelável por pedido;
- o backend persiste perfil, página, veículo, serviços, áreas, redes, Google Business, personalização gráfica e endereço de entrega de forma atômica;
- qualquer falha reverte a transação inteira e mantém o pedido em `ONBOARDING`;
- a função transacional é server-side: clientes `anon` e `authenticated` não recebem permissão de execução direta.
