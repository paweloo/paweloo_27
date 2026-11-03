#!/bin/sh
# Renders cv/index.html to a one-page A4 PDF with headless Chrome (text-based, so ATS can read it).
set -e
cd "$(dirname "$0")"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=3000 \
  --print-to-pdf="$PWD/Pawel-Zajk-CV.pdf" \
  "file://$PWD/index.html" 2>/dev/null

# The portfolio's Resume link serves this copy
cp "$PWD/Pawel-Zajk-CV.pdf" ../public/Pawel-Zajk-CV.pdf

echo "Wrote $PWD/Pawel-Zajk-CV.pdf (and public/Pawel-Zajk-CV.pdf)"
