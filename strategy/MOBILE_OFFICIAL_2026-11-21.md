# MotoristaOPS — página inicial mobile oficial V4
Data: 2026-11-21 (America/Sao_Paulo)
Estado da entrega: RELEASED / TECHNICAL_RELEASE_VERIFIED em 2026-11-21; monitoramento de SEO e métricas reais ainda UNVERIFIED.

## Decisão do operador
A Bio V3 passa a ser a home mobile de `www.motoristaops.com.br`. Manter cabeçalho, hero, acessos WhatsApp/formulário, Instagram e TikTok; incluir serviços e categorias da frota; orçamento por último. Remover apenas o link autorreferente `Visitar o site oficial` e o separador sob os links sociais. Nenhum botão fixo.

## Arquitetura, SEO e operação
- Mesma URL canônica e esquema do site; rewrite interno de `/` para `/mobile/router.php`. PHP seleciona o documento por User-Agent e envia `Vary: User-Agent` e `Cache-Control: private, no-store`.
- Desktop inalterado. Inglês e espanhol preservados com o layout responsivo traduzido existente, sem forçar português em URLs `/en/` e `/es/`.
- Imagens provenientes da V3 fornecida; logo horizontal oficial do repositório. Fotos da frota explicitamente ilustrativas, categorias disponíveis somente sob consulta.
- Fontes Instrument Sans locais, assets WebP, manifest SHA-256, verificação pública de HTML para UA desktop/mobile e conteúdo.
- Contato ao WhatsApp `5511988329725`; formulário apenas prepara e permite revisar mensagem, sem envio automático. Clique não equivale a orçamento recebido ou reserva.
- A versão mobile contém menos conteúdo que o desktop: risco de SEO mobile-first a acompanhar por Search Console; páginas de serviço adicionais permanecem no sitemap.

## QA e release
Validar em 320, 360, 390, 430 e 768 px; sem overflow, logo/cabeçalho, imagens e textos legíveis; form valida obrigatório, data min, prévia e invalidação após edição; checagem de browser e GitHub Actions; publicação somente após verificação pública e QA de identidade.

## Fechamento canônico — 21/11/2026 (America/Sao_Paulo)

**Escopo encerrado:** home mobile oficial V4 na URL pública `https://www.motoristaops.com.br/`; desktop preservado; `/en/` e `/es/` permanecem nas respectivas versões traduzidas responsivas. Não foi criado subdomínio mobile, enviado WhatsApp, alterado Google Ads ou contratado veículo parceiro.

### Evidência de código, deploy e qualidade

- Fonte canônica, `main`: commit `7e619a6bc58b7802f6ebc86efc450a38015f3900`.
- PR de implantação: https://github.com/henrico-design-amaral/motoristaops/pull/160 ; ajustes de cabeçalho https://github.com/henrico-design-amaral/motoristaops/pull/161 ; roteamento com proteção de cache https://github.com/henrico-design-amaral/motoristaops/pull/162 ; paridade de privacidade/mensuração https://github.com/henrico-design-amaral/motoristaops/pull/163 . Todos integrados ao `main`.
- Deploy Hostinger: https://github.com/henrico-design-amaral/motoristaops/actions/runs/44943306811 — `success`; verificador público registrou `PASS: 55 published files verified byte-for-byte`, confirmação de URL canônica, arquivos obsoletos e isolamento do dashboard.
- Verificação independente de produção via GitHub Actions: https://github.com/henrico-design-amaral/motoristaops/actions/runs/44943409355 — `success`.
- Checks da PR #163: build/testes da landing, foundation gate e verificação de SEO das páginas de serviço — `success`.
- Testes locais anteriormente realizados nas larguras 320, 360, 390, 430, 768 e 1024 px sem overflow horizontal, sem erros JS; fluxo de preparação e invalidação do formulário verificado sem envio de mensagem.

### Observação pública posterior ao deploy

Data de observação: 21/11/2026 (America/Sao_Paulo), aquisição `Firecrawl`, `maxAge: 0` e leitura da fonte GitHub. O domínio retornou `200` para `/`, `/mobile/index.html`, `/robots.txt`, `/sitemap.xml`, `/servicos/transfer-aeroportos/` e `/en/`:

- `/`: documento desktop com título `Transporte Executivo em São Paulo | MotoristaOPS`, canonical de raiz, `index,follow` e headline desktop.
- `/mobile/index.html`: documento V4, canonical de raiz, `index,follow`, sem botão `Visitar o site oficial`; `site-preferences.js`, `mobile-analytics.js` e reabertura das preferências no rodapé presentes. A URL técnica interna não deve ser anunciada como site alternativo.
- `/robots.txt`: `Allow: /` e referência ao sitemap.
- `/sitemap.xml`: URLs PT/EN/ES, quatro páginas de serviço e duas páginas legais.
- `/servicos/transfer-aeroportos/`: `200`, canonical próprio, conteúdo pré-renderizado.
- A seleção de mobile/desktop por User-Agent e a segurança de cache são comprovadas pelo gate HTTP do deploy; a aquisição Firecrawl da raiz não substitui a simulação de User-Agent desse gate.

### Limites e próximos sinais

- `GOOGLE_INDEXATION: UNVERIFIED` — metadados e resposta `200` não provam indexação efetiva, impressões ou posicionamento. Confirmar no Search Console quando a fonte oficial estiver disponível.
- `GA4_EVENT_RECEIPT: UNVERIFIED` — módulo consentido foi publicado e testado; comprovação de eventos recebidos depende do GA4 após consentimento real. Clique não é mensagem, orçamento ou reserva.
- `MOBILE_CWV_REAL_USERS: UNVERIFIED` — não foram registrados dados oficiais de campo/CrUX ou Lighthouse válidos para esta entrega.
- `BUSINESS_FLEET_AVAILABILITY: UNVERIFIED` — todas as categorias ilustrativas permanecem sujeitas à confirmação operacional de parceiros, lugares e bagagem.
- `SEO_MOBILE_CONTENT_PARITY: REVIEW_REQUIRED` — a home mobile é intencionalmente compacta e tem menor densidade de informação que a desktop. Monitorar cobertura e consultas, preservando as páginas internas. Não inventar nota SEO ou queda de desempenho.

**Fechamento:** `DELIVERED_AND_PUBLISHED / TECHNICAL_GATE_PASS`; pendências acima são medição e acompanhamento, não evidência de falha do deploy. Sem promessa de monitoramento em segundo plano. `CLAUDE_SEO_PLUGIN_RUN: NOT_DISPATCHED` — inspeção executada por ferramentas nativas conectadas deste chat.
