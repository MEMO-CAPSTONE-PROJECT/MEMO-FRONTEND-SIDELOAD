# Stage 1: Install dependencies
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Build
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build

# Stage 3: Production-ready Image
FROM node:22-slim
WORKDIR /app

# Copy only required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Use non-root user for security
RUN useradd -m appuser
USER appuser

# Expose port and run
EXPOSE 3000 3333
CMD ["npm","run","start"]
