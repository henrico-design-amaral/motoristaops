#!/usr/bin/env bash
set -euo pipefail

required=(
  "AGENTS.md"
  "DESIGN.md"
  "VISUAL_LOCK.json"
  "foundation/README.md"
  "foundation/KERNEL.md"
  "foundation/REQUEST_RESOLVER.md"
  "foundation/DECISION_MEMORY.md"
  "foundation/CURATION_SYSTEM.md"
  "foundation/EXECUTION_PROTOCOL.md"
  "foundation/QUALITY_GATES.md"
  "foundation/FAILURE_MEMORY.md"
  "foundation/PROJECT_BOOTSTRAP.md"
  "foundation/foundation.manifest.json"
  "foundation/request-contract.schema.json"
  "foundation/quality-gates.json"
  "curation/README.md"
  "curation/PATTERN_LIBRARY.md"
  "curation/ANTI_PATTERNS.md"
  "curation/REFERENCE_REGISTRY.json"
  "brand-system-v2/ORCHESTRATOR.md"
  "brand-system-v2/GOVERNANCE.md"
  "brand-system-v2/CANONICAL_SUMMARY.md"
)

for f in "${required[@]}"; do
  test -s "$f" || { echo "Missing foundation file: $f" >&2; exit 1; }
done

python - <<'PY'
import json
from pathlib import Path

for name in [
    "VISUAL_LOCK.json",
    "foundation/foundation.manifest.json",
    "foundation/request-contract.schema.json",
    "foundation/quality-gates.json",
    "curation/REFERENCE_REGISTRY.json",
]:
    json.loads(Path(name).read_text(encoding="utf-8"))

lock=json.loads(Path("VISUAL_LOCK.json").read_text(encoding="utf-8"))
assert lock["status"] == "READY"
assert lock["request_resolver"] == "foundation/REQUEST_RESOLVER.md"
assert lock["failure_memory"] == "foundation/FAILURE_MEMORY.md"
PY

grep -qF 'foundation/KERNEL.md' AGENTS.md
grep -qF 'literal-first' AGENTS.md
grep -qF 'somente **brasão oficial + MotoristaOPS**' DESIGN.md
grep -qF '44–48 CSS px' DESIGN.md
grep -qF 'Não existe Brand Book V12' DESIGN.md
grep -qF 'Não existe Brand Book V12' foundation/KERNEL.md
grep -qF 'FM-012' foundation/FAILURE_MEMORY.md

if grep -R -n -E 'Brand Book V12 is historical|Brand Book V12 is subordinate historical' AGENTS.md DESIGN.md VISUAL_LOCK.json brand-system-v2 foundation; then
  echo "Invalid legacy V12 authority found." >&2
  exit 1
fi

echo "MotoristaOPS Foundation gate: PASS"
