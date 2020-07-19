FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

COPY packages/action/dist/* ./generate-snake-game-from-github-contribution-grid/

CMD ["node", "generate-snake-game-from-github-contribution-grid/index.js"]

