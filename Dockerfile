FROM node:14-slim

RUN    apt-get update \
    && apt-get install -y --no-install-recommends gifsicle graphicsmagick \
    && rm -rf /var/lib/apt/lists/* 

COPY packages/action/dist/* ./github-contribution-grid-snake

CMD ["node", "github-contribution-grid-snake/index.js"]

