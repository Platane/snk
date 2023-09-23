FROM node:20-slim as builder

WORKDIR /app

COPY package.json yarn.lock ./

COPY tsconfig.json ./

COPY packages packages

RUN export YARN_CACHE_FOLDER="$(mktemp -d)" \
    && yarn install --frozen-lockfile \
    && rm -r "$YARN_CACHE_FOLDER"

RUN yarn build:action





FROM node:20-slim

WORKDIR /action-release

RUN export YARN_CACHE_FOLDER="$(mktemp -d)" \
    && yarn add canvas@2.11.2 gifsicle@5.3.0 --no-lockfile \
    && rm -r "$YARN_CACHE_FOLDER"

COPY --from=builder /app/packages/action/dist/ /action-release/

CMD ["node", "/action-release/index.js"]

