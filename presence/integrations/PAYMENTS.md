# Pagamentos — MotoristaOPS Presença

**Decisão V1:** Mercado Pago Checkout Pro via **Orders API**.

## Motivo

A integração V1 deve priorizar segurança operacional e velocidade de implantação.

O Checkout Pro mantém a captura de pagamento no ambiente do Mercado Pago e retorna um `checkout_url`, reduzindo a superfície sensível da MotoristaOPS.

A Orders API é a opção atual recomendada pela documentação do Mercado Pago para novas integrações de Checkout Pro.

## Regras canônicas

- criar uma order Mercado Pago para cada tentativa de pagamento;
- usar `external_reference` com o ID da order MotoristaOPS;
- enviar `X-Idempotency-Key` em toda criação;
- o navegador nunca define `PAID`;
- retorno do navegador não é confirmação de pagamento;
- somente webhook autenticado + consulta da order no Mercado Pago pode autorizar a transição `PAYMENT_PENDING -> PAID`;
- status desconhecido falha fechado e não libera onboarding pago;
- credenciais ficam somente em secret storage/server-side;
- nenhum dado de cartão é persistido pela MotoristaOPS.

## Status

Mapeamento canônico de pagamento:

- `CREATED`
- `PROCESSING`
- `APPROVED`
- `FAILED`
- `ACTION_REQUIRED`
- `CANCELED`
- `REFUNDED`
- `PARTIALLY_REFUNDED`
- `UNKNOWN`

Somente `APPROVED` autoriza o pedido a avançar para `PAID`.

## Webhook

Evento esperado na integração atual: `order`.

A entrada precisa conter e validar:

- `x-signature`;
- `x-request-id`;
- `data.id`;
- ID único do evento;
- assinatura com a chave secreta configurada no Mercado Pago.

Depois de validar a assinatura, o backend deve consultar `GET /v1/orders/{id}` e usar o recurso retornado — não o body do webhook isoladamente — para atualizar o pagamento.

## Idempotência

Duas camadas:

1. `X-Idempotency-Key` ao criar a order no Mercado Pago.
2. chave única `(provider, external_event_id)` na tabela interna de webhooks.

## Retorno

As URLs de sucesso/falha/pendência existem apenas para experiência do usuário.

Elas nunca substituem o webhook e a consulta server-side.

## Preço

Nenhum valor no fixture de teste é preço comercial aprovado. Valores de fixture são sintéticos.
