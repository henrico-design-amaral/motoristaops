# Deploy verification hardening — 2026-09-16

The landing deployment completed successfully, but the inline post-deploy gate could exit on the first transient asset/header failure because it inherited `set -e`. The verification logic now records asset/MIME failures and retries across the intended convergence window before failing.
