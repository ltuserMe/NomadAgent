FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies needed for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy workspace dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Copy prisma schema and generate client
COPY apps/backend/prisma ./apps/backend/prisma/
RUN pnpm --filter @travel/api prisma:generate

# Copy source code
COPY apps/backend ./apps/backend/

WORKDIR /app/apps/backend

# Expose application port
EXPOSE 3001

# Start development server with hot reload
CMD ["pnpm", "dev"]
