# MotoristaOps — Migração de domínio

## Objetivo

Migrar o MotoristaOps da estrutura atual em GitHub Pages para a arquitetura definitiva em `motoristaops.com.br`, separando a Landing Page pública do Dashboard operacional sem interromper o serviço existente.

## Estado atual

- Dashboard operacional: `https://henrico-design-amaral.github.io/motoristaops/`
- Landing Page pública: `https://henrico-design-amaral.github.io/motoristaops/motorista/`
- Build atual: único artefato Astro com `BASE_PATH=/motoristaops` no GitHub Pages.
- Deploy Hostinger existente: único `dist`, atualmente configurado para `https://motoristaops.henrico.works`.

## Estado alvo

- `https://www.motoristaops.com.br/` → Landing Page pública.
- `https://motoristaops.com.br/` → redirect 301 para `https://www.motoristaops.com.br/`.
- `https://dashboard.motoristaops.com.br/` → Dashboard operacional.

### Rotas operacionais esperadas

O Dashboard deve preservar, entre outras, as rotas:

- `/`
- `/transito/`
- `/previsao/`
- `/inteligencia/`
- `/contexto/`
- `/fechamento/`
- `/importar-uber/`
- `/copiloto/`
- `/fontes-contexto/`

## Princípios da migração

1. Nenhum DNS é alterado antes dos novos destinos estarem publicados e validados.
2. Landing Page e Dashboard terão ciclos de deploy independentes.
3. O repositório continua sendo a fonte de verdade única nesta fase.
4. GitHub Pages permanece disponível durante a janela de estabilização.
5. A migração precisa ter rollback simples e documentado.
6. Nenhum redesign entra no mesmo ciclo da mudança de infraestrutura.
7. Mudanças funcionais do Dashboard ficam fora do escopo da migração.
8. HTTPS válido é critério de entrada para o cutover.
9. URLs canônicas, assets e links internos devem deixar de depender de `/motoristaops` no ambiente final.

## Fases

### Fase 0 — Governança

Status: em execução neste PR.

Entregas:

- registrar os domínios canônicos;
- remover `motorista.henrico.works` e `motoristaops.henrico.works` da posição de destinos finais;
- documentar sequência, critérios de entrada/saída e rollback;
- não alterar código funcional, build, deploy ou DNS.

Critério de saída:

- documentação revisada e mergeada em `main`.

### Fase 1 — Separação de build

Objetivo:

Produzir dois artefatos independentes a partir do mesmo repositório.

Artefatos desejados:

- `dist-public/` → Landing Page;
- `dist-dashboard/` → Dashboard e módulos operacionais.

Critérios:

- nenhum dos dois builds pode depender de `BASE_PATH=/motoristaops`;
- Landing Page deve responder em `/` no artefato público;
- Dashboard deve responder em `/` no artefato operacional;
- nenhum artefato deve vazar rotas específicas da outra frente sem decisão explícita;
- `npm run quality` precisa permanecer verde.

### Fase 2 — Deploy independente

Objetivo:

Criar dois destinos de hospedagem independentes, ainda sem alteração do DNS público.

Deploy público:

- `SITE_URL=https://www.motoristaops.com.br`
- destino de hospedagem próprio para Landing Page.

Deploy operacional:

- `SITE_URL=https://dashboard.motoristaops.com.br`
- destino de hospedagem próprio para Dashboard.

Cada deploy precisa ter:

- validação de dados quando aplicável;
- análise estática;
- security gate;
- build;
- verificação do artefato;
- smoke test do destino publicado.

### Fase 3 — Pré-cutover

Validar antes de alterar DNS:

#### Landing Page

- `/` carrega sem erro;
- assets 200;
- nenhuma dependência de `/motorista/` para a home final;
- WhatsApp funciona;
- links internos funcionam;
- favicon, metadata e canonical corretos;
- desktop e mobile validados;
- HTTPS válido.

#### Dashboard

- `/` carrega;
- rotas operacionais críticas carregam;
- links de navegação funcionam;
- dados e assets carregam;
- fechamento continua acessível;
- importação continua acessível;
- nenhuma dependência de `/motoristaops` permanece nas URLs de produção;
- HTTPS válido.

### Fase 4 — DNS e SSL

Somente após a Fase 3 passar:

- apontar `www.motoristaops.com.br` para a Landing Page;
- apontar `dashboard.motoristaops.com.br` para o Dashboard;
- configurar `motoristaops.com.br` para redirect 301 a `www.motoristaops.com.br`;
- confirmar certificado TLS válido nos três hosts;
- repetir smoke tests usando os domínios públicos.

Os valores exatos de A/CNAME/target só serão definidos depois da inspeção da infraestrutura real de hospedagem. Não registrar valores presumidos.

### Fase 5 — Estabilização

Durante a janela de estabilização:

- manter GitHub Pages disponível;
- monitorar erros de assets e navegação;
- validar conversão da Landing Page;
- validar uso real do Dashboard;
- conferir links externos e QR Codes antes de atualizar materiais físicos.

### Fase 6 — Redirecionamentos legados

Após estabilidade:

- antiga Landing `/motorista/` → `https://www.motoristaops.com.br/`;
- antiga raiz operacional do GitHub Pages → `https://dashboard.motoristaops.com.br/`, quando tecnicamente apropriado e sem perder o fallback antes da hora;
- atualizar documentos, QR Codes e canais externos gradualmente.

## Rollback

Se o cutover apresentar regressão crítica:

1. restaurar os registros DNS anteriores ou remover temporariamente os novos apontamentos;
2. manter GitHub Pages como origem de acesso conhecida;
3. não apagar o último artefato estável da hospedagem;
4. corrigir a falha em nova branch/PR;
5. repetir pré-cutover antes de uma nova tentativa.

## Não faz parte deste ciclo

- redesign da Landing Page;
- redesign do Dashboard;
- alterações nos cálculos ou dados operacionais;
- autenticação definitiva do Dashboard;
- troca de repositório;
- migração de banco de dados;
- alteração de QR Codes físicos antes do domínio final estar estabilizado.

## Próximo PR após esta governança

Branch sugerida:

`chore/split-public-dashboard-builds`

Escopo:

- implementar a separação dos builds;
- preparar deploys independentes;
- manter GitHub Pages funcional como fallback;
- executar validação técnica antes de qualquer mudança de DNS.
