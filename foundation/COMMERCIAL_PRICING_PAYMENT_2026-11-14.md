# MotoristaOPS — Precificação e Pagamento Comercial

**Status: CANONICAL**
**Escopo: PROJECT / MotoristaOPS**
**Vigência: 2026-11-14**

## Fonte de preço

A partir desta data, os novos orçamentos comerciais devem usar como referência principal a planilha de projeto **`Preço - KM2.xlsx`**, respeitando a aba e o tipo de veículo/serviço aplicáveis.

Para o Omoda 5 Luxury operado por Henrico, usar a referência de **Sedan Executivo / Transfer VIP**. Quando houver duas linhas de tarifa por faixa de km, a primeira linha corresponde à referência Transfer VIP e a segunda à referência Parceiro, coerente com a ordem apresentada na própria planilha.

### Regras de leitura

- Capital e interior: usar a aba `SEDAN - SP Capital e Interior`.
- Litoral: usar a aba `SEDAN - Litoral`, que já incorpora o adicional próprio dessa operação.
- Respeitar saída mínima quando ela superar o cálculo por km.
- Adicionais de evento, receptivo, disposição e demais itens só entram quando o serviço correspondente existir.
- A anotação `DATA QUENTE - X TABELA POR 1,4` é um modificador condicional. A planilha não define sozinha quais datas são quentes; não aplicar automaticamente sem classificação operacional.
- Pedágios, estacionamento e outras despesas exigidas pelo canal ou pela proposta devem ser incorporados quando o preço prometido ao cliente/plataforma precisar ser final e completo.

## Plataformas com comissão

Quando um canal descontar comissão percentual sobre o preço ofertado, calcular o preço bruto necessário para preservar o valor líquido da operação:

`preço bruto = (valor técnico + despesas não reembolsadas) / (1 - comissão)`

Não comparar diretamente o preço ofertado na plataforma com a tabela interna sem descontar a comissão.

## Pagamentos diretos MotoristaOPS

Para reservas contratadas diretamente com a MotoristaOPS, o canal padrão passa a ser **Mercado Pago / ecossistema Mercado Livre Empresas**, principalmente por **Link de Pagamento**.

O link pode ser usado para confirmação integral ou para parcelas de sinal/saldo conforme a proposta. A forma escolhida deve ficar registrada na conversa com o cliente.

As taxas do meio de pagamento são variáveis e devem ser verificadas na fonte oficial no momento do orçamento. Não fixar percentuais históricos como regra permanente.

## Limite de aplicação

Esta política não autoriza contornar regras de plataformas terceiras. Quando o atendimento vier de marketplace ou plataforma intermediária, respeitar o fluxo de pagamento e comissão daquele canal.
