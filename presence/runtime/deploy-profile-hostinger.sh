#!/usr/bin/env bash
set -euo pipefail

SLUG="${1:-}"
HTML_FILE="${2:-}"
MANIFEST_FILE="${3:-}"
REMOTE_BASE="${4:-}"

for name in HOSTINGER_HOST HOSTINGER_USERNAME HOSTINGER_PASSWORD HOSTINGER_PORT; do
  test -n "${!name:-}" || { echo "Missing environment variable: $name"; exit 1; }
done

[[ "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || { echo "Invalid profile slug"; exit 1; }
case "$SLUG" in
  painel|presenca|web|assets|brand-system-v2|dashboard|temp)
    echo "Reserved profile slug"
    exit 1
    ;;
esac

test -f "$HTML_FILE" && test -s "$HTML_FILE" || { echo "Missing HTML artifact"; exit 1; }
test -f "$MANIFEST_FILE" && test -s "$MANIFEST_FILE" || { echo "Missing publication manifest"; exit 1; }
test -n "$REMOTE_BASE" || { echo "Missing remote base"; exit 1; }

manifest_slug="$(jq -r '.slug // empty' "$MANIFEST_FILE")"
manifest_hash="$(jq -r '.sha256 // empty' "$MANIFEST_FILE")"
manifest_bytes="$(jq -r '.bytes // empty' "$MANIFEST_FILE")"
template_key="$(jq -r '.templateKey // empty' "$MANIFEST_FILE")"
template_version="$(jq -r '.templateVersion // empty' "$MANIFEST_FILE")"

test "$manifest_slug" = "$SLUG" || { echo "Manifest slug mismatch"; exit 1; }
[[ "$manifest_hash" =~ ^[a-f0-9]{64}$ ]] || { echo "Invalid manifest SHA-256"; exit 1; }
[[ "$manifest_bytes" =~ ^[0-9]+$ ]] || { echo "Invalid manifest byte count"; exit 1; }
test -n "$template_key" || { echo "Missing manifest template key"; exit 1; }
[[ "$template_version" =~ ^[1-9][0-9]*$ ]] || { echo "Invalid manifest template version"; exit 1; }

actual_hash="$(sha256sum "$HTML_FILE" | awk '{print $1}')"
actual_bytes="$(wc -c < "$HTML_FILE" | tr -d '[:space:]')"
test "$actual_hash" = "$manifest_hash" || { echo "HTML hash does not match manifest"; exit 1; }
test "$actual_bytes" = "$manifest_bytes" || { echo "HTML byte count does not match manifest"; exit 1; }

stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT
cp "$HTML_FILE" "$stage/index.html"

remote_dir="${REMOTE_BASE%/}/$SLUG"
lftp -u "$HOSTINGER_USERNAME,$HOSTINGER_PASSWORD" -p "$HOSTINGER_PORT" "sftp://$HOSTINGER_HOST" <<LFTP
set sftp:auto-confirm yes
set net:max-retries 2
set net:timeout 20
mkdir -p "$remote_dir"
mirror --reverse --delete --verbose "$stage" "$remote_dir"
bye
LFTP

echo "Deployed profile artifact: $SLUG"
