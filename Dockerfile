FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

COPY   tsconfig.json package.json yarn.lock /github/snk/
COPY   packages /github/snk/packages

RUN    ( \ 
    cd /github/snk \
    && find . \
    && yarn install --frozen-lockfile \
    && yarn build:action \
    && mv packages/action/dist/* . \
    && rm -rf packages tsconfig.json package.json yarn.lock node_modules \
    )

CMD    ["node", "/github/snk/index.js"]
