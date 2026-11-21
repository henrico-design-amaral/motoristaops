# MotoristaOPS — páginas de aquisição SEO (2026-11-20)

Status: IMPLEMENTADO NA BRANCH; produção depende de merge e verificação pública.

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
- `seo-pages-ci.yml` compila/testa a branch sem deploy; o workflow canônico de publicação continua sendo `deploy-landing-hostinger.yml` ao integrar `main`.

## Medição e limites
- A homepage já possui GA4 `G-ZQZ76XPPLP` e evento consentido `whatsapp_click`; fontes atuais de `App.jsx`, `TripForm.jsx`, `Privacy.jsx` e `analytics.mjs` ficam intocadas.
- Páginas adicionais usam a mesma preferência explícita `motoristaops.analytics`, com evento `whatsapp_click`, parâmetro não pessoal `service_slug` e `cta_location=pagina_servico`.
- O evento mede clique para abrir o WhatsApp, não entrega de mensagem, orçamento recebido, lead qualificado ou reserva confirmada.
- Sem instalação de tag Google Ads, sem alteração de `ad_storage` nem autorização silenciosa de finalidade publicitária. Vincular GA4 a Google Ads, confirmar a conta, configurar conversões e validar em Tag Assistant/DebugView dependem de acesso autenticado e aceite do plano de mídia.
- Google Ads conta informada pelo operador: 679-367-7323. Existência, acesso e campanhas não foram verificados nesta execução.

## Validação pendente
- Testes GitHub Actions em pull request; teste de entrega pública após merge.
- Search Console: indexação das páginas, sitemap, consultas, impressões, cliques.
- Google Ads: confirmar a conta e evitar campanha duplicada antes de ativar. Orçamento/publicação de anúncios condicionados à aprovação do valor.
- QA visual das quatro páginas em mobile/desktop e teste consentido do clique no navegador.
