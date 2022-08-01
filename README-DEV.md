# NestJS API with MySQL

```bash
# Install dependencies
yarn install

# Run all test files
yarn test
yarn test:e2e

# Run the development server
yarn dev
```

# Development

## Add MikroORM and Database Driver

```bash

yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/sqlite @mikro-orm/mysql @mikro-orm/postgresql @mikro-orm/seeder @mikro-orm/migrations @mikro-orm/nestjs @mikro-orm/reflection @mikro-orm/sql-highlighter

```

## Config .env with specific database driver

```bash
# Example configuration for mysql
DB_NAME=nestjs_api
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=5432
DB_USER=adminz
DB_PASS=123123

# Example configuration for postgresql
DB_NAME=nestjs_api
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_USER=adminz
DB_PASS=123123
```

## Generate initials migration files

```bash
yarn mikro-orm migration:create --initial
```

## Run migraition to generate tables and data

```bash
yarn mikro-orm migration:fresh --seed
```
