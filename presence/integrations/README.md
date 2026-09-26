# Integrações — MotoristaOPS Presença

**Verificado em:** 26/09/2026

## Google Business Profile

### Status

Integração planejada para V1 do painel.

### Regra de autorização

Login Google e gestão de Google Business são consentimentos diferentes.

O login comum autentica o usuário. Quando ele entrar na etapa Google Business, a aplicação solicita a permissão adicional necessária.

Escopo atual documentado pelo Google:

`https://www.googleapis.com/auth/business.manage`

### Restrições

- não assumir que login Google concede acesso ao Business Profile;
- não armazenar tokens de provedor em tabela pública;
- tratar revogação e expiração;
- o Business Profile não possui sandbox dedicado; testes devem respeitar as ferramentas e opções de validação oferecidas pelo Google;
- acesso à API e operações disponíveis dependem das políticas vigentes do Google.

## Melhor Envio

### Status

**Candidato recomendado para logística V1.**

A API documenta:

- autenticação;
- cotação;
- compra/pagamento de frete;
- geração e impressão de etiqueta;
- consulta de status;
- webhooks de mudança de status.

### Webhook

Somente etiquetas geradas pelo mesmo aplicativo integrado disparam os webhooks desse aplicativo.

Validar o cabeçalho `X-ME-Signature` com HMAC-SHA256 antes de aceitar qualquer mudança de estado.

Eventos relevantes incluem:

- `order.created`;
- `order.released`;
- `order.generated`;
- `order.posted`;
- `order.delivered`;
- `order.undelivered`;
- `order.paused`;
- `order.suspended`;
- `order.cancelled`.

A integração interna deve traduzir eventos externos para estados MotoristaOPS. Nunca usar diretamente a string externa como fonte da máquina de estados.

## Printi

### Status

Fornecedor gráfico definido.

Até 26/09/2026 não foi confirmada documentação pública de API/webhook para clientes acompanharem produção de pedidos.

Portanto:

- o pedido para a Printi permanece uma ação humana explícita;
- número do pedido e previsão podem ser registrados na MotoristaOPS;
- o painel não deve inventar status interno da Printi;
- eventual API B2B/privada precisa ser confirmada diretamente com a Printi antes de implementação.

## Hierarquia de confiança

1. evento autenticado da integração;
2. resposta direta da API;
3. dado operacional registrado;
4. atualização manual explícita;
5. IA nunca cria status.
