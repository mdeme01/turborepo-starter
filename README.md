# Turborepo starter

## What's inside?

This Turborepo includes the following `apps`, `packages` and `tools`:

### Apps

- `@repo/frontend-react`: React app
- `@repo/backend`: Hono server using the tRPC API

### Packages

- `@repo/web-ui`: React component library, featuring [shadcn/ui](https://ui.shadcn.com/)
- `@repo/api`: tRPC API
- `@repo/db`: Drizzle ORM interacting with a Postgres db
- `@repo/lib`: External Third party libraries
- `@repo/env`: env config

### Tools

- `@repo/typescript`: [TypeScript](https://www.typescriptlang.org/) configurations
- `@repo/eslint`: [ESLint](https://eslint.org/) configurations
- `@repo/tailwind`: [Tailwind](https://tailwindcss.com/) configurations

### Develop

First, install packages:

```
pnpm i
```

Create a `.env` file and fill in the variables:

```
cp .env.example .env
```

Create the Postgres db with Docker, then initialize it:

```
docker compose up
pnpm migrate
pnpm seed
```

To develop all apps, run the following command:

```
pnpm dev
```

### Build

To build all apps, run the following command:

```
pnpm build
```
