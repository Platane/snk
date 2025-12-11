FROM oven/bun:1.3.4-slim AS builder

WORKDIR /app

COPY package.json bun.lock ./

COPY tsconfig.json ./

COPY packages packages

RUN bun install --no-cache --frozen-lockfile

RUN bun run build:action





FROM oven/bun:1.3.4-slim

WORKDIR /action-release

RUN bun add canvas@3.2.0 gifsicle@5.3.0 --no-lockfile --no-cache

COPY --from=builder /app/packages/action/dist/ /action-release/

CMD ["bun", "/action-release/index.js"]
