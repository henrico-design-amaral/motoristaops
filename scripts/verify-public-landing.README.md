# Retry-safe public landing verification

`verify-public-landing.sh` validates the public landing, Open Graph JPEG assets, icon contracts and dashboard preservation after deployment.

The script intentionally does not use `set -e`: transient CDN or asset propagation failures are reported and retried for the full convergence window instead of aborting the deploy on the first failed request.
