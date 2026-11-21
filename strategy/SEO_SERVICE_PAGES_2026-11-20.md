# MotoristaOPS — páginas de aquisição SEO (2026-11-20)

Status: PUBLICADO COM QA TÉCNICO PASS; QA VISUAL E ANALYTICS REAL PENDENTES.

## Autoridade e limites
- Direção: posicionamento executivo aprovado, Brand Book V2, DESIGN.md, VISUAL_LOCK.json e estratégia de 13/11/2026.
- Instrução atual: adicionar páginas sem alterar o conteúdo, o desenho ou a lógica da página principal.
- Não criar novos logos, retratos ou veículos sintéticos. Usar apenas o asset já publicado.
- Não anunciar disponibilidade, preço, capacidade de parceiro ou promessa de atendimento 24h sem confirmação.

## Páginas
- https://www.motoristaops.com.br/servicos/transfer-aeroportos/
- https://www.motoristaops.com.br/servicos/transporte-corporativo/
- https://www.motoristaops.com.br/servicos/motorista-por-hora/
- https://www.motoristaops.com.br/servicos/transporte-eventos/

Cada página tem intenção de busca própria, conteúdo verificável, URL canônica, dados estruturados Organization/Service/WebPage/BreadcrumbList, navegação entre serviços, perguntas frequentes e WhatsApp com mensagem não enviada automaticamente.

## Construção
- Fonte: `source/landing/scripts/seo-pages.mjs`.
- Rastreamento nas páginas adicionais: `source/landing/scripts/service-tracking.js`.
- `npm run build` pré-renderiza as quatro páginas em `dist/servicos/...`, as inclui no manifesto SHA-256 e atualiza sitemap.xml, preservando o SSR existente da home PT/EN/ES.
- O deploy Hostinger copia `dist/servicos/` antes de publicar sitemap; sem delete remoto nessa pasta. O verificador atual confere arquivos do manifesto publicados por SHA-256.
- `seo-pages-ci.yml` e os workflows existentes rodaram no PR #151 com sucesso; o deploy canônico continuou em `deploy-landing-hostinger.yml` ao integrar `main`.

## Medição e limites
- A homepage já possui GA4 `G-ZQZ76XPPLP` e evento consentido `whatsapp_click`; fontes atuais de `App.jsx`, `TripForm.jsx`, `Privacy.jsx` e `analytics.mjs` ficam intocadas.
- Páginas adicionais usam a mesma preferência explícita `motoristaops.analytics`, com evento `whatsapp_click`, parâmetro não pessoal `service_slug` e `cta_location=pagina_servico`.
- O evento mede clique para abrir o WhatsApp, não entrega de mensagem, orçamento recebido, lead qualificado ou reserva confirmada.
- Sem instalação de tag Google Ads, sem alteração de `ad_storage` nem autorização silenciosa de finalidade publicitária. Vincular GA4 a Google Ads, confirmar a conta, configurar conversões e validar em Tag Assistant/DebugView dependem de acesso autenticado e aceite do plano de mídia.
- Google Ads conta informada pelo operador: 679-367-7323. Existência, acesso e campanhas não foram verificados nesta execução.

## Evidências de publicação e aceitação técnica
- Pull request #151 integrado à main: commit `6fca066e01c9ea8116268b2160f7f72ea057fc5f`.
- CI no PR: MotoristaOPS Foundation Gate, Validate MotoristaOPS landing e Verify MotoristaOPS SEO service pages com resultado success. 25 testes da landing passaram após ajuste aditivo do teste do sitemap.
- Publicação: GitHub Actions `Deploy MotoristaOPS landing only` run #62 (44855122065), job deploy-landing status success, inclusive instalação, build, testes, cópia SFTP e verificação pós-publicação por hash.
- Verificação independente pós-publicação: quatro URLs de `/servicos/` responderam HTTP 200 com title/H1/canonical próprios, links de contato e JSON-LD; sitemap.xml respondeu HTTP 200 com sete URLs; a home respondeu HTTP 200 com o H1 e canonical anteriores.
- `source/landing/index.html`, `src/App.jsx`, `src/Privacy.jsx`, `src/TripForm.jsx` e `src/analytics.mjs` não foram alterados na PR; gate CI confirmou.
- O sucesso técnico não substitui inspeção visual detalhada em dispositivos nem comprova disparo real da tag no Google Analytics.

## Pendências
- QA visual das quatro páginas em mobile e desktop: captura disponível para consulta, mas render não inspecionado integralmente nesta execução. Estado PENDENTE.
- Validar em navegador/Tag Assistant/GA4 DebugView o evento consentido do botão de WhatsApp. PENDENTE.
- Search Console: confirmar indexação das páginas, enviar sitemap atualizado, medir consultas, impressões e cliques. PENDENTE.
- Google Ads: conectar a fonte de dados e confirmar a conta 679-367-7323, analisar campanha inteligente existente antes de criar outra. Orçamento/veiculação condicionados à aprovação específica. PENDENTE.
