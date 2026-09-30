# Logística — Melhor Envio

**Decisão V1:** Melhor Envio como camada de intermediação logística.

## Motivo

A integração cobre:

- cotação;
- inclusão do frete no carrinho;
- pagamento da etiqueta;
- geração;
- impressão;
- rastreamento;
- webhooks de mudança de status.

A MotoristaOPS não precisa implementar regras específicas para cada transportadora.

## Webhook

O Melhor Envio assina o corpo bruto com HMAC-SHA256 e envia a assinatura em `X-ME-Signature`.

Regra:

```text
expected = base64(HMAC_SHA256(secret, raw_request_body))
```

Comparar em tempo constante.

Etiquetas precisam ter sido geradas pelo mesmo aplicativo integrado para que os webhooks desse aplicativo sejam enviados.

## Eventos canônicos

| Melhor Envio | Shipment MotoristaOPS | Order MotoristaOPS |
|---|---|---|
| order.created | PENDING | — |
| order.pending | PENDING | — |
| order.released | LABEL_PURCHASED | LABEL_PURCHASED |
| order.generated | READY_FOR_CARRIER | READY_FOR_CARRIER |
| order.posted | POSTED | POSTED |
| order.received | IN_TRANSIT | IN_TRANSIT |
| order.delivered | DELIVERED | DELIVERED |
| order.undelivered | DELIVERY_FAILED | — |
| order.paused | ACTION_REQUIRED | — |
| order.suspended | SUSPENDED | — |
| order.cancelled | CANCELLED | — |

Eventos de falha não devem avançar a máquina principal silenciosamente.

## Idempotência

O hash SHA-256 do corpo bruto é armazenado como chave única na auditoria interna.

Retentativas do mesmo webhook não geram duas atualizações.

## Rastreamento

Persistir quando disponível:

- ID da etiqueta Melhor Envio;
- protocolo;
- transportadora;
- código de rastreamento;
- URL de rastreamento;
- previsão de entrega;
- timestamps de postagem/entrega.

A documentação alerta que o tracking pode demorar até 1 dia útil após a postagem, dependendo da transportadora. O painel não deve tratar ausência imediata de código como erro definitivo.

## Sandbox

Desenvolvimento deve usar `sandbox.melhorenvio.com.br`.

No sandbox, as etiquetas avançam de status automaticamente, o que é útil para validar o painel e os webhooks antes de produção.
