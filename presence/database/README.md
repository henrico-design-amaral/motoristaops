# Banco — MotoristaOPS Presença

## Status

O banco canônico é PostgreSQL.

O projeto Supabase existente `motoristaops` foi localizado, porém está **INACTIVE** em 26/09/2026. Nenhuma alteração foi aplicada nele neste bootstrap.

## Arquivos

- `schema.sql` — schema canônico de desenvolvimento, ainda não aplicado.
- A migration oficial deverá ser gerada somente depois que existir um ambiente PostgreSQL/Supabase ativo e validado.
- Não criar migration manual com timestamp inventado.

## Regras

1. Todas as tabelas expostas no schema `public` usam RLS.
2. Estado crítico de pedido não é mutável pelo cliente.
3. Custos, estoque e credenciais ficam em schema `internal`.
4. Tokens OAuth não devem ser armazenados em tabelas públicas.
5. Google Business guarda apenas metadados públicos de conexão no schema `public`; credenciais reais devem apontar para armazenamento secreto.
6. Skills e agentes não escrevem estado crítico sem passar pelas regras do backend/banco.
7. Layout e impressos usam templates versionados; banco guarda dados e versões, não interpretação visual.

## Validação

O CI do repositório deve subir PostgreSQL efêmero, criar stubs mínimos de Supabase Auth e executar `schema.sql`.

Isso valida sintaxe e dependências relacionais sem tocar produção.

## Próxima etapa de banco

Quando o projeto Supabase for reativado:

1. verificar changelog/documentação vigente;
2. inspecionar schema existente;
3. rodar advisors;
4. aplicar schema em ambiente de desenvolvimento;
5. testar RLS com usuário A, usuário B e anon;
6. gerar migration oficial;
7. só depois considerar produção.
