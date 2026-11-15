# MotoristaOPS /v2 — prévia executiva 2026-11-14

**Status:** protótipo de validação, NÃO aprovado para publicação na raiz.
**URL-alvo:** https://www.motoristaops.com.br/v2/
**Escopo:** 8 dobras inteiras em `100svh`: hero, serviços, categorias, processo, avaliações, FAQ, orçamento e footer.
**Original:** `source/landing/` e publicação na raiz intocados.

Identidade: assinatura horizontal compacta 03 aprovada como composição em `strategy/LOGO_APPLICATIONS_2026-11-14.md`, preservada em raster incorporado (sem geração de logo por IA). Instrument Sans.
Pessoas: a hero usa `hero-v4-3.webp`, composição aprovada no repositório canônico com as referências de rosto, corpo e roupa fornecidas por Henrico. É composição de marca, não fotografia documental nem garantia biométrica.
Imagens: a hero aproxima a geometria da prancha com Henrico, Omoda 5 e Ponte Estaiada; fotos de categorias são recortes **ilustrativos** da peça de estudo indicada pelo operador. São espaço-reserva até existirem fotos reais de parceiros autorizadas; não confirmam modelo, capacidade, mala ou existência de uma frota própria.
Comercial: capacidade, bagagem, motorista, disponibilidade e condições sob confirmação. Nada é enviado automaticamente do formulário. Dados de avaliações foram obtidos da landing atual e requerem reconfirmação humana pré-release.
SEO: noindex, nofollow; `.htaccess` limita cache e aplica X-Robots-Tag quando disponível.
Deploy: workflow dedicado apenas a `$HOSTINGER_PUBLIC_TARGET_DIR/v2/`, sem mirror-delete e sem tocar `public_html/index.html`.
QA local: lint sintático, oito dobras, hero desktop/mobile, FAQ independente, formulário independente, idiomas, menu mobile e validação sem envio testados. Evidências em `v2/qa/`; aceite humano final continua separado do PASS técnico.
