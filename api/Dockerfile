FROM node:lts
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install 
COPY . .

FROM node:lts-slim
WORKDIR /app
COPY --from=0 /app/ ./
EXPOSE 3000
CMD ["node", "./index.js"]