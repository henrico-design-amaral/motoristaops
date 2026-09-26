# Web — MotoristaOPS Presença

## Status

Scaffold não publicado.

Nenhuma destas páginas está conectada ao Supabase ou incluída no deploy da raiz.

## Superfícies

- `presenca/index.html` — landing comercial.
- `painel/index.html` — entrada do painel; autenticação ainda desabilitada.
- `../templates/landing/driver-standard-v1.html` — primeiro contrato visual determinístico de página pública.
- `assets/presence.css` — camada visual inicial subordinada ao Brand System V2.

## Gate para ativar Auth

Antes de habilitar login:

1. reativar ou criar ambiente Supabase seguro;
2. inspecionar schema existente;
3. aplicar schema em desenvolvimento;
4. configurar Google provider;
5. configurar redirect allowlist;
6. implementar callback;
7. validar RLS;
8. somente então habilitar o botão Google.

## Gate para publicar

O workflow atual da raiz usa sincronização destrutiva do bundle público. As superfícies Presence só entram em produção depois que o pipeline for adaptado para incluí-las explicitamente.
