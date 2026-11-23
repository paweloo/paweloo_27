#!/bin/sh
# Renders a CV page to a one-page A4 PDF with headless Chrome (text-based, so ATS can read it).
#   sh cv/build.sh              -> cv/index.html     -> Pawel-Zajk-CV.pdf (also copied to the website)
#   sh cv/build.sh lufthansa    -> cv/lufthansa.html -> Pawel-Zajk-CV-Lufthansa.pdf
set -e
cd "$(dirname "$0")"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
NAME="${1:-index}"

if [ "$NAME" = "index" ]; then
  OUT="Pawel-Zajk-CV.pdf"
else
  # "lufthansa" -> "Lufthansa"
  OUT="Pawel-Zajk-CV-$(echo "$NAME" | cut -c1 | tr '[:lower:]' '[:upper:]')$(echo "$NAME" | cut -c2-).pdf"
fi

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=3000 \
  --print-to-pdf="$PWD/$OUT" \
  "file://$PWD/$NAME.html" 2>/dev/null

if [ "$NAME" = "index" ]; then
  # The portfolio's Resume link serves this copy
  cp "$PWD/$OUT" ../public/Pawel-Zajk-CV.pdf
  echo "Wrote $PWD/$OUT (and public/Pawel-Zajk-CV.pdf)"
else
  echo "Wrote $PWD/$OUT"
fi
