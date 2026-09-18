# MotoristaOPS — Regras operacionais para agentes

## HenricoOPS + Brand Book V2 visual gate

For every MotoristaOPS visual request, the executor must resolve these sources before production:

1. current HenricoOPS governance;
2. `VISUAL_LOCK.json`;
3. `DESIGN.md`;
4. `design/tokens.json`;
5. `source/ICONOGRAPHY.md` when iconography is in scope;
6. exact official assets and applicable approved baseline/Pattern Master.

Brand Book V2 decisions effective 2026-09-18 are the current brand authority. Brand Book V12 is historical support only where V2 is silent and non-conflicting.

Normal visual production requires `VISUAL_LOCK.status = READY`. Otherwise fail closed and reconcile the visual foundation first.

### Locked brand rendering

Do not ask a free-form image/video generator to synthesize the MotoristaOPS logo, wordmark, crest, signature, final branded typography, QR code or other protected identity layer.

Use generative tooling only for explicitly unlocked photography/illustration/atmosphere. Compose locked brand layers deterministically from the official assets and tokens.

If the active renderer cannot ingest the exact official asset, do not approximate it. Split the workflow into generative media + deterministic composition. If deterministic composition is unavailable, report the output as blocked/partial instead of inventing a branded substitute.

Starting from a generic/blank template, Canva-like default aesthetic or provider-native style is not an acceptable MotoristaOPS workflow.

### Point of view

The passenger/service/context is the center of the brand communication. Henrico is the discreet operator behind the experience and should not become the default visual protagonist.

## Acesso direto pelo chat

Este repositório deve ser operado diretamente por agentes conectados ao GitHub sempre que o conector estiver disponível. Para mudanças normais no projeto, não pedir ao usuário para baixar ZIP, editar arquivos manualmente, subir arquivos no painel da Hostinger ou fazer upload por FTP/SFTP.

Fluxo padrão:
1. Ler o estado atual do repositório pelo conector GitHub.
2. Editar os arquivos do projeto diretamente no GitHub.
3. Criar commit com mensagem clara.
4. Deixar o GitHub Actions publicar a landing na Hostinger usando os secrets já configurados.
5. Validar o domínio público e o dashboard após o deploy.
6. Só declarar conclusão depois dos gates de produção passarem.

Se o conector GitHub falhar, ou se os secrets de deploy estiverem ausentes, reportar a falha concreta. Não assumir genericamente que não há acesso.

## Produção pública

Landing oficial: https://www.motoristaops.com.br/

Workflow principal de deploy:
`.github/workflows/deploy-landing-hostinger.yml`

O workflow usa os secrets de produção já cadastrados:
- `HOSTINGER_HOST`
- `HOSTINGER_USERNAME`
- `HOSTINGER_PASSWORD`
- `HOSTINGER_PORT`
- `HOSTINGER_PUBLIC_TARGET_DIR`

A Hostinger deve ser tratada como destino de deploy. O GitHub é a superfície de edição e versionamento.

## Dashboard — invariante crítico

Dashboard oficial: https://dashboard.motoristaops.com.br/

O dashboard deve permanecer sempre. Nunca apagar, esvaziar, substituir ou incluir o diretório do dashboard em deploys da landing.

A landing e o dashboard são superfícies isoladas. O workflow da landing pode usar somente `HOSTINGER_PUBLIC_TARGET_DIR` e nunca deve acessar o target do dashboard.

O dashboard pode ser atualizado ou validado por fluxo dedicado, mas nunca removido como consequência de mudanças na landing.

## Estratégia de mudança

Mudanças pequenas e reversíveis de texto, links, telefone, SEO ou ajustes visuais cirúrgicos podem ir diretamente para `main`, desde que o deploy possua validação pós-publicação.

Mudanças estruturais, refactors grandes, novas páginas ou alterações com risco visual/material devem preferir branch de trabalho ou ambiente `/temp`, validação visual e promoção posterior.

## Gates mínimos de produção

Após todo deploy público, validar no mínimo:
- landing HTTP 200;
- conteúdo esperado da alteração;
- assets críticos HTTP 200;
- canonical/SEO quando afetados;
- ausência de `noindex` e referências `/temp/`;
- dashboard HTTP 200 e conteúdo operacional intacto.

## Fonte visual

Não substituir silenciosamente assets aprovados por versões antigas, fallbacks ou arquivos de backup. Hero, logo, perfil e iconografia precisam usar a versão aprovada e versionada para o release corrente.
