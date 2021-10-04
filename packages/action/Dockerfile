FROM node:16-slim

WORKDIR /github/snk

RUN    npm install canvas@2.8.0 gifsicle@5.2.0 --no-save --no-package-lock

COPY   dist /github/snk/

CMD    ["node", "/github/snk/index.js"]
