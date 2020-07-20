FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

COPY   tsconfig.json package.json yarn.lock /github/platane.aa/
COPY   packages /github/platane.aa/packages

RUN    ( \ 
    cd /github/platane.aa \
    && find . \
    && yarn install --frozen-lockfile \
    && yarn build:action \
    && mv packages/action/dist/* . \
    && rm -rf packages tsconfig.json package.json yarn.lock node_modules \
    )

CMD    ["node", "/github/platane.aa/index.js"]
