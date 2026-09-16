#!/usr/bin/env bash
set -u -o pipefail

for attempt in 1 2 3 4 5 6; do
  cache="$(date +%s)-${attempt}"
  public_home="$(curl -fsSL --connect-timeout 10 --max-time 30 -H 'Cache-Control: no-cache' "https://www.motoristaops.com.br/?verify=${cache}" || true)"
  dashboard_home="$(curl -fsSL --connect-timeout 10 --max-time 30 -H 'Cache-Control: no-cache' "https://dashboard.motoristaops.com.br/?verify=${cache}" || true)"

  asset_failure=0
  for asset in assets/hero-claude.avif assets/og-motoristaops.jpg assets/logo-claude.avif assets/service-cards.webp assets/henrico-profile.webp landing-v3/logo-oficial.svg; do
    status="$(curl -sS -o /dev/null -w '%{http_code}' --connect-timeout 10 --max-time 30 "https://www.motoristaops.com.br/${asset}" || true)"
    if [ "$status" != '200' ]; then
      echo "Attempt ${attempt}: ${asset} returned ${status}"
      asset_failure=1
    fi
  done

  og_type="$(curl -sSI --connect-timeout 10 --max-time 30 'https://www.motoristaops.com.br/assets/og-motoristaops.jpg' | tr -d '\r' | awk 'BEGIN{IGNORECASE=1} /^content-type:/ {print $2; exit}' || true)"

  if grep -qF 'data-icon-system="lucide"' <<<"$public_home" \
    && grep -qF 'data-brand-system="brand-glyphs"' <<<"$public_home" \
    && grep -qF 'https://unpkg.com/lucide@0.574.0' <<<"$public_home" \
    && grep -qF 'MotoristaIconSystem' <<<"$public_home" \
    && grep -qF 'MotoristaBrandSystem' <<<"$public_home" \
    && grep -qF 'data-mo-icon="airport"' <<<"$public_home" \
    && grep -qF 'data-mo-icon="location"' <<<"$public_home" \
    && grep -qF 'data-brand-icon="whatsapp"' <<<"$public_home" \
    && grep -qF 'data-brand-icon="instagram"' <<<"$public_home" \
    && grep -qF 'data-brand-icon="google"' <<<"$public_home" \
    && grep -qF 'property="og:image" content="https://www.motoristaops.com.br/assets/og-motoristaops.jpg?v=20260916"' <<<"$public_home" \
    && grep -qF 'property="og:image:type" content="image/jpeg"' <<<"$public_home" \
    && ! grep -qF '<img class="card-icon"' <<<"$public_home" \
    && ! grep -qF '/assets/icons-official/' <<<"$public_home" \
    && ! grep -qF 'data:image/png;base64,' <<<"$public_home" \
    && grep -qF 'Plano operacional' <<<"$dashboard_home" \
    && grep -qF 'MotoristaOPS' <<<"$dashboard_home" \
    && [ "$asset_failure" -eq 0 ] \
    && [ "$og_type" = 'image/jpeg' ]; then
    echo 'Landing deployment passed with canonical SEO, JPEG Open Graph social card, preserved icon system and preserved dashboard.'
    exit 0
  fi

  echo "Attempt ${attempt}: landing not converged yet; og_type=${og_type:-missing}."
  sleep 10
done

echo 'Landing did not converge or dashboard preservation check failed.'
exit 1
