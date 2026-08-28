# MotoristaOPS — Tabela V3 de Propostas de Trabalho

Status: OPERACIONAL
Data: 2026-08-28
Referência: `docs/operations/PRICING_POLICY_V3.md`

Esta tabela é a camada rápida para orçamento. A política V3 é a autoridade para cálculo e exceções.

## 1. Parâmetros oficiais

| Parâmetro | Valor |
| --- | ---: |
| Base operacional | Rua Mario Latorre, 245 — Taboão da Serra/SP |
| Corrida com passageiro | R$ 4,50/km |
| Mínimo agendado | R$ 70,00 |
| Reserva | R$ 15,00 por serviço |
| Mobilização incluída | 10 km rodoviários por extremidade |
| Mobilização excedente | R$ 3,00/km |
| Tolerância | 10 min |
| Espera | R$ 1,00/min |
| Parada adicional simples | R$ 10,00 |
| Recorrência | até 8% de desconto sobre o cálculo completo |

## 2. Serviços e proposta de precificação

| Serviço | Regra de entrada | O que precisa entrar no cálculo |
| --- | --- | --- |
| Corrida particular urbana | a partir de R$ 85,00 | mínimo/corrida + reserva + mobilização + adicionais |
| Corrida agendada fora do raio | a partir de R$ 85,00 | regra-base + mobilização acima de 10 km |
| Aeroporto / rodoviária | sob orçamento | mobilização + corrida + reserva + pedágio/estacionamento + espera quando houver |
| Compromisso médico | sob orçamento | ida + espera/acompanhamento + retorno + mobilização |
| Reunião / evento | sob orçamento | corrida ou bloco de dedicação + espera + mobilização |
| Viagem intermunicipal | sob orçamento | operação completa, inclusive retorno vazio necessário |
| Viagem interestadual | sob orçamento | operação completa + pedágios + descanso/pernoite quando aplicável |
| Acompanhamento | adicional ao transporte | tempo de dedicação e indisponibilidade |
| Serviço recorrente | pacote semanal/mensal | cálculo integral primeiro; desconto de 0% a 8% depois |

## 3. Valores que permanecem

Os seguintes valores anteriores continuam válidos:

- R$ 4,50/km com passageiro;
- mínimo agendado de R$ 70,00;
- reserva de R$ 15,00;
- tolerância de 10 minutos;
- espera de R$ 1,00/min;
- parada adicional simples de R$ 10,00.

A V3 acrescenta a regra que faltava: **mobilização operacional**.

## 4. Nova regra de mobilização

- 0 a 10 km da base: incluído;
- acima de 10 km: R$ 3,00/km excedente;
- aplicar na aproximação;
- aplicar no retorno/reposicionamento quando necessário;
- calcular sempre com base na garagem virtual oficial, e não na localização casual do motorista.

## 5. Faixas comerciais recomendadas

### Corrida particular

Preço técnico:

`max(70; km_passageiro × 4,50) + 15 + mobilização + adicionais`

Apresentação comercial: arredondar quando necessário para valor simples, sem ficar abaixo do piso técnico.

### Serviço recorrente

1. calcular todos os serviços da semana/mês pelo valor técnico;
2. somar mobilização real padronizada;
3. aplicar no máximo 8% de desconto;
4. preferir cobrança semanal no primeiro ciclo com cliente novo;
5. migrar para mensal após histórico de pagamento e estabilidade de rota.

### Viagem longa

Nunca cobrar somente o trecho com passageiro quando houver retorno vazio inevitável. O orçamento deve cobrir o ciclo operacional completo.

## 6. Estrutura interna obrigatória de cada proposta

Registrar:

| Campo | Obrigatório |
| --- | --- |
| Cliente / referência | sim |
| Data / frequência | sim |
| Origem / destino | sim |
| Horário | sim |
| Km com passageiro | sim |
| Km de aproximação | sim |
| Km de retorno/reposicionamento | quando houver |
| Valor técnico | sim |
| Desconto | quando houver |
| Valor comercial | sim |
| Piso de negociação | sim |
| Pedágio / estacionamento | quando houver |
| Espera / acompanhamento | quando houver |
| Observações de risco/recorrência | quando houver |

## 7. Comunicação ao cliente

A proposta externa deve ser simples. Não expor a planilha operacional inteira salvo quando houver necessidade contratual.

Formato preferencial:

- serviço;
- frequência;
- horários;
- origem/destino;
- o que está incluído;
- valor;
- forma de pagamento;
- regra de espera/cancelamento relevante.

## 8. Governança

Mudança de valor-base, raio incluído ou tarifa de mobilização deve ser registrada em `DECISIONS.md` e refletida nesta tabela e na política V3.
