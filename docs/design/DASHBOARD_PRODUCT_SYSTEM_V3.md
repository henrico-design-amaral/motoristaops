# MotoristaOPS — Dashboard Product System v3

## Objetivo

Transformar o cockpit em um produto operacional comparável a plataformas maduras de driver analytics e fleet management. A home deve responder em segundos: quanto entrou, quanto sobrou, quão eficiente foi a operação, qual é a próxima melhor janela e o que precisa de ação agora.

## Referências de produto

Padrões incorporados a partir de produtos atuais:

- Gridwise: snapshot de performance com ganhos, ganhos/hora, ganhos/viagem, viagens, ganhos/distância e viagens/hora; leitura de melhores dias/horários/regiões.
- Solo: smart schedule, previsão por bloco horário e planejamento orientado a meta/ganho esperado.
- Motive: driver summary, Action Center, recent activity, summary metrics e quick links.
- Samsara: tiles apenas quando relevantes, separação de Overview / Live / Performance e score contextual.
- Fleetio: dashboard como overview conciso de KPIs, notificações, combustível, manutenção e atalhos.

## Regra de primeira dobra

A primeira dobra não é uma landing page.

Ordem obrigatória:

1. barra de contexto da operação;
2. big numbers;
3. próxima melhor ação / plano operacional;
4. alertas pendentes;
5. só depois tendências e detalhe.

Não usar headline de marketing acima dos KPIs.

## Tipografia de produto

- Page title: 22–28 px desktop, 20–24 px mobile.
- KPI principal: 30–42 px desktop, 26–34 px mobile.
- Section title: 18–24 px.
- Card title: 14–16 px.
- Body: 13–15 px desktop; mínimo 14 px para conteúdo contínuo mobile.
- Label: 11–12 px.

Manrope fica em marca e page title. Inter domina todo o produto.

## Layout

Desktop:
- sidebar 220–236 px;
- conteúdo max 1520 px;
- topbar compacta;
- KPI rail de 6 colunas;
- main decision area 8/4 ou 7/5;
- charts e rankings abaixo.

Mobile:
- navigation strip horizontal;
- topbar em uma coluna;
- KPIs em 2 colunas;
- plano operacional antes de histórico;
- cards longos convertidos em listas quando possível.

## Componentes obrigatórios

### Big numbers

Sempre no topo. Prioridade:
1. receita consolidada;
2. lucro operacional;
3. R$/hora;
4. R$/km;
5. corridas;
6. km trabalhados.

Receita pendente não compete visualmente com receita consolidada; entra como badge/contexto.

### Action Center

Máximo 4 itens. Cada item contém:
- severidade textual;
- ação;
- por que importa;
- link real para seção/módulo.

### Unit economics

Mostrar no mínimo:
- receita/h;
- lucro/h;
- receita/viagem;
- receita/km;
- viagens/h;
- combustível/km quando disponível.

### Daily trend

Bar chart simples, sem biblioteca pesada.
- fechamento completo = barra sólida;
- evidência = barra contornada/tracejada;
- valor deve aparecer acessivelmente na estrutura.

### Plano operacional

Combina:
- melhor janela;
- melhor região;
- melhor rota;
- score/confiança;
- contexto live CET;
- link para Previsão e Trânsito.

O live não altera score histórico sem regra explícita já validada.

### Recent activity

Lista compacta dos últimos fechamentos/evidências. Não usar card por item.

### Quick links

Acesso direto e real para:
- trânsito;
- previsão;
- inteligência;
- contexto;
- importação;
- fontes.

Nenhum atalho pode apontar para rota inexistente.

## Visual

- Noite domina o canvas.
- Grafite para superfícies.
- Carvão para separadores.
- Champagne somente em seleção, ação, oportunidade e pequenos acentos.
- Evitar gradientes decorativos.
- Evitar card dentro de card.
- Separação primária por whitespace e regra 1 px.
- Sombras mínimas.

## Critério vendável

A home está pronta para apresentação comercial quando:
- parece software antes de parecer apresentação;
- KPIs principais cabem integralmente na primeira dobra desktop;
- existe Action Center;
- existe tendência visual;
- existe unit economics;
- existe plano operacional;
- módulos têm links reais;
- mobile mantém os KPIs e o plano antes do arquivo;
- nenhum texto de marketing ocupa espaço que deveria ser usado por decisão operacional.
