#!/usr/bin/env bash
set -euo pipefail
for name in HOSTINGER_HOST HOSTINGER_USERNAME HOSTINGER_PASSWORD HOSTINGER_PORT HOSTINGER_PUBLIC_TARGET_DIR; do
  test -n "${!name:-}" || { echo "Missing secret: $name" >&2; exit 1; }
done
TARGET="${HOSTINGER_PUBLIC_TARGET_DIR%/}"
# Only the preconfigured public webroot may be touched. Never mirror-delete its root.
if [[ ! "$TARGET" =~ ^[A-Za-z0-9_./-]+$ ]] || [[ "$TARGET" == '/' || "$TARGET" == '.' || "$TARGET" == *'..'* || "${TARGET,,}" == *dashboard* || "${TARGET##*/}" != 'public_html' ]]; then
  echo 'Refusing an ambiguous or unsafe landing target.' >&2; exit 1
fi
test -s source/landing/dist/release-manifest.json
# Existing dashboard is read, never downloaded as a backup and never written.
dashboard_html="$(curl -fsSL --retry 2 --connect-timeout 10 --max-time 30 https://dashboard.motoristaops.com.br/)"
grep -qF 'Plano operacional' <<<"$dashboard_html"
lftp -u "$HOSTINGER_USERNAME,$HOSTINGER_PASSWORD" -p "$HOSTINGER_PORT" "sftp://$HOSTINGER_HOST" <<LFTP
set cmd:fail-exit yes
set sftp:auto-confirm yes
set net:max-retries 2
set net:timeout 20
cls -1 "$TARGET"
mirror --reverse --verbose source/landing/dist/assets "$TARGET/assets"
put source/landing/dist/robots.txt -o "$TARGET/robots.txt"
put source/landing/dist/sitemap.xml -o "$TARGET/sitemap.xml"
put source/landing/dist/.htaccess -o "$TARGET/.htaccess"
put source/landing/dist/release-manifest.json -o "$TARGET/release-manifest.json"
put source/landing/dist/index.html -o "$TARGET/.landing-incoming.html"
mv "$TARGET/.landing-incoming.html" "$TARGET/index.html"
# Remove obsolete landing assets only after the replacement HTML is in place.
mirror --reverse --delete --verbose source/landing/dist/assets "$TARGET/assets"
rm -rf "$TARGET/landing-v3"
rm -rf "$TARGET/hero"
bye
LFTP
