FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

WORKDIR /github/snk

RUN    npm install canvas@2.6.1 --no-save --no-package-lock

COPY   dist /github/snk/

CMD    ["node", "/github/snk/index.js"]
