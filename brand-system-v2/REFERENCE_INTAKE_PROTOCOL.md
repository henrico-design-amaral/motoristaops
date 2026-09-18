# MotoristaOPS — Reference Intake Protocol

**Status: CANÔNICO — subordinado ao Brand Book V2 e ao MotoristaOPS Orchestrator**

Referências externas servem para ampliar repertório e testar hipóteses. Elas não têm autoridade para alterar a identidade MotoristaOPS.

Este protocolo transforma screenshots, pins, posts, sites, campanhas, interfaces e peças de terceiros em variáveis analisáveis antes de qualquer aplicação.

## 1. Princípio

**Extrair lógica; não copiar aparência.**

O objetivo da análise é entender por que uma referência funciona e separar:

- estrutura;
- hierarquia;
- ritmo;
- densidade;
- contraste;
- comportamento;
- narrativa;
- tratamento de mídia;
- mecânica de conversão.

Não importar automaticamente:

- logo;
- símbolo;
- wordmark;
- ilustração proprietária;
- texto;
- combinação marcária;
- paleta;
- fonte;
- layout;
- estilo reconhecível de outra marca.

## 2. Estados de uma referência

Cada achado recebe um estado:

### Transferível
Princípio compatível com a MotoristaOPS e aplicável sem conflito.

### Adaptável
Princípio útil que exige tradução para os tokens, tipografia, assinatura ou linguagem MotoristaOPS.

### Hipótese
Ideia plausível sem evidência suficiente; pode entrar em teste controlado.

### Incompatível
Conflita com Brand Book, operação real, acessibilidade, autenticidade ou governança.

### Proprietário
Elemento cuja reprodução seria cópia de identidade/obra de terceiro. Usar apenas como análise.

## 3. Visual Spec de referência

Para cada referência relevante, produzir uma ficha estruturada com os campos abaixo.

### Metadados
- fonte;
- data de acesso quando relevante;
- tipo de peça;
- canal;
- proporção;
- provável objetivo;
- provável estágio da jornada.

### Hierarquia
- elemento dominante;
- elemento secundário;
- assinatura;
- ordem de leitura;
- quantidade de níveis tipográficos;
- peso relativo do CTA.

### Grid e composição
- alinhamentos;
- colunas aparentes;
- margens;
- gutters;
- zonas;
- assimetria/simetria;
- relação texto × imagem;
- uso de espaço negativo;
- densidade D1–D4 equivalente.

### Tipografia aparente
- categoria de família;
- contraste de peso;
- escala;
- leading;
- tracking;
- caixa;
- comprimento de linha;
- função por nível.

Não inferir uma fonte exata quando não houver evidência.

### Cor e superfície
- papéis cromáticos;
- proporção aproximada por função;
- contraste;
- fundos/superfícies;
- cor de CTA;
- cor semântica;
- dependência de gradiente/sombra.

Para MotoristaOPS, registrar a lógica; não importar HEX externo como token canônico.

### Forma
- raios;
- bordas;
- divisores;
- containers;
- profundidade;
- sombra;
- textura;
- recortes.

### Imagem
- território fotográfico;
- enquadramento;
- perspectiva;
- distância focal aparente;
- luz;
- profundidade;
- pose/gesto;
- relação pessoa/ambiente;
- correção de cor;
- uso de IA ou ilustração quando perceptível.

### Iconografia
- família aparente;
- stroke/fill;
- escala;
- função;
- consistência.

MotoristaOPS continua usando Lucide na iconografia funcional; referência externa não altera essa regra.

### Motion/interação
Quando aplicável:
- ritmo;
- transição;
- duração percebida;
- entrada/saída;
- foco;
- feedback;
- progressão narrativa.

### Conteúdo e conversão
- hook;
- promessa;
- prova;
- objeção;
- CTA;
- fricção;
- sequência;
- nível de informação por frame.

### Acessibilidade e riscos
- legibilidade mobile;
- contraste;
- texto sobre imagem;
- tamanho aparente;
- dependência de cor;
- excesso de densidade;
- problemas de privacidade/representação.

## 4. Saída obrigatória da análise

Concluir com quatro blocos:

1. **O que funciona**
2. **O que é transferível para MotoristaOPS**
3. **O que deve ser rejeitado**
4. **O que vale testar**

Não produzir uma peça nova diretamente a partir da referência sem essa decomposição quando a referência for estrutural para a solicitação.

## 5. Reference Spec não é Design System

A ficha de referência é **experimental/analítica**.

Ela só vira parte do sistema quando:

1. resolve um problema real;
2. não contradiz regra canônica;
3. passa por teste/QA adequado;
4. é deliberadamente incorporada à documentação.

Design reference → análise → tradução → teste → decisão → canonização.

Nunca:
design reference → cópia direta → produção.

## 6. Engenharia reversa assistida por IA

Pode-se usar IA para identificar padrões de uma imagem ou página, inclusive gerar uma estrutura semelhante a um “design.json”.

No MotoristaOPS, o artefato resultante deve ser tratado como **Reference Spec**, não como fonte da verdade.

Exemplo de estrutura conceitual:

```json
{
  "source": {},
  "intent": {},
  "hierarchy": {},
  "layout": {},
  "typography": {},
  "color_roles": {},
  "surfaces": {},
  "shape": {},
  "imagery": {},
  "iconography": {},
  "motion": {},
  "conversion": {},
  "accessibility_risks": [],
  "transferable": [],
  "adaptable": [],
  "hypotheses": [],
  "incompatible": []
}
```

A saída não deve sobrescrever `tokens.css`, `tokens.dtcg.json`, Brand Book, Style Guide ou Design System.

## 7. Referências de repertório incorporadas

### Deborah Folloni / DebGPT — design.json
Princípio incorporado: selecionar boa referência → extrair variáveis de estilo → usar a decomposição como insumo de execução.

Adaptação MotoristaOPS:
- referência não define identidade;
- variáveis externas não substituem tokens;
- “bom gosto” vira curadoria + critérios explícitos;
- design.json vira Reference Spec experimental.

### OpenArt — prompts de design gráfico
Princípios incorporados para mídia generativa:
- instruções visuais específicas;
- perspectiva/estilo explícitos;
- pista narrativa;
- humor/atmosfera;
- negative constraints;
- ênfase em detalhes relevantes.

Não incorporar exemplos estilísticos como identidade MotoristaOPS.

### USO IA — biblioteca para designers
Princípios incorporados:
- engenharia reversa de peças existentes;
- briefing acionável;
- crítica técnica de layout;
- documentação de Design System;
- auditoria de acessibilidade;
- UX writing;
- pesquisa guiada;
- diagnóstico/priorização;
- benchmark;
- SOP;
- indicadores;
- gestão de riscos;
- revisão crítica;
- pacote final.

Essas funções entram como capacidades do Orchestrator, não como prompts copiados.
