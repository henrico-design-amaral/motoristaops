# MotoristaOPS V2 — SOURCES

Status: ACTIVE CONTRACT
Purpose: mapear fontes e impedir que memória de chat, V1 ou artefatos experimentais assumam autoridade por conveniência.

## Ordem de autoridade
1. decisão explícita atual do usuário;
2. `PROJECT_LIFECYCLE.md` + gates validados do projeto;
3. definição/PDR/estratégia atuais;
4. Brand Book V12 + assets oficiais;
5. contratos executáveis ativos da V2;
6. referências específicas homologadas do MotoristaOPS;
7. referências globais homologadas do ecossistema;
8. V1 apenas como histórico/migração controlada.

## Drive canônico — Project Core
Pasta: `MotoristaOPS_V2 / 00_PROJECT_CORE`.

Documentos de gate existentes:
- 00 INTENÇÃO;
- 01 DEFINIÇÃO DO PROJETO;
- 02 PDR;
- 03 PROJECT BASE PACK;
- 04 LEVEL 0;
- 05 REFERÊNCIAS;
- 06 PROTOCOLOS;
- 07 PLANO / SPEC / WORK SESSION;
- 08 ESTRATÉGIA + CONTRATOS;
- 09 PRODUÇÃO — STATUS.

Quando houver conflito entre um arquivo local desatualizado e um gate validado mais recente no Drive, corrigir o contrato versionado antes de prosseguir.

## Brand e identidade
Autoridade humana soberana:
- Brand Book V12 fornecido no projeto;
- `LogoOficial` e variações oficiais existentes no Brand Book;
- assets oficiais nunca devem ser redesenhados por IA quando o original existe.

## Assets reais
Fontes de realidade física atualmente disponíveis:
- retratos pessoais aprováveis: `perfil-normal`, `perfil-portfolio`, `perfil-sério`;
- fotos reais do HB20 preto atual;
- foto real do interior;
- demais imagens documentais aprovadas pelo usuário.

Regras:
- veículo gerado não pode substituir o HB20 real como prova;
- placa e dados identificáveis não são publicados legíveis;
- retrato de Henrico não é âncora principal da Hero atual.

## Referências
- Acervo específico `MotoristaOps_Refs` no Google Drive: repertório/benchmark, não autoridade de identidade.
- Stage 5 já classificou identidade antiga, selo, tipografia, dourado metálico e claims históricos como REJECT/ARCHIVE; disciplina de aplicação, touchpoints e hierarquia podem ser ADAPT.

## Código e governança versionada
Repositório: `henrico-design-amaral/motoristaops`.
Linha V2: `v2/bootstrap-clean` durante a convergência atual.

GitHub é fonte de verdade para código e contratos versionados. Drive é fonte complementar para gates humanos, materiais, assets e referências deliberadamente mantidos fora do Git.

## Dados públicos voláteis
`specs/landing-data-registry-v0.1.md` governa contatos, reviews, rating, região, links e dados legais.

Qualquer campo `BLOCKED` ou `VERIFY-AT-RELEASE` não entra em produção sem evidência atual. Placeholder de layout não vira dado público.

## V1
V1 pode fornecer: aprendizado, ativos oficiais, evidências reais, decisões ainda válidas e anti-referências.
V1 não fornece automaticamente: stack, código, arquitetura, componentes, layout, contato, métricas ou políticas.

Toda migração usa uma das classes: `KEEP`, `ADAPT`, `RESEARCH`, `REJECT`, `ARCHIVE`.
