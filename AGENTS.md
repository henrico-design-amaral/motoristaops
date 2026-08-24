# MotoristaOps — Agent Governance

## Fonte de verdade

A fonte de verdade é o repositório versionado + as autoridades atuais resolvidas pelo HenricoOPS. Chat, provider memory e auto-memory não substituem `PROJECT_CONTEXT.md`, `HANDOFF.md`, `TASKS.md`, `DECISIONS.md`, `DESIGN.md` nem os gates aplicáveis.

## Ordem obrigatória de leitura

1. `PROJECT_CONTROL.md`
2. `PROJECT_CONTEXT.md`
3. `AGENTS.md`
4. `HANDOFF.md`
5. `TASKS.md`
6. `DECISIONS.md`
7. `DESIGN.md`
8. `docs/orchestrator/LOOP_EXECUTION.md`
9. `package.json`

Claude/Claude Code também deve carregar `CLAUDE.md` como bootstrap próprio.

## Responsabilidades

- **Orchestrator**: resolve contexto, modalidade, estágio, escopo, capacidades e fechamento.
- **Implementation**: altera apenas arquivos autorizados pelo ciclo ativo.
- **QA**: executa validações aplicáveis, revisa diff e regressão.
- **Security/Data**: protege secrets, integridade, origem e fronteiras de dados.
- **Design Reviewer**: valida projeto visual atual, HVS como quality floor e fidelidade a artefatos aprovados.

Responsabilidades não exigem agentes separados quando uma execução única consegue manter os gates.

## Regras de execução

- Nunca trabalhar diretamente na `main`.
- Uma branch por objetivo; um PR por escopo.
- Não misturar governança e implementação funcional no mesmo PR.
- Resolver output modality e stage antes de executar.
- Não mudar modalidade silenciosamente.
- Não avançar de exploração para implementação, ou de implementação para publicação, sem autorização aplicável.
- Antes de trabalho visual, resolver `DESIGN.md` e a autoridade visual atual.
- Se houver artefato visual aprovado como base, declarar fidelidade e preservar anchors protegidos.
- HVS valida qualidade; não redefine a estética do projeto.
- O dashboard não exige autenticação por padrão conforme `DECISIONS.md`.
- Escrita padrão: `PROFESSIONAL` conforme HenricoOPS.
- Não versionar vídeos, prints temporários, dados brutos, `.env`, chaves, caches ou builds.
- Processamento de vídeo/OCR permanece local, salvo decisão explícita em `DECISIONS.md`.
- Toda importação exige revisão humana antes da persistência.
- Antes de concluir, mostrar evidências proporcionais ao escopo: diff, validações, resultado funcional/visual e estado Git/PR.
