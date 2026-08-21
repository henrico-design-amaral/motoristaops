# MotoristaOps — Migração de domínio

## Objetivo

Migrar o MotoristaOps da estrutura legada em GitHub Pages para a arquitetura definitiva em `motoristaops.com.br`, separando a Landing Page pública do Dashboard operacional sem interromper o serviço existente.

## Estado atual — cutover concluído

Produção canônica ativa e validada em 21/08/2026:

- Landing Page pública: `https://www.motoristaops.com.br/`
- Domínio raiz: `https://motoristaops.com.br/` → HTTP 301 para `https://www.motoristaops.com.br/`
- Dashboard operacional: `https://dashboard.motoristaops.com.br/`
- Build canônico separado em `dist-public/` e `dist-dashboard/`
- Deploy Hostinger realizado por SFTP com destinos independentes
- Smoke test canônico passou na primeira tentativa após o cutover
- GitHub Pages permanece disponível apenas como fallback/rollback durante a janela de estabilização

Legado preservado temporariamente:

- Dashboard legado: `https://henrico-design-amaral.github.io/motoristaops/`
- Landing Page legada: `https://henrico-design-amaral.github.io/motoristaops/motorista/`

## Arquitetura definitiva

- `https://www.motoristaops.com.br/` → Landing Page pública.
- `https://motoristaops.com.br/` → redirect 301 para `https://www.motoristaops.com.br/`.
- `https://dashboard.motoristaops.com.br/` → Dashboard operacional.

### Rotas operacionais esperadas

O Dashboard preserva, entre outras, as rotas:

- `/`
- `/transito/`
- `/previsao/`
- `/inteligencia/`
- `/contexto/`
- `/fechamento/`
- `/importar-uber/`
- `/copiloto/`
- `/fontes-contexto/`

## Fases e status

### Fase 0 — Governança

Status: concluída.

- domínios canônicos registrados;
- destinos antigos em `henrico.works` removidos da posição canônica;
- sequência, critérios e rollback documentados.

### Fase 1 — Separação de build

Status: concluída.

Artefatos:

- `dist-public/` → Landing Page;
- `dist-dashboard/` → Dashboard e módulos operacionais.

O ambiente canônico usa `BASE_PATH=/` e não depende mais de `/motoristaops`.

### Fase 2 — Deploy independente

Status: concluída.

Destinos Hostinger:

- Landing Page → `/home/u326975256/domains/motoristaops.com.br/public_html`
- Dashboard → `/home/u326975256/domains/dashboard.motoristaops.com.br/public_html`

O workflow `deploy-domains-hostinger.yml` permanece manual por `workflow_dispatch` e valida dados, análise estática, segurança, build, artefatos, SFTP e smoke test.

### Fase 3 — Pré-cutover

Status: concluída.

Validado:

- HTTPS nos hosts canônicos;
- Landing Page em `/`;
- Dashboard em `/`;
- rota `/fechamento/`;
- separação física dos artefatos;
- ausência de dependência de `/motorista/` e `/motoristaops` nos destinos canônicos.

### Fase 4 — DNS, SSL e canonicalização

Status: concluída.

- `www.motoristaops.com.br` ativo para a Landing Page;
- `dashboard.motoristaops.com.br` ativo para o Dashboard;
- `motoristaops.com.br` responde com HTTP 301 para `https://www.motoristaops.com.br/`;
- TLS válido nos hosts;
- canonicalização versionada no artefato público via `.htaccess`;
- smoke test confirma conteúdo e redirect em produção.

### Fase 5 — Estabilização

Status: em andamento.

Durante esta janela:

- manter GitHub Pages disponível;
- monitorar erros de assets e navegação;
- validar conversão da Landing Page;
- validar uso real do Dashboard;
- conferir links externos e QR Codes antes de atualizar materiais físicos;
- não remover o legado enquanto não houver estabilidade comprovada.

### Fase 6 — Redirecionamentos legados

Status: pendente deliberadamente.

Após a janela de estabilização:

- antiga Landing `/motorista/` → `https://www.motoristaops.com.br/`;
- antiga raiz operacional do GitHub Pages → `https://dashboard.motoristaops.com.br/`, quando tecnicamente apropriado;
- atualizar documentos, QR Codes e canais externos gradualmente;
- somente então avaliar retirada do fallback legado.

## Rollback

Se produção apresentar regressão crítica durante estabilização:

1. GitHub Pages permanece como origem conhecida de fallback;
2. não apagar os artefatos estáveis atuais da Hostinger;
3. corrigir a falha em nova branch/PR;
4. repetir build, validação e smoke tests;
5. redeploy canônico apenas após o gate voltar a ficar verde.

## Evidência do cutover

Execuções relevantes:

- primeiro deploy canônico: GitHub Actions run `32508836735` — sucesso;
- deploy com canonicalização 301: GitHub Actions run `32509551416` — sucesso;
- smoke test final passou na primeira tentativa, validando Landing, Dashboard, `/fechamento/` e redirect 301 do domínio raiz.

## Não faz parte deste ciclo

- redesign da Landing Page;
- redesign do Dashboard;
- alterações nos cálculos ou dados operacionais;
- autenticação definitiva do Dashboard;
- troca de repositório;
- migração de banco de dados;
- retirada imediata do GitHub Pages;
- alteração de QR Codes físicos antes da estabilização.

## Próximo marco

Encerrar a janela de estabilização com validação real de navegação, uso e conversão. Só depois executar a Fase 6 e atualizar links legados/QR Codes externos.