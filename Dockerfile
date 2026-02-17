FROM oven/bun:1.3.9 AS base
WORKDIR /app

# ---- Install dependencies ----

FROM base AS deps 
COPY package.json bun.lock ./
RUN ["bun","install"]

# ---- Build stage ---

FROM base AS builder 
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments
ARG DB_ENGINE
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG AUTH_URL
ARG AUTH_SECRET
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ARG AUTH_GOOGLE_ISSUER
ARG RESEND_API_KEY
ARG NEXT_TELEMETRY_DISABLED

# Set environment variables for the build process
ENV DB_ENGINE=${DB_ENGINE} \
    DB_HOST=${DB_HOST} \
    DB_PORT=${DB_PORT} \
    DB_USER=${DB_USER} \
    DB_PASSWORD=${DB_PASSWORD} \
    DB_NAME=${DB_NAME} \
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} \
    AUTH_URL=${AUTH_URL} \
    AUTH_SECRET=${AUTH_SECRET} \
    AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID} \
    AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET} \
    AUTH_GOOGLE_ISSUER=${AUTH_GOOGLE_ISSUER} \
    RESEND_API_KEY=${RESEND_API_KEY} \
    NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

# Generate prisma client
RUN ["bunx","prisma","generate"]

# Build Next.js
RUN ["bun","run","build"]

EXPOSE 3000
CMD [ "bun","run","dev" ]
