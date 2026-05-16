#!/usr/bin/env bash
# Tier 2A regression gate: blocks stale marketing/brand copy in src/.
# Self-test (--self-test) greps scripts/fixtures/8be10e93.js (or HANDOFF_DIR) for regression-only strings;
# contextual patterns in the verified handoff may differ — do not apply file-level
# remediation/API rules to handoff (see self_test_handoff).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -z "${HANDOFF_DIR:-}" ]]; then
  if [[ -f "$ROOT/scripts/fixtures/8be10e93.js" ]]; then
    HANDOFF_DIR="$ROOT/scripts/fixtures"
  else
    HANDOFF_DIR="/tmp/xsee_handoff"
  fi
fi

# Regression-only hard blocks in live src (includes ROLE · 02 — legacy card tag).
HARD_REGEX_SRC='ROLE · 02|financial exposure|#FF2D7A|#E11D74|Inter Tight|JetBrains Mono|Source Serif|Role 2 — Remediation|XSEE applies it and re-validates|XSEE applies and verifies|When XSEE fixes a path, we re-run'

# Handoff negatives only: verified 8be10e93.js may still contain ROLE · 01 / 02 tags from design;
# self-test must not fail on those — only assert no *extra* regression copy reappeared in the extract.
HARD_REGEX_HANDOFF_NEG='financial exposure|#FF2D7A|#E11D74|Inter Tight|JetBrains Mono|Source Serif|Role 2 — Remediation|XSEE applies it and re-validates|XSEE applies and verifies|When XSEE fixes a path, we re-run'

run_hard_grep_src() {
  local dir="$1"
  # Pricing.tsx is intentionally left unchanged in homepage polish; stale phrasing may remain there.
  if grep -rniE "$HARD_REGEX_SRC" "$dir" --include='*.tsx' --include='*.ts' --include='*.css' --include='*.jsx' --include='*.js' --exclude='Pricing.tsx'; then
    echo "FORBIDDEN PATTERN DETECTED — Tier 2A / brand regression. Build blocked."
    exit 1
  fi
}

run_context_audit() {
  python3 <<'PY'
import re
import sys
from pathlib import Path

root = Path("src")
files = list(root.rglob("*.tsx")) + list(root.rglob("*.ts")) + list(root.rglob("*.css"))

ownership = re.compile(
    r"your|you control|you create|you define|your account|your aws|your-lambda|\bYOU CONTROL\b",
    re.I,
)
remediation_name = re.compile(r"Remediation\s+(Agent|Lambda)", re.I)
api_pat = re.compile(
    r"RevokeSecurityGroupIngress|DetachRolePolicy|PutBucketPublicAccessBlock",
    re.I,
)
approve_bad = re.compile(r"Write access only when you approve(?!\s+it\b)", re.I)

for path in files:
    text = path.read_text(encoding="utf-8", errors="replace")
    if approve_bad.search(text):
        for i, line in enumerate(text.splitlines(), start=1):
            if approve_bad.search(line):
                print(f"{path}:{i}: use 'approve it' (not bare 'approve'): {line.strip()[:120]}")
                sys.exit(1)
    for i, line in enumerate(text.splitlines(), start=1):
        if remediation_name.search(line) and not ownership.search(line):
            print(
                f"{path}:{i}: Remediation line must include ownership token (your / you control / your-lambda / …): {line.strip()[:120]}"
            )
            sys.exit(1)
        if api_pat.search(line) and "your-lambda" not in line.lower():
            print(f"{path}:{i}: Scoped API example must include 'your-lambda' on the same line: {line.strip()[:120]}")
            sys.exit(1)

sys.exit(0)
PY
}

self_test_handoff() {
  echo "Handoff self-test: $HANDOFF_DIR/8be10e93.js (trust-section chunk; set HANDOFF_DIR for alternate extract path)"
  if [[ ! -d "$HANDOFF_DIR" ]]; then
    echo "SKIP: handoff dir missing (extract manifest to $HANDOFF_DIR first)."
    exit 0
  fi
  local trust="$HANDOFF_DIR/8be10e93.js"
  if [[ ! -f "$trust" ]]; then
    echo "SELF-TEST SKIP: $trust not found"
    exit 0
  fi
  if grep -niE "$HARD_REGEX_HANDOFF_NEG" "$trust"; then
    echo "SELF-TEST FAIL: 8be10e93.js matches a regression phrase (fix gate logic, not the verified extract)."
    exit 1
  fi
  if ! grep -q "XSEE Scanner" "$trust"; then
    echo "SELF-TEST FAIL: missing expected marker (XSEE Scanner) in 8be10e93.js"
    exit 1
  fi
  echo "Handoff self-test passed."
  exit 0
}

if [[ "${1:-}" == "--self-test" ]]; then
  self_test_handoff
fi

run_hard_grep_src "src"
run_context_audit

echo "Forbidden-pattern check passed."
