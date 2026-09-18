# MotoristaOPS — Design Intelligence Protocol

**Status: CANÔNICO — subordinado ao Brand Book V2 e ao MotoristaOPS Orchestrator**

Este protocolo define como referências visuais, repertório externo, IA generativa e tarefas de design entram no sistema MotoristaOPS. O objetivo é aumentar a qualidade sem permitir que referência, tendência ou ferramenta substituam a fonte da verdade.

## 1. Princípio

Referência externa serve para **explicar por que algo funciona**, não para copiar como algo parece.

Toda referência deve ser convertida em variáveis, relações e hipóteses antes de influenciar uma produção.

## 2. Engenharia reversa de referência

Ao receber screenshot, Pinterest, Instagram, Dribbble, Behance, site, campanha ou interface, decompor a referência em:

### 2.1 Hierarquia
- elemento percebido primeiro;
- relação headline / imagem / CTA / marca;
- número de níveis;
- força relativa de cada nível.

### 2.2 Grid e composição
- número aparente de colunas;
- alinhamentos;
- margens;
- gutters;
- proporções;
- zonas dominantes;
- uso de simetria/assimetria.

### 2.3 Espaço
- densidade;
- espaço negativo;
- agrupamento;
- distância entre blocos;
- relação texto/imagem.

### 2.4 Tipografia
- categoria aparente;
- contraste de famílias;
- tamanhos relativos;
- pesos;
- line-height;
- tracking;
- caixa;
- comprimento de linha.

### 2.5 Cor
- cores dominantes;
- papel semântico;
- contraste;
- proporção de superfície;
- uso de acentos;
- saturação.

### 2.6 Forma e componentes
- bordas;
- raios;
- containers;
- chips;
- botões;
- divisores;
- iconografia;
- efeitos.

### 2.7 Imagem
- enquadramento;
- perspectiva;
- direção de luz;
- contraste;
- profundidade;
- tratamento;
- presença humana;
- materialidade.

### 2.8 Motion
Quando houver:
- duração;
- aceleração;
- transições;
- direção;
- comportamento do texto;
- papel do som.

### 2.9 Conversão
- hook;
- foco;
- sequência;
- CTA;
- fricção;
- prova;
- clareza.

## 3. Reference Profile

A saída da engenharia reversa deve ser estruturada como um **Reference Profile**, não como uma ordem de cópia.

Formato mínimo:

- `reference_id`
- `source`
- `purpose`
- `hierarchy`
- `grid`
- `spacing`
- `typography`
- `color_roles`
- `image_treatment`
- `components`
- `motion`
- `conversion`
- `transferable_principles`
- `conflicts_with_motoristaops`
- `hypotheses_to_test`

Esse perfil pode ser representado em JSON quando útil para implementação ou comparação automática.

## 4. design.json: uso permitido

A ideia de extrair variáveis de uma referência para um arquivo estruturado é incorporada como método de análise.

Na MotoristaOPS:

- referência externa **não gera tokens canônicos automaticamente**;
- o JSON extraído é **experimental**;
- seus valores precisam ser comparados aos tokens oficiais;
- conflitos são marcados, não sobrescritos;
- somente decisão explicitamente aprovada pode alterar Brand Book, Style Guide ou Design System.

O fluxo correto é:

**referência → Reference Profile/design.json experimental → comparação com sistema → adotar/adaptar/rejeitar/testar → produção**

Nunca:

**referência → copiar valores → substituir Design System**

## 5. Classificação de transferência

Cada característica encontrada recebe um estado:

### ADOTAR
Compatível com a identidade e melhora a solução.

### ADAPTAR
Princípio útil, mas precisa ser traduzido para tokens, ativos e linguagem MotoristaOPS.

### REJEITAR
Conflita com marca, acessibilidade, autenticidade, semântica ou governança.

### TESTAR
Hipótese plausível sem evidência suficiente. Deve virar variante controlada.

## 6. Anti-generic gate

Antes de aprovar uma solução digital/visual, verificar se ela caiu em defaults previsíveis de ferramenta ou IA.

Sinais de alerta:
- gradiente genérico sem função;
- fonte default escolhida por conveniência;
- excesso de ícones substituindo imagem/contexto;
- cards repetitivos sem necessidade;
- ilustração decorativa genérica;
- glassmorphism/neon/3D apenas por tendência;
- layout “AI SaaS” indiferenciado;
- hero idêntico a templates de mercado.

A resposta não é "ser diferente a qualquer custo".

A resposta é usar **decisões específicas do problema e do sistema MotoristaOPS**.

## 7. Prompt visual para mídia generativa

Para imagem generativa, escrever prompts orientados à imagem, não longas descrições editoriais.

Priorizar:

1. sujeito principal;
2. ação;
3. contexto;
4. enquadramento/perspectiva;
5. luz;
6. materialidade;
7. tom emocional;
8. paleta atmosférica;
9. espaço negativo necessário;
10. restrições negativas.

Evitar pedir à geração:
- logo;
- lettering;
- CTA;
- textos exatos;
- QR;
- ícones oficiais;
- layout final da marca.

Esses elementos pertencem à camada determinística.

## 8. Negative constraints

Prompts de mídia devem listar exclusões relevantes quando houver risco conhecido.

Exemplos MotoristaOPS:
- no suit and tie;
- no generic luxury sedan;
- no limousine aesthetic;
- no invented logo;
- no text;
- no fake gold filter;
- no exaggerated HDR;
- no body slimming;
- no sunglasses;
- no driver as hero;
- no implausible passenger interaction.

Restrições negativas devem resolver riscos concretos, não formar listas decorativas intermináveis.

## 9. Narrativa visual implícita

Uma boa mídia deve sugerir uma situação sem depender de texto explicativo.

Preferir cenas em que seja possível inferir:
- espera;
- chegada;
- embarque;
- acompanhamento;
- bagagem;
- percurso;
- preparação;
- retorno;
- cuidado.

A imagem deve fazer parte da mensagem, não atuar como fundo genérico.

## 10. Biblioteca de capacidades de design

O orquestrador deve ativar capacidades conforme a tarefa.

### Branding
- auditoria de identidade;
- arquitetura de marca;
- direção de arte;
- aplicação de sistema;
- benchmark;
- revisão de consistência.

### Graphic design
- hierarquia;
- composição;
- tipografia;
- cor;
- grids;
- materiais editoriais;
- produção social;
- impressão.

### Product / UX
- arquitetura de informação;
- user flows;
- estados vazios;
- edge cases;
- responsividade;
- acessibilidade;
- testes de usabilidade;
- UX writing.

### Design System
- tokens;
- componentes;
- estados;
- documentação;
- handoff;
- governança;
- consistência entre código e design.

### Social / Growth
- briefing;
- hook;
- narrativa;
- formato nativo;
- CTA;
- teste;
- KPI;
- aprendizado.

### QA
- crítica de layout;
- revisão pré-entrega;
- acessibilidade;
- consistência;
- risco;
- evidência;
- pacote final.

Nenhuma capacidade tem autoridade para substituir as camadas canônicas.

## 11. Briefing vago → briefing acionável

Quando a solicitação vier incompleta, o orquestrador deve converter internamente o pedido para:

- problema;
- objetivo;
- usuário/público;
- contexto;
- canal;
- ação desejada;
- evidência;
- restrições;
- formato;
- critério de sucesso.

Se faltar uma decisão material e irreversível, perguntar.
Se faltar um detalhe pequeno e reversível, assumir explicitamente.

## 12. Critique mode

Antes de uma produção ser considerada final, executar crítica técnica separada da criação.

Avaliar:
- hierarquia;
- legibilidade;
- densidade;
- composição;
- semântica;
- acessibilidade;
- objetivo;
- conversão;
- consistência;
- autenticidade;
- redundância.

A crítica deve apontar problemas concretos e ação corretiva, não adjetivos vagos.

## 13. Edge-case thinking

Em interfaces e fluxos, sempre considerar:
- vazio;
- carregando;
- erro;
- sucesso;
- indisponibilidade;
- dados longos;
- texto maior;
- tela estreita;
- conexão ruim;
- conteúdo ausente;
- permissão negada;
- falha de integração;
- estados parciais.

Uma interface que só funciona no happy path não está concluída.

## 14. Accessibility audit

Quando a tarefa envolver interface ou conteúdo digital, revisar no mínimo:
- contraste;
- tamanho;
- foco;
- teclado;
- ordem de leitura;
- semântica;
- targets;
- movimento;
- texto alternativo;
- legendas;
- conteúdo não dependente apenas de cor.

Conformidade só pode ser declarada após teste correspondente.

## 15. Benchmark

Benchmark serve para mapear:
- convenções;
- expectativas;
- gaps;
- oportunidades;
- riscos de comoditização.

Não usar benchmark para justificar copiar a solução mais frequente.

A saída deve distinguir:
- padrão necessário;
- padrão opcional;
- oportunidade de diferenciação;
- antipadrão.

## 16. SOP e repetibilidade

Tarefas recorrentes devem migrar de conhecimento implícito para:
- checklist;
- SOP;
- template;
- token;
- componente;
- automação;
- gate.

Se uma correção se repete, o problema deve ser resolvido no sistema, não peça a peça.

## 17. KPIs e validação

Quando design estiver conectado a performance, definir:
- objetivo;
- indicador primário;
- indicadores de apoio;
- baseline quando existir;
- hipótese;
- janela de observação;
- variável modificada.

Não declarar que uma solução "converte melhor" sem dados.

## 18. Fontes incorporadas nesta revisão

### Deborah Folloni / DebGPT — 26/11/2025
Princípio incorporado: boas referências + extração estruturada de variáveis + transferência para execução. A recomendação de ferramenta/modelo permanece opinião da autora e não vira padrão MotoristaOPS.

### OpenArt — 14/10/2024
Princípios incorporados: prompts visuais claros e específicos; experimentar perspectiva quando necessário; sugerir narrativa visual; explicitar tom emocional; usar negativas para excluir riscos; enfatizar elementos importantes.

Exemplos de criação de logo/vetor não se aplicam à MotoristaOPS por conflito com governança de ativos.

### USO IA — conteúdo consultado em 18/09/2026
Capacidades incorporadas ao roteamento: engenharia reversa de style guide, documentação de Design System, user flows/edge cases, acessibilidade, briefing, crítica de layout, image prompting, pesquisa, diagnóstico, SOP, QA, benchmark, KPIs, automação e gestão de risco.

A listagem da fonte é repertório; não define qualidade ou prioridade automaticamente.

## 19. Regra final

**Repertório aumenta possibilidades. O sistema decide o que entra.**

O orquestrador deve extrair princípios, confrontá-los com a fonte da verdade e só então permitir sua aplicação.
