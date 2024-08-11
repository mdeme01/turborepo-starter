FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm i --frozen-lockfile

COPY . .

WORKDIR /app/apps/server

RUN pnpm i --frozen-lockfile

WORKDIR /app

RUN pnpm build --filter=@repo/server

EXPOSE 3000

WORKDIR /app/apps/server

CMD ["node", "./dist/index.js"]
