FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

COPY   tsconfig.json package.json yarn.lock ./generate-snake-game-from-github-contribution-grid/
COPY   packages ./generate-snake-game-from-github-contribution-grid/packages/

RUN    ( cd ./generate-snake-game-from-github-contribution-grid ; yarn install --frozen-lockfile )

RUN    ( cd ./generate-snake-game-from-github-contribution-grid ; yarn build:action )

CMD    ["node", "./generate-snake-game-from-github-contribution-grid/packages/action/dist/index.js"]

