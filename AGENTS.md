# MotoristaOPS V2 — AGENTS

## Regra zero
MotoristaOPS V2 é um projeto limpo e sequencial. Não importar código, dependências, componentes, configurações, layouts ou decisões da V1 sem passar pelo estágio apropriado do ciclo oficial.

## Autoridade por estágio
1. `PROJECT_LIFECYCLE.md` — define o estágio atual e o próximo permitido.
2. `project/00-INTENCAO.md` — intenção validada/em validação.
3. artefato do estágio atual em `project/`.
4. decisões explicitamente aprovadas pelo usuário.
5. Brand Book e assets oficiais quando a etapa visual os tornar aplicáveis.
6. contratos futuros (`PRODUCT.md`, `DESIGN.md`, `A11Y.md`, `specs/`) somente após seus estágios de ativação.

## Execução
- Orquestrador ativo em toda ação.
- Não pular estágios para ganhar velocidade.
- Não preencher documentação de etapas futuras por antecipação.
- Uma mudança por objetivo; mudanças cirúrgicas.
- Pensar antes de codar; simplicidade primeiro.
- Não inventar dados, conteúdo, features, identidade ou estrutura inexistente.
- Ambiguidade reversível pode ser resolvida com evidência; ambiguidade material ou irreversível deve permanecer explícita até decisão.
- Referências aconselham; nunca substituem contexto, Brand Book ou decisão aprovada.
- A V1 é histórico e fonte potencial, não autoridade automática.
- Não versionar cache, build, secrets, `.env`, temporários, prints descartáveis ou dados brutos sensíveis.
- Nunca trabalhar diretamente em `main`.

## Gate atual
Consultar `PROJECT_LIFECYCLE.md`. Nenhum executor pode assumir que um estágio futuro já está autorizado.
