# MotoristaOPS — Prompting Protocol

**Status: CANÔNICO — subordinado ao MotoristaOPS Orchestrator**

Este protocolo transforma repertório de prompts em um contrato de execução. Prompts são meios de briefing; não substituem Brand Book, Style Guide, Design System, evidência nem QA.

## 1. Estrutura-base: PACIF+

Toda solicitação relevante a IA, agente, designer, redator ou ferramenta deve ser estruturada com:

### P — Papel
Definir a especialidade necessária, sem usar o papel como argumento de autoridade.

Exemplos:
- Diretor de Arte sênior
- Product Designer
- UX Writer
- Social/Growth Strategist
- Motion Designer
- Researcher

O papel orienta o tipo de raciocínio; não autoriza quebrar regras canônicas.

### A — Ação
Descrever o que deve ser feito de forma verificável.

Evitar: “crie algo bonito”.

Preferir: “crie uma capa 4:5 para Instagram que comunique acompanhamento médico e leve o usuário a consultar disponibilidade”.

### C — Contexto e conteúdo
Fornecer somente contexto relevante:

- marca/projeto;
- público;
- canal;
- etapa da jornada;
- serviço;
- mensagem;
- ativos disponíveis;
- texto obrigatório;
- referências;
- evidência disponível;
- estado atual do sistema.

Para MotoristaOPS, o contexto deve sempre apontar para Brand Book V2 + regras canônicas vigentes.

### I — Intenção
Definir o efeito esperado.

Exemplos:
- compreensão;
- confiança;
- salvamento;
- clique;
- conversa;
- orçamento;
- reserva;
- continuidade de série.

Intenção não deve ser confundida com estética.

### F — Formato
Definir a saída e as restrições do meio:

- proporção;
- resolução;
- canal;
- número de frames;
- duração;
- estrutura;
- tamanho máximo de texto;
- safe areas;
- arquivo/artefato final esperado.

## 2. Extensão obrigatória MotoristaOPS

PACIF sozinho é insuficiente para produção final. Acrescentar:

### R — Regras e restrições

Incluir as regras que não podem ser violadas:

- assinatura correta;
- tipografia;
- paleta;
- grid;
- spacing;
- acessibilidade;
- veículo real;
- representação do operador;
- proibições de geração;
- claims permitidos;
- privacidade;
- dados que não podem ser inventados.

### V — Validação

Definir antes da execução como a saída será aprovada:

- Brand Gate;
- legibilidade mobile;
- contraste;
- fidelidade de ativo;
- hierarquia;
- CTA;
- autenticidade;
- adequação ao canal;
- QA técnico;
- métrica quando houver publicação.

**Forma canônica: PACIF + R + V.**

## 3. Regra de autoridade

Um prompt nunca prevalece sobre:

1. decisão canônica mais recente;
2. Brand Book V2;
3. Style Guide V2;
4. Design System V2;
5. Orchestrator;
6. Social Media Operating System.

Se um prompt externo pedir algo incompatível, adaptar ou rejeitar a parte incompatível.

## 4. Prompt para análise de referência

Usar para Pinterest, Instagram, Behance, campanha, interface ou material visual.

### Objetivo
Extrair princípios transferíveis sem copiar identidade alheia.

### Estrutura

**Papel:** direção de arte/design system/research visual.

**Ação:** decompor a referência.

**Contexto:** indicar onde a referência será aplicada e quais regras MotoristaOPS já estão fechadas.

**Intenção:** identificar o que aumenta clareza, qualidade, coerência ou desempenho.

**Formato:** reportar:
- hierarquia;
- grid/proporção;
- spacing;
- tipografia aparente;
- cor;
- densidade;
- tratamento de imagem;
- CTA;
- assinatura;
- ritmo;
- princípios transferíveis;
- elementos incompatíveis;
- hipótese a testar.

**R:** não copiar layout, marca, texto, ilustração ou símbolo.

**V:** cada elemento incorporado deve ser justificável pelo Brand Book V2.

## 5. Prompt para identidade/direção criativa

Para **novas marcas**, PACIF+ pode construir uma identidade do zero.

Para **MotoristaOPS**, este prompt não pode recriar identidade. O uso permitido é:

- auditar;
- expandir sistema;
- resolver lacuna;
- criar aplicação;
- testar nova linguagem dentro dos limites existentes.

Não sugerir nova paleta, nova família tipográfica, novo símbolo ou novo posicionamento sem evidência de necessidade e decisão explícita.

## 6. Prompt para geração de imagem

Em MotoristaOPS, IA generativa cria apenas **mídia desbloqueada**.

Pode gerar:
- fotografia;
- atmosfera;
- cenário;
- luz;
- composição fotográfica;
- ilustração autorizada.

Não deve gerar:
- logo;
- brasão;
- wordmark;
- assinatura;
- CTA final;
- tipografia final;
- QR Code;
- ícone oficial;
- texto legal;
- layout final quando depender de ativos exatos.

### Estrutura obrigatória

**P:** diretor de fotografia / diretor de arte / ilustrador, conforme tarefa.

**A:** gerar apenas a mídia necessária.

**C:** serviço, contexto, personagem, veículo e narrativa.

**I:** emoção/percepção desejada.

**F:** proporção, enquadramento, resolução e área negativa necessária para composição.

**R:** fidelidade a Henrico, HB20 real quando aplicável, não inventar luxo, não sintetizar branding.

**V:** revisar anatomia, veículo, contexto, coerência, privacidade e possibilidade de composição determinística.

## 7. Prompt para landing page / UI

Estrutura mínima:

**P:** Product Designer/UX/UI.

**A:** estruturar ou implementar página/módulo.

**C:** objetivo, usuário, origem do tráfego, conteúdo, estado atual, módulos existentes.

**I:** tarefa do usuário + resultado de negócio.

**F:** wireframe, fluxo, conteúdo, componentes, responsividade.

**R:** modularidade, 4/8/12 colunas conforme contexto, Instrument Sans produtiva, acessibilidade, Brand Gate, sem criar símbolos.

**V:** clareza, escaneabilidade, CTA, responsividade, contraste, estados, navegação e consistência com sistema.

Para MotoristaOPS, uma seção deve ter uma função principal. Alterações devem preservar a arquitetura modular.

## 8. Prompt para social media

Antes de qualquer arte:

**P:** Social/Growth Strategist + Diretor de Arte + UX Writer, acionados pelo orquestrador.

**A:** criar conteúdo para um objetivo específico.

**C:** público, canal, serviço, contexto, evidência, calendário, histórico relevante.

**I:** descoberta, consideração, confiança, conversa, orçamento ou reserva.

**F:** post, carrossel, Reel, Story, documento, anúncio; especificar proporção e sequência.

**R:** Brand Book, assinatura social, mobile-first, texto mínimo, formato nativo, sem microcopy, sem claims inventados.

**V:** hook, narrativa, CTA, legibilidade, Brand Gate, safe area e métrica de aprendizado.

## 9. Prompts encontrados externamente

Tratar prompts externos como **padrões de raciocínio**, não como comandos prontos.

Classificar cada parte:

- **adotar**: compatível e útil;
- **adaptar**: princípio útil, forma incompatível;
- **rejeitar**: conflita com sistema, evidência ou ferramenta;
- **testar**: hipótese sem base suficiente.

## 10. Aplicação ao repertório recebido

### Prompt de identidade visual
**Adaptar.** Útil para marcas novas; em MotoristaOPS serve apenas para auditoria/extensão controlada.

### Prompt de análise de referência
**Adotar.** Entra como método oficial de decomposição, acrescido de transferência vs. conflito vs. hipótese.

### Prompt de vetor/logo por IA
**Rejeitar para MotoristaOPS.** A marca proíbe criar/redesenhar vetor/assinatura por IA generativa. Pode servir a projetos externos quando autorizado.

### Prompt de landing page
**Adotar com adaptação.** Acrescentar modularidade, acessibilidade, dados reais, responsividade, fonte da verdade e Brand Gate.

## 11. Antipadrões

Não aceitar como prompt final:

- “crie algo premium”;
- “use a identidade da marca” sem anexar/consultar a fonte da verdade;
- “faça parecido com esta referência” sem decomposição;
- “gere um logo” para MotoristaOPS;
- “faça viral” sem objetivo, público ou métrica;
- “faça um carrossel” sem definir narrativa;
- “crie uma landing de alta conversão” sem tarefa, origem de tráfego e evidência;
- “use IA para melhorar” sem critério de melhoria.

## 12. Regra final

**Prompt bom não compensa sistema ruim; sistema bom não compensa briefing vago.**

O orquestrador deve transformar pedidos soltos em contratos PACIF+RV antes da execução quando a complexidade justificar.


## 13. Mídia generativa: estrutura visual

Para prompts de imagem, complementar PACIF+RV com uma descrição visual em sete blocos:

1. **Sujeito** — o que existe na cena.
2. **Composição** — enquadramento, perspectiva, distância e área negativa.
3. **Tratamento visual** — fotografia/ilustração, materialidade e nível de realismo.
4. **Luz e atmosfera** — hora, fonte de luz, contraste e humor.
5. **Pista narrativa** — o que está acontecendo sem transformar o prompt em roteiro longo.
6. **Restrições negativas** — o que deve estar ausente.
7. **Output** — proporção, resolução, continuidade e uso posterior.

Para MotoristaOPS, a mídia deve reservar área para a composição determinística quando texto/CTA/assinatura forem adicionados depois.

Consultar `REFERENCE_INTAKE_PROTOCOL.md` quando a geração parte de uma referência externa.
