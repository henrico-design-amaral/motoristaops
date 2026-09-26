# Fulfillment — MotoristaOPS Presença

## Objetivo

Entregar todo o pacote físico de uma vez.

## BOM inicial do pacote completo

- cartão de visita;
- placa de identificação;
- organizador;
- pacote de bala;
- lixinho automotivo;
- lenço umedecido;
- lenço seco;
- álcool em gel;
- brinde;
- embalagem.

Os itens e quantidades comerciais só se tornam canônicos quando o catálogo/BOM for ativado.

## Fluxo

```text
CUSTOMER_CONFIRMED
  -> PRINT_ASSETS_GENERATED
  -> PRINT_PREFLIGHT_PASSED
  -> PRINT_READY
  -> PRINTI_ORDERED
  -> GRAPHICS_RECEIVED
  -> KIT_ASSEMBLY
  -> KIT_PACKED
  -> SHIPPING_QUOTED
  -> LABEL_PURCHASED
  -> READY_FOR_CARRIER
  -> POSTED
  -> IN_TRANSIT
  -> OUT_FOR_DELIVERY
  -> DELIVERED
```

## Regra da Printi

O handoff para a Printi é humano enquanto não houver integração comprovada.

Essa exceção não autoriza atualização manual recorrente do painel. O restante do fluxo deve ser dirigido por eventos e dados persistidos.

## Montagem

Depois de `GRAPHICS_RECEIVED`:

**SLA operacional MotoristaOPS: 2 a 3 dias úteis** para conferência, montagem, embalagem e despacho.

## Estoque

O estoque deve controlar:

- quantidade física;
- quantidade reservada;
- quantidade disponível;
- ponto de reposição;
- custo unitário;
- fornecedor;
- lead time.

Primeiros lotes podem ser pequenos. A quantidade de 5–6 kits é hipótese operacional inicial e não deve virar regra de estoque sem dados.

## Regra de liberação

Um kit não entra em `KIT_ASSEMBLY` se algum item obrigatório da BOM estiver indisponível.
