# MotoristaOPS /v2 — prévia executiva 2026-11-14

**Status:** protótipo de validação, NÃO aprovado para publicação na raiz.
**URL-alvo:** https://www.motoristaops.com.br/v2/
**Escopo:** 8 dobras inteiras em `100svh`: hero, serviços, categorias, processo, avaliações, FAQ, orçamento e footer.
**Original:** `source/landing/` e publicação na raiz intocados.

Identidade: assinatura horizontal compacta 03 aprovada como composição em `strategy/LOGO_APPLICATIONS_2026-11-14.md`, preservada em raster incorporado (sem geração de logo por IA). Instrument Sans.
Pessoas: nenhuma pessoa sintética representada como Henrico na hero.
Imagens: a hero utiliza arte conceitual já publicada no site atual; fotos de categorias são recortes **ilustrativos** da peça de estudo indicada pelo operador. São espaço-reserva até existirem fotos reais de parceiros autorizadas; não confirmam modelo, capacidade, mala ou existência de uma frota própria.
Comercial: capacidade, bagagem, motorista, disponibilidade e condições sob confirmação. Nada é enviado automaticamente do formulário. Dados de avaliações foram obtidos da landing atual e requerem reconfirmação humana pré-release.
SEO: noindex, nofollow; `.htaccess` limita cache e aplica X-Robots-Tag quando disponível.
Deploy: workflow dedicado apenas a `$HOSTINGER_PUBLIC_TARGET_DIR/v2/`, sem mirror-delete e sem tocar `public_html/index.html`.
QA: lint sintático e estrutura testados; render visual final desktop/mobile e click-through de WhatsApp ainda PENDENTES de revisão via browser sem bloqueios.
