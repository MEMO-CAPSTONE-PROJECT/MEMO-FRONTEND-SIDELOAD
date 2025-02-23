# Stage 1: Install dependencies
FROM node:22-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Build
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build && npm prune --omit=dev

# Stage 3: Production-ready Image
FROM node:22-slim
WORKDIR /app

# Copy built app only
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Expose port and run
EXPOSE 3000
CMD ["node", "server.js"]
# Stage 1: install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

# Stage 2: build
FROM node:22-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY public ./public
COPY package.json next.config.js tsconfig.json ./
RUN npm run build

# Stage 3: run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
CMD ["npm", "run", "start"]
# Stage 1: Install dependencies
FROM node:22-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Build
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build && npm prune --omit=dev

# Stage 3: Production-ready Image
FROM node:22-slim
WORKDIR /app

# Copy built app only
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Expose port and run
EXPOSE 3000
CMD ["node", "server.js"]
