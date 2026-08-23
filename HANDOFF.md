# MotoristaOps — Handoff

## Estado atual

A `main` contém a arquitetura canônica de publicação por domínios próprios:

- `www.motoristaops.com.br` publica somente a Landing Page pública;
- `dashboard.motoristaops.com.br` publica o dashboard operacional;
- o build canônico é gerado por `npm run build:domains`;
- o deploy autorizado é `.github/workflows/deploy-domains-hostinger.yml`.

Os workflows legados de GitHub Pages e de publicação integral em Hostinger foram aposentados em 23/08/2026 por risco de exposição do build operacional completo.

## Branch ativa

`main`

## Autoridade de publicação

Somente `.github/workflows/deploy-domains-hostinger.yml` deve publicar produção. Novos caminhos de deploy precisam preservar explicitamente a separação entre artefato público (`dist-public`) e operacional (`dist-dashboard`).

## Privacidade e dados

O dataset operacional ainda existe no repositório e é consumido pelo dashboard. Não publicar esse dataset no artefato público da Landing Page. A próxima correção estrutural de privacidade deve mover os dados operacionais para uma fonte privada/autenticada antes de removê-los do repositório público, evitando quebra do dashboard.

## Próximo ciclo técnico

1. Migrar o dataset operacional para armazenamento privado/autenticado.
2. Remover `public/data/motoristaops.json` e demais duplicações públicas após a migração.
3. Garantir autenticação/autorização no dashboard antes de considerar os dados privados.
4. Manter `domain-builds.yml` como gate de separação de artefatos.
5. Aplicar branch protection/ruleset e required checks em `main` assim que a configuração estiver disponível pela superfície administrativa.

## PRs superseded

- PR #18 (`feat/dashboard-strategic-intelligence`) foi fechada sem merge em 23/08/2026 porque sua base ficou anterior ao estado canônico atual. Qualquer conteúdo útil deve ser reconciliado a partir de `main`.

## Critério de retomada

Antes de editar publicação, dados ou infraestrutura, validar que nenhum artefato público contém rotas operacionais ou dados financeiros reais e executar os gates de qualidade existentes.
