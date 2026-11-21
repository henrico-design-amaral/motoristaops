# MotoristaOPS — auditoria SEO externa (20/11/2026)

**Tipo de execução:** inspeção externa de URLs públicas por Firecrawl + leitura do GitHub canônico. **Não é uma execução do plugin Claude SEO em Claude Code local.**
**Estado:** `EVIDENCE_COLLECTED / REVIEWED`; correções de produto `NOT_STARTED`; medição de ranking/GA4/GSC `UNVERIFIED`.
**Alvo:** https://www.motoristaops.com.br/
**Proteção do operador:** não alterar a homepage. Não confundir SEO com publicação automática de mudanças.

## Autoridade

- `DESIGN.md`, `VISUAL_LOCK.json` e Brand Book V2 governam identidade.
- `strategy/EXECUTIVE_REPOSITIONING_2026-11-13.md` governa o posicionamento executivo aprovado.
- `strategy/SEO_SERVICE_PAGES_2026-11-20.md` registra a publicação técnica das quatro páginas e limites de rastreamento.
- HenricoOPS `governance/SEO_DISCOVERABILITY_METHOD.md` governa a metodologia e priorização.
- Repositório `henrico-design-amaral/motoristaops`, HEAD observado antes deste relatório: `c0efb6774f7e2fd20cd017ed66241c0dae344cd2`.

## Escopo e método

Inspeção por `firecrawl_map`, seguida de `firecrawl_scrape` com `maxAge=0`, formatos `rawHtml`, `markdown` e `links`, sem recortar apenas conteúdo principal. Foram examinadas as sete URLs declaradas no sitemap, além de `robots.txt` e `sitemap.xml`. URLs verificadas:

1. https://www.motoristaops.com.br/
2. https://www.motoristaops.com.br/en/
3. https://www.motoristaops.com.br/es/
4. https://www.motoristaops.com.br/servicos/transfer-aeroportos/
5. https://www.motoristaops.com.br/servicos/transporte-corporativo/
6. https://www.motoristaops.com.br/servicos/motorista-por-hora/
7. https://www.motoristaops.com.br/servicos/transporte-eventos/

As sete responderam HTTP 200 ao scraper. O sitemap respondeu 200 e contém as mesmas sete URLs; `robots.txt` respondeu 200 com `User-agent: *`, `Allow: /` e diretiva para o sitemap. Isso comprova acesso HTTP na coleta, não indexação real pelo Google.

## Elegibilidade técnica — fatos observados

| Critério | Evidência | Veredicto |
|---|---|---|
| Reachability | 7/7 páginas HTTP 200 | PASS na coleta externa |
| Títulos e meta descriptions | Todas têm título e description adequados ao idioma/serviço | PASS documental; CTR não medido |
| Canonicals | Todas declararam URL canônica própria, HTTPS e www | PASS declaratório; escolha de canonical por Google desconhecida |
| H1 | Um H1 temático em cada página de serviço; home PT/EN/ES tem H1 editorial traduzido | PASS de estrutura; intenção de busca da home é hipótese |
| Internacionalização da homepage | /, /en/, /es/ possuem hreflang/alternates recíprocos | PASS observacional |
| Schema | Home: ImageObject, WebSite, WebPage, Service, Person. Serviços: Organization, Service, WebPage, BreadcrumbList | JSON-LD parseável nos HTML coletados; Google Rich Results não executado |
| Indexability declarada | robots.txt permite crawling; as páginas têm canonical e meta robots permissivo | Permissões declaradas; indexação não confirmada |
| CTA | Páginas adicionais ligam a `wa.me/5511988329725` com texto de solicitação e nota sobre envio manual | Intenção de contato existe; GA4 e mensagem recebida não verificados |
| Imagens | Home PT/EN/ES contém 24 imagens, 19 com `alt=""`; cada página de serviço contém 2 imagens de logo com alt descritivo | `alt=""` requer classificação decorativa, não é defeito automático |
| HTTPS/arquivos | HTML e sitemap acessíveis via HTTPS | PASS limitado à coleta; TLS/headers avançados não auditados |

**Nota de versão do crawler:** a listagem inicial `firecrawl_map` continha um título antigo de homepage (“Motorista Particular”), enquanto a inspeção `rawHtml` atual mostra “Transporte Executivo em São Paulo | MotoristaOPS”. Para fatos de conteúdo, este relatório prioriza o HTML atual.

## Achados, impactos e prioridades

### P1 — descoberta e links internos das páginas novas

**OBSERVAÇÃO / FATO:** As quatro páginas têm links de navegação entre si e links à home. Não foram encontrados links para `/servicos/...` no HTML da homepage PT coletada. As quatro URLs aparecem no sitemap.
**CAUSA / RELAÇÃO:** São superfícies adicionais recém-publicadas sem entrada visível a partir da página de maior hierarquia de navegação do próprio site.
**IMPACTO PROVÁVEL:** Menor descoberta por navegação humana e menos caminhos de links internos para crawlers. Não foi medido efeito em ranking ou indexação.
**AÇÃO RECOMENDADA:** Planejar links contextuais a partir de uma superfície pública navegada com frequência. **Bloqueio explícito:** não alterar a homepage sem nova autorização, mesmo para SEO. Alternativas no escopo atual: usar URLs canônicas diretamente em Perfil da Empresa e futuras campanhas, quando o acesso às contas for autorizado; manter sitemap e links cruzados; avaliar índice de serviços se houver rota de entrada comprovada.
**VALIDAÇÃO:** Search Console (URLs descobertas/indexadas + páginas de referência) e navegação real entre páginas.
**FALHA:** Páginas permanecem sem indexação ou sem rotas de descoberta relevantes após janela de observação e correções autorizadas.
**Confiança:** alta para ausência no HTML e média para efeito SEO.

### P1 — mensuração de conversão antes de ativar mídia

**OBSERVAÇÃO / FATO DE CÓDIGO:** Home usa GA4 `G-ZQZ76XPPLP`, preferência `motoristaops.analytics` e evento `whatsapp_click` sob consentimento. As páginas de serviço têm tracker separado, `service_slug` e `cta_location=pagina_servico`; o botão abre WhatsApp, não envia a mensagem.
**LIMITE:** Não foi observada sessão autenticada do GA4 nem teste DebugView/Tag Assistant nesta coleta. Código não é prova do evento em produção.
**AÇÃO:** Testar em navegador com recusa e consentimento, verificar um clique sem dados pessoais em GA4 DebugView, separar eventos de intenção, mensagem recebida, orçamento enviado e reserva confirmada. Não classificar clique como conversão de venda.
**VALIDAÇÃO:** Eventos vistos no GA4 com origem correta sem campos sensíveis, nenhuma medição antes do consentimento.
**FALHA:** Evento ausente, duplicado, enviado antes do consentimento ou com informações de trajeto.
**Confiança:** alta sobre o código, desconhecida sobre entrega no GA4.

### P1 — evidência primária de busca e Google Business Profile

**OBSERVAÇÃO / FATO:** O site inclui link público de avaliação/perfil `https://maps.app.goo.gl/aCAXYqSYsQDSt7teA`. Não houve extração autenticada de informações do Perfil da Empresa, Search Console, Bing Webmaster ou dados de ranking.
**AÇÃO:** Conectar fontes autorizadas, confirmar propriedade e cobertura do sitemap, páginas indexadas, impressões, consultas, posição observada, categorias do GBP, áreas de atendimento, duplicidades, avaliações e dados operacionais. Não inventar endereço de loja física para um serviço de área de atendimento.
**VALIDAÇÃO:** Relatório de cobertura e performance por URL, conta GBP selecionada e dados verificados contra operação real.
**FALHA:** Dados de conta errada, discrepância de nome/telefone/área, páginas ausentes da cobertura.
**Confiança:** alta sobre a ausência de dados nesta execução; sem conclusão sobre ranking ou perfil.

### P2 — entidade de marca e profissional

**OBSERVAÇÃO / FATO:** Home representa `Service.provider` como `Person` (`#henrico`), enquanto páginas de serviço representam `Service.provider` como `Organization` (`#organization`). Ambas descrevem aspectos plausíveis da operação, mas a relação entre as duas entidades não é unificada por IDs estáveis entre todas as páginas.
**AÇÃO:** Avaliar no código um grafo único e coerente `Organization + founder Person + Service`, coerente com a operação real e sem inventar endereço ou frota própria. Propor correção em branch somente após validar o modelo operacional, mantendo a homepage protegida.
**VALIDAÇÃO:** JSON-LD parseável, Schema.org coerente com conteúdo, entidade referenciada consistentemente e Rich Results Test quando aplicável.
**Confiança:** alta para diferença estrutural, média para ganho de SEO.

### P2 — QA visual/móvel e performance

**OBSERVAÇÃO:** Nenhuma métrica de campo CrUX/Core Web Vitals ou laudo Lighthouse/PSI foi obtido nesta coleta. A estrutura tem versão de stylesheet local e fontes próprias, mas isso não demonstra boa performance.
**AÇÃO:** Inspecionar todas as páginas em mobile/desktop, viewport, clipping, navegação por teclado, labels, fonte e recursos, depois obter PSI/CrUX por URL quando houver dados. Não usar ferramentas de bloqueio do DevTools nem adiar scripts só para inflar scores.
**VALIDAÇÃO:** Evidências de viewport e métricas com data, ferramenta e URL, regressões inexistentes.
**Confiança:** alta sobre lacuna de medição; impacto não mensurado.

### P2 — busca assistida por IA / GEO

**OBSERVAÇÃO:** Quatro páginas possuem headings temáticos, FAQs legíveis em HTML e esquemas Service, potencialmente úteis a leitores e extratores de conteúdo. `robots.txt` não bloqueia crawlers por nome.
**AÇÃO:** Manter fatos específicos, cobertura de serviços, atributos verificáveis e fontes externas de credibilidade. Avaliar citações em Google AI/ChatGPT/Perplexity somente com pesquisa reproduzível. Não tratar `llms.txt` ou respostas de IA como ranking garantido.
**VALIDAÇÃO:** consultas documentadas, URLs citadas, data, plataforma, amostra e distinção entre impressão/citação/conversão.
**Confiança:** alta sobre conteúdo; nenhuma afirmação sobre presença efetiva em respostas de IA.

## Sequência e dependências

1. **SEM modificar a homepage:** obter GSC/GBP e confirmar crawl/indexação das quatro URLs e suas referências.
2. QA visual/performance + teste consentido de `whatsapp_click` e separação de fases do funil.
3. Com base em GSC, priorizar links/contexto via rotas autorizadas, sem clones de cidades/doorways.
4. Revisar consistência de entidade/schema com fatos operacionais aprovados.
5. Medir consultas/citações e campanhas apenas após linha de base e contas confirmadas.

## O que esta execução NÃO comprova

- Claude SEO instalado, `/seo doctor` executado ou Claude Code local >= 1.0.33.
- Ranking, tráfego orgânico, volume de palavras-chave, backlinks ou indexação Google.
- LCP, INP, CLS, PSI/Lighthouse/CrUX ou resultados de testes mobile reais.
- Resultados de GA4, entrega de mensagem WhatsApp, orçamento recebido ou reserva.
- Google Business Profile, campanhas Google Ads ou custo/ROI.

## Handoff

O adapter HenricoOPS está versionado em `henrico-design-amaral/henricoops/integrations/claude-seo/`, com upstream oficial e status de instalação local `NOT_DISPATCHED`. O executor Claude Code local deve primeiro verificar versão, segurança, setup e doctor; depois comparar relatório próprio com este baseline. Os resultados de uma ferramenta externa permanecem subordinados às decisões de produto/brand e aos gates de publicação.
