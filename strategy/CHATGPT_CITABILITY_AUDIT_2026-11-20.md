# MotoristaOPS — Citabilidade em respostas de IA / ChatGPT Search

**Veredicto:** [Certo] sobre rastreamento permitido pelo robots e estrutura HTML publicada; [Desconhecido] sobre acesso real do OAI-SearchBot, indexação Google e frequência de citações no ChatGPT.
**Site:** https://www.motoristaops.com.br/
**Data:** 20/11/2026, America/Sao_Paulo.
**Executor:** HenricoOPS SEO Audit — ChatGPT conectado (independente do plugin Claude SEO local).
**Ação:** auditoria pública somente leitura; este registro é documentação, sem modificar site, home ou dashboard.
**Fontes canônicas:** `henrico-design-amaral/henricoops:BOOTSTRAP.md`, `orchestrator/CAPABILITY_ROUTER.md`, `governance/SEO_DISCOVERABILITY_METHOD.md`; `henrico-design-amaral/motoristaops:AGENTS.md`, `strategy/EXECUTIVE_REPOSITIONING_2026-11-13.md`, `source/landing/scripts/build.mjs`, `source/landing/index.html`, `source/landing/scripts/seo-pages.mjs`. HEAD da análise: `7a0f89fde577e78e42a6566bb5c51557e9f2f0c0`.
**Aquisição:** Firecrawl live (`maxAge=0`, `rawHtml`, `markdown`, `links`, `onlyMainContent=false`) das sete páginas do sitemap, robots e sitemap; revisão do build/prerender GitHub, pesquisa web de marca e termos não marcários; documentação oficial da OpenAI e Google.

## Resumo da elegibilidade

- As **sete** URLs em `https://www.motoristaops.com.br/sitemap.xml` responderam HTTP 200; títulos, descriptions, H1, canonical próprios e estrutura HTML visível.
- `https://www.motoristaops.com.br/robots.txt` respondeu 200 com:
  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://www.motoristaops.com.br/sitemap.xml
  ```
- **OAI-SearchBot é permitido pelo robots.txt**. A mesma regra também permite GPTBot; são finalidades distintas. Não foi confirmado por logs/firewall que o IP oficial de OAI-SearchBot seja aceito, nem rastreamento pelo agente em produção.
- `GPTBot` serve ao possível treinamento; `OAI-SearchBot` serve ao ChatGPT Search; `ChatGPT-User` atende ações específicas dos usuários. Permitir GPTBot não é condição de citações na busca.
- As quatro páginas de serviço são pré-renderizadas e servidas com conteúdo HTML. O build do site renderiza home PT/EN/ES via `src/entry-server.jsx` e insere o HTML na marca `<!--app-html-->`.
- Os títulos/descriptions e headings das páginas de serviço descrevem intenção local, área e modalidade.
- A homepage não contém hyperlinks HTML para qualquer uma das quatro URLs `/servicos/`, apesar de conter seções de serviço em âncoras e essas páginas estarem no sitemap; elas linkam umas para as outras.
- Sem autenticação observada em GSC/GA4/GBP neste runtime: o conector Windsor.ai disponível contém apenas Instagram. Rankings, indexação, desempenho e citações não foram medidos.
- Busca exploratória por termos amplos de transporte executivo em São Paulo destacou outros prestadores; buscas por marca localizaram presença social/diretórios. A amostra não demonstra posição no Google/ChatGPT nem desindexação.

## Inventário de páginas públicas

1. `/` (PT-BR): title `Transporte Executivo em São Paulo | MotoristaOPS`; H1 `Sua agenda merece uma condução à altura.`; JSON-LD `ImageObject, WebSite, WebPage, Service, Person`.
2. `/en/`: title `Executive Transport in São Paulo | MotoristaOPS`; hreflang recíproco.
3. `/es/`: title `Transporte ejecutivo en São Paulo | MotoristaOPS`; hreflang recíproco.
4. `/servicos/transfer-aeroportos/`: title `Transfer para Aeroportos em São Paulo | MotoristaOPS`.
5. `/servicos/transporte-corporativo/`: title `Transporte Executivo Corporativo | MotoristaOPS`.
6. `/servicos/motorista-por-hora/`: title `Motorista à Disposição por Hora | MotoristaOPS`.
7. `/servicos/transporte-eventos/`: title `Transporte para Eventos em São Paulo | MotoristaOPS`.

As quatro páginas de serviço têm `Organization, Service, WebPage, BreadcrumbList`, H1 contextual, três FAQs legíveis e crosslinks para as demais. O sitemap contém estas sete e somente estas sete entradas principais. A homepage possui uma seção de perguntas comuns em PT/EN/ES, além de uma entrada `details` do menu móvel.

## Checklist dos 20 requisitos — fato, lacuna e decisão

| # | Requisito | Observado em 20/11/2026 | Veredicto e ação |
|---|---|---|---|
| 01 | Robôs IA | `User-agent: *` + `Allow: /` cobre `OAI-SearchBot` e `GPTBot` no domínio `www` | **PASS de política / UNVERIFIED operacional**. Checar IPs oficiais e logs de 200/403/429 para `OAI-SearchBot`, sem presumir acesso pela resposta a outro crawler |
| 02 | robots.txt | 200, sintaxe simples, URL sitemap correta | **PASS**. Não há necessidade técnica de alterar apenas para inserir nome do bot; separar GPTBot somente se houver decisão de uso no treinamento |
| 03 | sitemap XML | 200, sete URLs canônicas, traduções `hreflang` apenas na home | **PASS**. `lastmod` ausente: opcional, usar somente data real da última alteração substancial |
| 04 | Dados estruturados | JSON-LD interpretável; `Person` provider na home e `Organization` provider nas páginas de serviço | **REVISAR P2**. Estabilizar `@id` e relações Organization–founder–Service, sem inventar endereço ou parceiros; testar com validator após implementação |
| 05 | HTML semântico | Todas páginas analisadas contêm `<main>`, `<header>`, `<nav>`, `<footer>`, títulos e âncoras | **PASS observacional**. Sem teste integral de teclado/leitor de tela |
| 06 | Títulos | Sete `<title>` específicos por idioma/serviço | **PASS**, manter próximos da intenção comercial |
| 07 | Meta description | Sete descrições explícitas por idioma/serviço | **PASS**, texto de snippet não é garantido |
| 08 | Canonical | Sete declarados para URL própria HTTPS www | **PASS de marcação**; Google pode selecionar outra URL, conferir GSC |
| 09 | Erros indexação | Sete URLs HTTP 200, `meta robots` indica `index`; nenhum `noindex` nas páginas | **UNVERIFIED indexação real**. Propriedade Search Console necessária para relatório Pages/URL Inspection, sitemap enviado, canonicals selecionados, cobertura e erros |
| 10 | HTML renderizado | `source/landing/scripts/build.mjs` executa SSR e prerender; o crawler recolheu textos completos nas sete páginas | **PASS**. Não depende apenas de React executando no browser |
| 11 | Headings | Cada página tem H1; títulos H1 das quatro páginas de serviço são descritivos | **OPORTUNIDADE P2**. H1 da home é editorial e não nomeia categoria/cidade, apesar do `<title>` adequado. Homepage bloqueada por instrução do operador |
| 12 | Perguntas comuns | FAQ visível na home e três perguntas em cada serviço | **PASS**. Melhorar respostas quando houver perguntas recorrentes reais não cobertas |
| 13 | Página de FAQ | Seção FAQ existente; `/faq/` respondeu HTTP 404 e não aparece no sitemap | **SEM DEFEITO**. Criar página central apenas se houver conteúdo diferente e demanda real; seção existente já atende perguntas |
| 14 | Fontes confiáveis | Links para Google Maps/avaliações, perfis sociais e site do responsável; não há referência editorial de guias públicos oficiais nas páginas de serviço | **OPORTUNIDADE P2**. Para conteúdos informativos, citar fontes primárias de aeroportos e órgãos oficiais com data de consulta; textos próprios do serviço não exigem citações acadêmicas |
| 15 | Autor | Home tem `meta author` Henrico Amaral, JSON-LD `Person`; páginas de serviço têm `Organization.founder` mas não byline | **PASS parcial**. Em futuros guias, assinatura de autor/revisor real com contexto; evitar inventar equipe |
| 16 | Publicação | Ausentes `datePublished` e `dateModified` nas sete páginas | **NÃO OBRIGATÓRIO** para páginas de serviço evergreen. Em guias/conteúdos datados, registrar data real visível e schema compatível |
| 17 | Conteúdo atualizado | Oferta atual comunica transporte executivo, Omoda cinza e veículos parceiros sob consulta. OG image alt da home ainda usa “motorista particular”, sem ser necessariamente incorreto | **OPORTUNIDADE P3**. Uniformizar linguagem de prévia social e conferir horários/condições nas fichas externas; não alterar datas artificialmente |
| 18 | Links internos | **0/4** links da homepage para novas páginas, apesar de crosslinks entre elas e sitemap | **ISSUE P1**. Preservar home; distribuir links oficiais em GBP, redes e outras superfícies autorizadas. Propor link contextual em futura versão de home somente com nova autorização |
| 19 | Pesquisa original | Não identificado relatório de pesquisa original nas sete páginas de serviço/idioma | **OPORTUNIDADE condicional**. Guias e evidência de serviço próprio (processo, checklist, fotos reais autorizadas) podem ser contribuição original; não produzir pesquisa ou estatística fictícia apenas para SEO |
| 20 | Visibilidade buscas | Consultas exploratórias de marca e serviços genéricos retornaram diretórios/redes sociais e concorrentes, sem medição de posição/referências ChatGPT | **UNVERIFIED em produção**. Medir GSC, consultas de prova padronizadas em ChatGPT Search, URLs citadas e tráfego de referência `utm_source=chatgpt.com` quando GA4 acessível |

### Observações adicionais fora dos 20 requisitos

- `https://www.motoristaops.com.br/llms.txt` retornou 404. **Não é requisito oficial de inclusão no ChatGPT Search.** Não criar esse arquivo como substituto de rastreamento, HTML ou conteúdo útil.
- Uma URL inexistente em `/faq/` retorna HTTP 404 real; isso é normal se não publicada.
- O dashboard `https://dashboard.motoristaops.com.br/` é superfície separada da presença pública. Auditoria anterior e rechecagens observaram título operacional em HTTP 200, sem `meta noindex` no HTML, e `robots.txt` do subdomínio em 404. Esse tema exige decisão de segurança/privacidade isolada, sem modificar o dashboard junto com SEO comercial. `X-Robots-Tag` por cabeçalho não foi verificado.
- O `og:image:alt` da homepage descreve “motorista particular em São Paulo”, enquanto o posicionamento comercial atual privilegia “transporte executivo”. O termo não é automaticamente incorreto, mas merece revisão de consistência sem alterar asset oficial.
- 19 de 24 imagens na homepage possuem `alt=""`. É permitido para imagens meramente decorativas; função individual e acessibilidade móvel não foram avaliadas, logo não declarar erro.

## Ordem proposta (sem alterar a homepage)

### P1 — Confirmar elegibilidade real e indexação

1. Em Hostinger/CDN/WAF, inspecionar tráfego `OAI-SearchBot`, autenticidade do user-agent por IPs oficiais e ausência de bloqueio, desafio/captcha e `429`. IPs oficiais: https://openai.com/searchbot.json. Registrar status dos GET para home e quatro serviços.
2. Conectar propriedade correta no Google Search Console, verificar inspeção das sete URLs, resultado do sitemap, canonical selecionado e consultas com impressões. Sem dados autenticados, não declarar indexação.
3. Usar canais existentes autorizados (Perfil da Empresa, LinkedIn, Instagram, propostas, links públicos reais) para apontar diretamente às páginas de serviço; a alteração da homepage segue bloqueada pelo operador.
4. Confirmar que `https://www.motoristaops.com.br/` consta no Perfil da Empresa, quando acesso autenticado permitir.

### P2 — Melhorar utilidade e credibilidade para respostas IA

1. Criar, após validação editorial/operacional, **um guia real** de transfer para GRU/CGH/VCP: dados de voo, localização exata de embarque, previsão de bagagens, espera/retorno, como receber confirmação; citar aeroporto/operador oficial quando informações de terminal forem publicadas.
2. Criar **um guia de contratação corporativa** ou perguntas sobre motorista por hora com base em processo efetivo: duração, paradas, orçamento, quem presta o serviço e como são indicados veículos parceiros. Distinguir serviço da operação de disponibilidade de parceiros.
3. Em novo conteúdo informativo, adicionar byline, data real publicada/atualizada, fontes oficiais pertinentes e evidências próprias, não depoimentos fictícios, preços inventados ou afirmação de frota própria.
4. Harmonizar IDs e relações Schema.org das entidades reais do site; manter o FAQ como conteúdo visível sem tratar `FAQPage` como requisito de citação. Google limita rich results de FAQ sobretudo a sites governamentais/de saúde conhecidos.

### Medição

Definir pequena série fixa de consultas sem mencionar marca, por exemplo:
- `Como contratar um transfer privativo para Congonhas em São Paulo?`
- `O que verificar ao reservar transporte executivo do aeroporto de Guarulhos?`
- `Como contratar motorista à disposição por hora em São Paulo?`
- `Como organizar o transporte de convidados para congresso em São Paulo?`

Por consulta, registrar **data, país, idioma, experiência ChatGPT Search, resposta/citações, URL citada e posição apenas se a própria interface retornar**, sem tratar amostras como taxa global de exposição. Acompanhar GSC (impressões/consultas/indexação) e referências GA4 por `utm_source=chatgpt.com` e origem, quando disponível. O tráfego de ChatGPT mede acesso por referência, **não todas as menções de marca**.

## Limites e fontes

- **Não testados:** solicitação vinda de IP real oficial de `OAI-SearchBot`; logs e bloqueios Hostinger/CDN; `X-Robots-Tag` por cabeçalhos; Search Console/GA4/GBP autenticados; ranking Google, citações ChatGPT reais, PageSpeed/CrUX, backlinks, QA visual/acessibilidade integral.
- A tentativa de comando `curl` neste executor não conseguiu resolver o host por DNS; isso é uma limitação de rede do executor e **não é defeito atribuído ao site**.
- Não foi executado `Claude SEO` local. Nenhuma ferramenta de busca externa equivale a prova de citações em respostas finais de usuários.

**Documentação oficial consultada:**
- OpenAI Crawlers: https://developers.openai.com/api/docs/bots
- OpenAI Help — ChatGPT Search: https://help.openai.com/pt-br/articles/9237897-searching-the-web-with-chatgpt
- OpenAI publishers — FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Google Search — sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search — helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search — structured data rules: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Search — FAQ rich result policy: https://developers.google.com/search/blog/2023/08/howto-faq-changes

**Próxima evidência necessária:** logs do `OAI-SearchBot` e Search Console da propriedade oficial. Sem isso, o status adequado é **`ROBOTS_ALLOWED / BOT_ACCESS_UNVERIFIED / INDEXING_UNVERIFIED / CITATIONS_UNVERIFIED`**.
