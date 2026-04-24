#!/usr/bin/env bash
set -euo pipefail

rm -rf dist && mkdir -p dist

bun build ./generateSnakeAnimation.ts --outfile=dist/generateSnakeAnimation.js --target=node --external=canvas --external=gifsicle --external=gif-encoder-2

bun build ./cli.ts --outfile=dist/cli.js --target=node --external=canvas --external=gifsicle --external=gif-encoder-2 --external=./generateSnakeAnimation.js
chmod +x dist/cli.js

bunx dts-bundle-generator --out-file dist/generateSnakeAnimation.d.ts --project tsconfig.json --no-banner --no-check generateSnakeAnimation.ts

cat > dist/package.json << EOF
{
  "name": "generate-snake-animation",
  "version": "$(node -p "require('../../package.json').version")",
  "bin": { "snk": "cli.js" },
  "type": "module",
  "main": "./generateSnakeAnimation.js",
  "types": "./generateSnakeAnimation.d.ts",
  "peerDependencies": {
    "canvas": "3.2.0",
    "gif-encoder-2": "1.0.5",
    "gifsicle": "5.3.0"
  },
  "peerDependenciesMeta": {
    "canvas": { "optional": true },
    "gif-encoder-2": { "optional": true },
    "gifsicle": { "optional": true }
  }
}
EOF
