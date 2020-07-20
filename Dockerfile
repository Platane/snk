FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

COPY   tsconfig.json package.json yarn.lock /github/platane.aa/
COPY   packages /github/platane.aa/

RUN    ( cd /github/platane.aa/ ; yarn install --frozen-lockfile )

RUN    ( cd /github/platane.aa/ ; yarn build:action )

CMD    ["find", "/github"]
# CMD    ["node", "./generate-snake-game-from-github-contribution-grid/packages/action/dist/index.js"]

