# MotoristaOPS V2 — AGENTS

## Regra zero
MotoristaOPS V2 é um projeto limpo. Não importar código, dependências, componentes, configurações, layouts ou decisões da V1 sem uma spec explícita de migração e validação.

## Ordem obrigatória
1. `PRODUCT.md`
2. `DESIGN.md` para qualquer trabalho visual
3. `A11Y.md`
4. spec ativa em `specs/`
5. decisões explicitamente aprovadas e Brand Book oficial

## Execução
- Orquestrador ativo em toda ação.
- Uma mudança por objetivo; mudanças cirúrgicas.
- Fluxo: spec -> plan -> tasks -> implement -> converge.
- Pensar antes de codar; simplicidade primeiro.
- Ambiguidade reversível pode ser resolvida com evidência; ambiguidade material ou irreversível deve ser escalada.
- Não inventar dados, conteúdo, features, identidade ou estrutura inexistente.
- Referências externas podem aconselhar; nunca substituem contexto, Brand Book, DESIGN.md ou decisão aprovada.
- Não versionar cache, build, secrets, `.env`, temporários, prints descartáveis ou dados brutos sensíveis.
- Nunca trabalhar diretamente em `main`.
