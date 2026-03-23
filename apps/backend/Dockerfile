FROM node:20-alpine

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Native build dependencies for modules like argon2
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy only files needed to resolve backend workspace dependencies first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma/

# Install only backend package dependencies within the workspace graph
RUN PRISMA_SKIP_POSTINSTALL_GENERATE=1 pnpm install --filter @travel/api... --frozen-lockfile

# Generate Prisma client after dependencies and schema are present
RUN pnpm --filter @travel/api prisma:generate

# Copy backend source last so code changes do not invalidate dependency layers
COPY apps/backend ./apps/backend/

WORKDIR /app/apps/backend

EXPOSE 3001

CMD ["pnpm", "dev"]
