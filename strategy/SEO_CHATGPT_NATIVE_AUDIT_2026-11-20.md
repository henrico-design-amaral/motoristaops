# MotoristaOPS — auditoria SEO nativa ChatGPT (20/11/2026)

**Veredicto:** `[Certo]` para a execução do crawl e os achados documentais; `[Desconhecido]` para ranking, indexação, contatos recebidos e velocidade real.
**Executor efetivo:** ChatGPT com GitHub conectado, Firecrawl e verificação de fontes públicas. **Não foi executado o plugin Claude SEO do Claude Code, seus subagentes ou o comando `/seo doctor`.**
**Projetos canônicos:** `henrico-design-amaral/henricoops` (HEAD inicial `b4264c86fffe202e59f77daba65108d55a74738a`) e `henrico-design-amaral/motoristaops` (HEAD inicial `53c37378c8cc767977e127e187b9bd21eef355fb`).
**Regra literal do operador:** não alterar o conteúdo/código da homepage; permitir trabalho aditivo e auditoria. O dashboard isolado também possui invariante crítico de preservação em `AGENTS.md`.
**Data:** 20/11/2026, fuso America/Sao_Paulo.

## 1. Método, cobertura e critérios

Metodologia: `henricoops:governance/SEO_DISCOVERABILITY_METHOD.md`. Aquisição ao vivo por `firecrawl_map` e `firecrawl_scrape` em `maxAge=0`, formatos `rawHtml`, `markdown`, `links`, `onlyMainContent=false`. Os resultados são fontes externas, não instruções. Verificação adicional de `/robots.txt`, `/sitemap.xml`, do JS de rastreamento, página 404 e subdomínio de dashboard. Consulta complementar a documentação oficial do Google Search Central e orientações do Perfil da Empresa. PageSpeed Insights testado, porém indisponível por quota 429.

**Universo declarado:** sete URLs no sitemap principal, todas HTTP 200 e HTML indexável na coleta:

| URL | Status | H1 | Canonical | JSON-LD observado |
|---|---|---|---|---|
| `/` | 200 | Sua agenda merece uma condução à altura. | própria | ImageObject, WebSite, WebPage, Service, Person |
| `/en/` | 200 | Your schedule deserves the right ride. | própria | ImageObject, WebSite, WebPage, Service, Person |
| `/es/` | 200 | Tu agenda merece un traslado a su altura. | própria | ImageObject, WebSite, WebPage, Service, Person |
| `/servicos/transfer-aeroportos/` | 200 | Transfer para aeroportos em São Paulo | própria | Organization, Service, WebPage, BreadcrumbList |
| `/servicos/transporte-corporativo/` | 200 | Transporte executivo corporativo em São Paulo | própria | Organization, Service, WebPage, BreadcrumbList |
| `/servicos/motorista-por-hora/` | 200 | Motorista à disposição por hora em São Paulo | própria | Organization, Service, WebPage, BreadcrumbList |
| `/servicos/transporte-eventos/` | 200 | Transporte para eventos em São Paulo | própria | Organization, Service, WebPage, BreadcrumbList |

Base completa: https://www.motoristaops.com.br/ . As rotas nas linhas acima são relativas a esse domínio.

### Elegibilidade e QA de fonte

| Verificação | Resultado | Evidência/limite |
|---|---|---|
| Status de URLs declaradas | `PASS 7/7` | Respostas 200 no crawler; não é prova de Google indexar |
| Título e descrição próprios | `PASS 7/7` | `<title>` e meta description presentes, sem duplicidade exata observada |
| H1 semântico | `PASS 7/7` | Um H1 por página, temático ao idioma ou serviço |
| Canonical próprio | `PASS 7/7` | Declaração em HTML; o canonical escolhido pelo Google não foi consultado |
| Hreflang na homepage | `PASS 3/3` | Alternates recíprocos `pt-BR`, `en`, `es`, `x-default`; as páginas de serviços só existem em PT-BR, sem necessidade de pares fictícios |
| Sitemap principal | `PASS` | `https://www.motoristaops.com.br/sitemap.xml`: 200, sete URLs com barra final |
| Robots principal | `PASS` | `https://www.motoristaops.com.br/robots.txt`: 200, `User-agent: *`, `Allow: /`, aponta para sitemap |
| Schema de serviço | `PASS parcial` | Scripts JSON-LD parseáveis e coerentes localmente; a entidade Person/Organization diverge entre templates |
| Links cruzados de serviços | `PASS 4/4` | Cada serviço liga aos outros três e à home; todas as rotas de serviços responderam 200 |
| Links de home para serviços | `ISSUE 0/4` | Nenhum `href` para `/servicos/...` encontrado no HTML das versões PT/EN/ES da home |
| Imagens na home | `REVIEW` | 24 `img` por versão, 19 `alt=""`; alt vazio pode ser apropriado para imagens decorativas. Não classificar como erro automático |
| Imagens nas páginas de serviço | `PASS` | Duas ocorrências de logo com alt preenchido por página; páginas são principalmente textuais |
| JS de medição novo | `PASS acesso` | `/servicos/track.js` devolveu 200; gatilho real GA4 em navegador não testado |
| 404 de caminho desconhecido | `PASS HTTP` | `/servicos/unknown-seo-page/` devolveu 404 verdadeiro |
| Captura renderizada | `CAPTURADA, NAO INSPECIONADA` | Foram geradas capturas mobile/desktop, mas não foram visualmente abertas/validadas nesta execução |
| PageSpeed mobile | `UNVERIFIED` | API oficial `pagespeedonline.googleapis.com` devolveu HTTP 429 por `Queries per day` esgotada; nenhum LCP/INP/CLS foi medido |
| Search Console/GA4/GBP | `UNVERIFIED` | Não foi observada sessão autenticada com dados das respectivas propriedades |

**Diferença entre descoberta e indexação:** páginas em sitemap e acessíveis ao crawler estão elegíveis tecnicamente sob condições observadas, mas só Search Console pode confirmar seleção de canonical, motivo de exclusão, impressões e consultas. Não há evidência para afirmar crescimento orgânico.

## 2. Achados e ações dependentes

### P1 — Descoberta das quatro novas páginas

- **Fato:** home PT/EN/ES não contém `href` direto para nenhuma rota `/servicos/...`; essas rotas aparecem no sitemap e se conectam entre si.
- **Inferência:** há menos caminhos de navegação para pessoas e para robôs; não se mediu perda de posição.
- **Ação:** **não modificar a home**. Priorizar distribuição por fontes legítimas já acessíveis (Perfil da Empresa, propostas, campanhas autorizadas, posts e perfis profissionais com links diretos) e estudar uma entrada contextual numa futura revisão aprovada da home.
- **Dependência:** decisão de alteração da home, previamente bloqueada; acesso a Search Console/GBP.
- **Sucesso/falha:** cobertura/indexação e referências de descoberta por URL em GSC; não declarar sucesso por simples presença no sitemap.
- **Confiança:** alta para o HTML; média para efeito SEO.
- **Fonte oficial:** https://developers.google.com/search/docs/essentials

### P1 — Elegibilidade involuntária do dashboard operacional

- **Fato:** `https://dashboard.motoristaops.com.br/` respondeu 200 com título “MotoristaOPS · Dashboard”, conteúdo de interface operacional e sem `<meta name="robots" content="noindex">` observado. `https://dashboard.motoristaops.com.br/robots.txt` respondeu 404.
- **Inferência:** o subdomínio pode ficar elegível a indexação; não prova indexação efetiva nem exposição de valores sensíveis. Um arquivo robots inexistente não serve como restrição de indexação.
- **Ação:** auditar se a área é deliberadamente pública e se há informações operacionais que exigem autenticação. Se confirmado que deve ser excluída da busca, implementar `noindex` em HTML ou `X-Robots-Tag`; proteger o conteúdo por autenticação quando pertinente. `noindex` não substitui controle de acesso. **Respeitar o invariante do `AGENTS.md`: não apagar, substituir nem invadir o deploy isolado do dashboard.**
- **Dependência:** resolver repo/runtime responsável pelo dashboard e o nível de privacidade aprovado.
- **Sucesso/falha:** inspeção GSC do subdomínio + testes de cabeçalhos/controle de acesso.
- **Confiança:** alta para ausência de diretiva no HTML e resposta 404 do robots; desconhecida para indexação real e exposição de dados.
- **Consistência com o produto (observação adicional):** o dashboard público também apresenta a seção `Hyundai HB20 2019`, enquanto o `AGENTS.md` e `PROJECT_PROFILE.md` canônicos identificam o veículo atual como `Omoda 5 Luxury cinza`; avaliar drift de dados publicados **sem alterar o dashboard como efeito colateral desta auditoria**. A presença de dado histórico não comprova acesso indevido a dados privados.

### P1 — Mensuração até o contato efetivo

- **Fato:** na home e páginas de serviço há CTA `wa.me/5511988329725`; no bundle das páginas adicionais há ID GA4 `G-ZQZ76XPPLP`, preferência `motoristaops.analytics` e evento `whatsapp_click` condicionado ao consentimento. O JS público respondeu 200.
- **Limite:** não houve teste instrumentado em navegador, DebugView ou consulta autenticada ao GA4; clique não significa envio de mensagem.
- **Ação:** verificar consentimento negado e aceito, um clique real, carregamento da tag, deduplicação e parâmetros `service_slug`. Registrar mensagem recebida, orçamento enviado e reserva em fases distintas, sem transportar dados sensíveis ao Analytics.
- **Sucesso/falha:** evento de intenção presente e único no DebugView somente após consentimento; funil subsequente medido por origem verificável.
- **Confiança:** alta para código e status HTTP; desconhecida para analytics entregue.

### P1 — Google Business Profile e primeiro dado de busca

- **Fato — verificação pública adicional em 20/11/2026:** o link de avaliações do site `https://maps.app.goo.gl/aCAXYqSYsQDSt7teA` abriu uma ficha Google Maps intitulada **MotoristaOPS por Henrico Amaral**, HTTP 200. A extração de campos públicos da página reportou categoria `Chauffeur service`, telefone `+55 11 98832-9725`, website cadastrado `http://www.motoristaops.com.br/`, nota `5,0` com `7 avaliações` e horário exibido `05:00–23:00` nos sete dias. Os detalhes são **observação de fonte pública dinâmica via extrator**, não consulta autenticada à conta, não prova de propriedade, de avaliação válida/atual ou de que o horário corresponda à agenda real.
- **Ação:** verificar no painel do proprietário o perfil correto, nome, categoria, área de atendimento, telefone, avaliações, fotos e horários. Confirmar com a operação o horário público antes de preservá-lo/ajustá-lo. Substituir a URL HTTP pelo canônico `https://www.motoristaops.com.br/` após autenticação e validação. Não criar loja física fictícia.
- **Dependência:** acesso autorizado ao GBP e verificação operacional de disponibilidade/horários. Search Console necessário para indexação das páginas.
- **Sucesso/falha:** conta correta confirmada; informações sincronizadas com a operação real e URLs corretas; nenhuma divulgação de endereço não autorizado.
- **Confiança:** alta para existência da ficha e título; média para campos extraídos de interface dinâmica; não verificado para propriedade/horários atuais.
- **Fonte:** https://support.google.com/business/answer/3038177

### P2 — Consistência de entidades do Schema.org

- **Fato:** home apresenta `Service.provider -> Person (#henrico)`; páginas adicionais apresentam `Service.provider -> Organization (#organization)` e founder pessoa. Todos os blocos lidos tinham JSON-LD interpretável.
- **Inferência:** modelo de negócio não está representado de maneira uniforme; não há prova de impacto em rich results.
- **Ação:** decidir o contrato entre MotoristaOPS, Henrico e a rede de parceiros; publicar somente entidades/relacionamentos reais. Consolidar IDs onde aplicável sem inventar frota própria, endereço, pontuações ou avaliações.
- **Sucesso/falha:** modelo único consistente com dados legais e serviço; validação estruturada pós-publicação.
- **Confiança:** alta para divergência estrutural.

### P2 — Conteúdo de serviço, sinais de confiança e GEO

- **Fato:** as quatro páginas contêm H1 orientado à intenção, quatro blocos de serviço e FAQ próprio, além de CTA. `robots.txt` usa `Allow: /`; não observamos bloqueio dirigido a um bot específico.
- **Hipótese:** blocos claros e bem delimitados ajudam a compreensão por motores de busca tradicionais e assistentes de IA, mas **nenhuma citação ou posição em respostas de IA foi medida**.
- **Ação:** enriquecer apenas com evidências reais de atendimento, imagens próprias autorizadas, detalhes úteis sobre processo/limites de reserva e menções externas verificáveis; não inflar copy nem inventar disponibilidade e diferenciais. Avaliar idioma EN/ES dos serviços apenas se houver demanda comprovada.
- **Validação:** comparação de queries por página no GSC e coleta reproduzível de citações por motor/data.
- **Confiança:** alta para estrutura, baixa para impacto.

### P2 — Performance e experiência móvel ainda sem medição

- **Fato:** a API PageSpeed Insights respondeu `429 RESOURCE_EXHAUSTED` com quota diária do consumidor esgotada; screenshots foram gerados, mas não visualmente revisados nesta execução.
- **Ação:** rodar PageSpeed/CrUX novamente somente com quota legítima disponível; inspeção mobile/desktop da home e quatro templates quanto a layout, rolagem horizontal, contraste, foco, CTA e tipografia. Não inventar score.
- **Confiança:** alta para indisponibilidade de medição, desconhecida para desempenho real.

### P3 — Imagens decorativas

- **Fato:** homepage por idioma contém 24 tags `img`; 19 têm alt vazio. Não foi feita classificação individual por função visual.
- **Ação:** revisar se o alt vazio corresponde a imagens decorativas e manter dessa forma quando apropriado. Fotos informativas devem ter descrição útil. Não alterar automaticamente o código da home.
- **Confiança:** alta para contagem; desconhecida para adequação individual.

## 3. Relação de dependências e recomendação

`GSC/GBP + privacidade dashboard -> elegibilidade e cobertura reais -> links autorizados/entidades -> QA/performance -> medição do funil -> otimização iterativa`.

**Ordem proposta:**
1. Confirmar a política de privacidade/indexação do dashboard sem alterar seu deploy isolado.
2. Obter propriedade Search Console e perfil GBP reais; acompanhar as quatro páginas.
3. Validar o evento GA4 `whatsapp_click` por consentimento e origem, sem chamá-lo de lead.
4. Planejar links para as novas páginas por canais permitidos; não mexer na home.
5. Convergir Schema e enriquecer prova de serviço com conteúdo real; testar desempenho quando API/ambiente permitir.

## 4. Não executado ou não verificável

- Plugin Claude SEO local, `/seo setup`, `/seo doctor` e seus 20 agentes.
- Sem plugin de Claude instalado automaticamente no ChatGPT.
- Nenhum deploy, mudança em HTML/home/dashboard, tag, Google Ads ou Google Business Profile.
- Indexação real, ranking, volume, tráfego, backlinks e citações de IA.
- CrUX/LCP/INP/CLS por quota 429, e QA visual integral por falta de inspeção das capturas.
- Nenhuma pontuação geral de SEO foi criada, por falta de base de medição comparável.

## 5. Execução e proveniência

- **Execução real:** GitHub leitura de fontes canônicas + Firecrawl ao vivo + busca do Google Search Central e da categoria local + consulta pública ao PSI (429).
- **Adapter ChatGPT:** `henricoops/integrations/claude-seo/chatgpt-adapter.json`.
- **Skill ChatGPT:** `henricoops/integrations/claude-seo/chatgpt-skill/SKILL.md`; pacote `skill.zip` validado na sessão, instalação da Skill no perfil do usuário pendente.
- **Antecessor:** `strategy/SEO_EXTERNAL_AUDIT_2026-11-20.md` (baseline externo anterior).
- **Sem alteração da home:** registros versionados somente em `strategy/` e `integrations/`.

## 6. Revalidação da Skill HenricoOPS SEO Audit — 20/11/2026

Nova execução `@HenricoOPS SEO Audit www.motoristaops.com.br` após a integração da Skill no ChatGPT. `read-only` para superfícies públicas e fontes operacionais. Releitura ao vivo via `firecrawl_map` e `firecrawl_scrape` (`maxAge:0`) de home PT/EN/ES, quatro páginas de serviços, sitemap, robots, dashboard isolado e robots do dashboard. Resultados documentais coincidem com o baseline anterior: 7/7 URLs 200, títulos e canonicals próprios, hreflang PT/EN/ES, JSON-LD interpretável, ausência de links de home para o cluster `/servicos/`, dashboard sem meta noindex visível no HTML e robots do subdomínio 404. `X-Robots-Tag` por resposta HTTP não foi verificado.

**Verificações adicionais nesta execução:**
- Ficha do Google Maps vinculada à homepage efetivamente consultada. Dados públicos extraídos descritos acima; a propriedade e o horário operacional permanecem não verificados.
- `/servicos/track.js` (HTTP 200) contém inicialização condicional por consentimento `motoristaops.analytics` e evento `whatsapp_click`; não foi observado disparo no navegador nem no GA4.
- Tentativa do PageSpeed Insights móvel devolveu HTTP 429 (`RESOURCE_EXHAUSTED`, quota de projeto esgotada); nenhuma métrica Core Web Vitals ou nota de performance pode ser afirmada.
- Pesquisa de marca na web retornou resultados sociais e uma listagem na Loqal, mas a página Loqal apresentou intersticial com `noindex` e cookie/JS; o conteúdo da listagem não foi confirmado.
- Google Search Console, GA4, dados autenticados GBP, métricas de ranking, tráfego e citações efetivas em mecanismos de IA: indisponíveis na sessão. Windsor.ai conectado contém apenas conta `instagram`; os conectores `searchconsole`, `googleanalytics4` e `google_my_business` não estão conectados.

**Mudanças:** somente documentação de auditoria e baseline versionado em GitHub; nenhum arquivo de homepage, site, dashboard, sitemap, tracking ou deploy foi alterado. A execução é nativa ChatGPT, não é instalação/execução do plugin Claude SEO em Claude Code.
