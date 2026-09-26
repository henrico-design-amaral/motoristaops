# Previsão de entrega

## Objetivo

O cliente deve saber quando espera receber o kit sem depender de atualização manual de Henrico.

## Três níveis de precisão

### 1. Estimativa inicial

Exibida após onboarding/CEP.

```text
estimativa inicial =
prazo gráfico estimado
+ espera por item de estoque, se houver
+ 2–3 dias úteis de montagem
+ prazo de transporte para o CEP
```

Essa data é estimativa e deve ser identificada como tal.

### 2. Estimativa operacional

Atualizada quando a Printi fornece uma previsão e todo o estoque necessário está reservado.

### 3. Previsão logística

Depois da compra/geração da etiqueta, usar a previsão fornecida pela integração logística.

## Evento-chave

Quando os gráficos entram em `GRAPHICS_RECEIVED`, o sistema recalcula:

```text
data limite de despacho = recebimento + 2–3 dias úteis
```

Depois da postagem, a previsão do transportador prevalece para entrega.

## Painel

O cliente vê linguagem simples:

1. Pedido confirmado
2. Materiais em produção
3. Preparando seu kit
4. Kit pronto
5. Enviado
6. Em transporte
7. Entregue

Os estados técnicos continuam disponíveis para auditoria.

## Feriados

Cálculo de dias úteis precisa considerar calendário brasileiro e, quando material, feriados locais relevantes. A fonte do calendário ainda precisa ser definida antes de automatizar SLA comercial.

## Regra de evidência

Nunca mostrar uma data mais precisa que os dados disponíveis permitem.
