#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
npm run build
sudo rsync -a --delete dist/ /var/www/ag-gunlugu/
echo "Yayınlandı: $(date)"
