# MotoristaOPS — Política de Precificação V3

Status: CANÔNICA APÓS APROVAÇÃO DO PROPRIETÁRIO
Data: 2026-08-28
Escopo: corridas particulares, serviços agendados, recorrência, acompanhamento, viagens e deslocamentos operacionais

## 1. Princípio

A MotoristaOPS precifica a operação real do serviço, não apenas o trecho em que existe passageiro no veículo.

A formação de preço considera, conforme aplicável:

- mobilização da base até o embarque;
- trajeto contratado com passageiro;
- retorno/reposicionamento operacional;
- reserva de agenda;
- espera e acompanhamento;
- paradas adicionais;
- pedágios e estacionamento;
- recorrência e previsibilidade contratual.

A localização eventual do motorista no momento do serviço não altera a referência de precificação.

## 2. Base operacional oficial

**Rua Mario Latorre, 245 — Parque Pinheiros — Taboão da Serra/SP — CEP 06767-230.**

A base funciona como garagem virtual de precificação para mobilização e retorno operacional.

## 3. Tabela-base

| Item | Regra V3 |
| --- | ---: |
| Corrida com passageiro | R$ 4,50/km |
| Mínimo de corrida agendada | R$ 70,00 |
| Reserva/agendamento | R$ 15,00 por serviço |
| Mobilização incluída | até 10 km rodoviários da base por extremidade |
| Mobilização excedente | R$ 3,00/km acima dos 10 km incluídos |
| Tolerância no embarque | 10 min |
| Espera após tolerância | R$ 1,00/min (R$ 60,00/h) |
| Parada adicional simples | + R$ 10,00, quando não gerar espera relevante/desvio substancial |
| Pedágios | adicionais ou explicitamente incluídos no pacote |
| Estacionamento | adicional ou explicitamente incluído no pacote |
| Recorrência | desconto comercial de até 8% sobre a operação completa, quando houver previsibilidade real |

## 4. Mobilização

### 4.1 Aproximação

A distância entre a Base MotoristaOPS e o ponto de embarque é considerada na operação.

- até 10 km rodoviários: incluída no mínimo/agendamento;
- acima de 10 km: cobrar R$ 3,00 por km excedente.

Fórmula:

`mobilização de aproximação = max(0, km_base_embarque - 10) × 3,00`

### 4.2 Retorno/reposicionamento

Quando o serviço exige retorno à base ou reposicionamento sem passageiro e não existe outro serviço confirmado que absorva esse deslocamento, aplicar a mesma regra:

`mobilização de retorno = max(0, km_desembarque_base - 10) × 3,00`

### 4.3 Regra de consistência

A mobilização é sempre calculada pela base operacional oficial, independentemente de onde o motorista esteja circunstancialmente.

Isso garante preço previsível, auditável e reproduzível.

## 5. Corrida agendada

Preço técnico do serviço:

`max(R$ 70,00; km_com_passageiro × R$ 4,50) + R$ 15,00 + mobilização aplicável + adicionais`

O mínimo de R$ 70,00 remunera a execução mínima do trajeto com passageiro. Ele não autoriza absorver deslocamentos vazios ilimitados.

## 6. Espera e acompanhamento

A tolerância padrão é de 10 minutos.

Após a tolerância:

- R$ 1,00 por minuto;
- equivalente a R$ 60,00/hora parada.

A tarifa de espera remunera indisponibilidade e permanência, não deve ser tratada como valor-hora de condução com veículo próprio.

Serviços com acompanhamento prolongado podem ser convertidos em pacote fechado, desde que o valor final não fique abaixo do cálculo técnico aplicável.

## 7. Paradas

Parada adicional simples: + R$ 10,00.

Se a parada provocar desvio relevante, nova mobilização, longa espera ou alteração material de duração/quilometragem, o serviço deve ser recalculado em vez de aplicar apenas a taxa fixa.

## 8. Viagens intermunicipais e estaduais

A viagem deve considerar todos os quilômetros necessários para cumprir a operação.

### Passageiro apenas em um sentido

Quando o retorno é vazio e necessário:

- trajeto com passageiro: R$ 4,50/km;
- retorno operacional: regra de mobilização/retorno definida para a operação ou pacote específico de viagem;
- pedágios e estacionamento conforme orçamento.

Para viagens longas, a proposta deve comparar o modelo padrão de mobilização com o custo real de dedicação integral da operação e adotar o maior valor saudável. Não utilizar apenas a distância percorrida com passageiro quando houver retorno vazio inevitável.

## 9. Serviços recorrentes

Contratos recorrentes devem ser calculados primeiro em valor técnico integral e somente depois receber eventual desconto comercial.

Critérios para desconto:

- quantidade mínima de serviços confirmados;
- dias e horários previsíveis;
- pagamento recorrente e pontual;
- baixa variação de rota;
- reserva efetiva de agenda.

Faixa recomendada de desconto: **0% a 8%**.

O desconto incide sobre a operação completa, incluindo mobilização. Nunca retirar a mobilização do cálculo para criar desconto artificial.

## 10. Serviços MotoristaOPS e lógica comercial

| Serviço público | Como precificar |
| --- | --- |
| Corridas Particulares | tabela-base + mobilização + reserva + adicionais |
| Aeroportos & Rodoviárias | tabela-base + mobilização + reserva + pedágios/estacionamento + espera quando aplicável |
| Agenda & Compromissos | tabela-base ou pacote por dedicação; espera/acompanhamento explicitamente dimensionados |
| Viagens & Deslocamentos | operação completa, incluindo retorno vazio necessário, pedágios, estacionamento e dedicação |
| Acompanhamento | combinado com corrida e tempo de permanência; converter em pacote quando fizer sentido |
| Serviço Recorrente | cálculo técnico integral + desconto de recorrência de até 8% |

## 11. Política comercial

O cliente recebe um preço simples e compreensível. A engenharia interna do preço não precisa expor cada quilômetro vazio como uma linha comercial.

Exemplo de apresentação:

> Serviço recorrente, 6 dias por semana, com dois horários fixos por dia — R$ X por semana.

Internamente, o orçamento deve manter a memória de cálculo completa para auditoria e decisão.

## 12. Limites de negociação

Todo orçamento recorrente deve registrar:

- valor técnico de tabela;
- valor comercial recomendado;
- piso de negociação;
- desconto efetivo;
- receita por serviço;
- quilômetros operacionais estimados;
- observações de pedágio/estacionamento/espera.

O piso de negociação nunca deve ser definido somente por percepção de mercado; deve preservar a sustentabilidade da operação.

## 13. Revisão

Revisar esta política quando ocorrer uma destas condições:

- alteração relevante de combustível, manutenção ou depreciação;
- mudança de veículo;
- aumento recorrente de demanda;
- mudança da base operacional;
- evidência de perda sistemática de propostas por preço;
- evidência de contratos rentáveis abaixo/acima da faixa atual;
- no mínimo uma revisão trimestral dos parâmetros econômicos.
