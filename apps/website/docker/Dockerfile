# Shared multi-stage Dockerfile for Next.js standalone apps in monorepos.
#
# - Build starts from the repo root with the app folder selected via build arg.
# - NODE_VERSION comes from .node-version (node's idiomatic version file).
#
# Usage, invoked from repo root:
#   docker build --build-arg NODE_VERSION=$(cat .node-version) --build-arg APP=website --platform linux/arm64 -t acme/website .
#
ARG NODE_VERSION

# ── BUILD ─────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS builder
ARG APP
WORKDIR /repo
ENV CI=1
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
# Populate virtual pnpm store (see https://pnpm.io/cli/fetch)
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch
# Copy sources and install dependencies from virtual store
COPY package.json turbo.json ./
COPY packages packages
COPY apps/${APP} apps/${APP}
RUN pnpm install --offline
# Build
RUN pnpm exec turbo run build --filter=./apps/${APP}

# ── RUNTIME ─────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS runner
ARG APP
WORKDIR /repo
ENV NODE_ENV=production
# Copy output files from builder stage
# Monorepo layout is preserved under outputFileTracingRoot:
# /repo/apps/${APP}/.next/standalone/
# ├── node_modules
# └── apps
#     └── ${APP}
#         ├── .next       # while not using a separate CDN, static files need to go here
#         └── server.js
COPY --from=builder --chown=node:node /repo/apps/${APP}/.next/standalone ./
COPY --from=builder --chown=node:node /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
# Startup
WORKDIR /repo/apps/${APP}
USER node
EXPOSE 3000
# Next's standalone server binds to $HOSTNAME, which Docker sets to the
# container ID — pin it so the server listens on all interfaces (incl.
# loopback, where the compose healthcheck probes).
ENV HOSTNAME=0.0.0.0
ENTRYPOINT ["node", "server.js"]
