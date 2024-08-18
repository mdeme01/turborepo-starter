FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm i --frozen-lockfile

COPY . .

WORKDIR /app/apps/web

RUN pnpm i --frozen-lockfile

WORKDIR /app

RUN pnpm build --filter=@repo/web-react

EXPOSE 3001

WORKDIR /app/apps/web

CMD ["npx", "serve", "dist"]
