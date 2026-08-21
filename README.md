# MotoristaOps

Ecossistema do MotoristaOps, com uma frente pública para apresentação e conversão do serviço de motorista e uma frente operacional para gestão financeira, acompanhamento e decisão.

## Arquitetura do produto

- Landing Page pública: `https://www.motoristaops.com.br/`
- Dashboard operacional: `https://dashboard.motoristaops.com.br/`
- Domínio raiz: `https://motoristaops.com.br/` → redirecionamento permanente para `https://www.motoristaops.com.br/`

Durante a migração, o GitHub Pages permanece como origem legada/fallback e não deve ser tratado como endereço canônico final.

## Stack

- Astro Framework
- TypeScript
- CSS próprio
- Dados estáticos versionados em `src/data/motoristaops.ts`
- Pipeline Excel → JSON → validação → build → hospedagem

## Comandos

```bash
npm install
npm run dev
npm run sync:data
npm run validate:data
npm run build
npm run quality
```

## Regra operacional

Todo fechamento diário deve atualizar duas frentes obrigatórias:

1. Google Sheets MotoristaOps.
2. Dashboard MotoristaOps publicado.

Sem essa dupla validação, o fechamento fica incompleto.

## Nome canônico

- Produto: `MotoristaOps`
- Repositório: `henrico-design-amaral/motoristaops`
- Site público: `https://www.motoristaops.com.br/`
- Dashboard: `https://dashboard.motoristaops.com.br/`

## Migração de domínio

A arquitetura final separa a presença pública da operação sem separar a fonte de verdade do código. O plano de migração está documentado em `docs/domain-migration.md`.

A sequência obrigatória é: arquitetura → builds separados → deploy e validação → DNS/SSL → redirecionamentos legados. Nenhuma alteração de DNS deve acontecer antes dos dois destinos estarem publicados e validados.
