# NestJS API with MikroORM

## Development process

```bash
# We can clone branch `auth-mysql` for mysql database
git clone -b auth-mysql git@github.com:ravuthz/nestjs-mikro-orm-api.git mikro-orm-auth-api

# Or clone branch `auth-postgresql` for postgresql database
git clone -b auth-postgresql git@github.com:ravuthz/nestjs-mikro-orm-api.git mikro-orm-auth-api

# Go project directory
cd mikro-orm-auth-api

# Install dependencies
yarn install

# Start local server
yarn start:dev

# Test api with CURL
curl -I localhost:3000/api

# Config database
cp sample.env .env

# Refresh Migration for Development only
yarn mikro-orm migration:fresh --seed
# or
yarn mikro-orm schema:fresh --run --seed
```

### Generate resources

```bash
# Generate set of Note resource ( module, controller, service, entity, dto, ...)
yarn nest generate resource Note

# Generate Note Repository
yarn nest generate class NoteRepository note --flat --no-spec

# Create Note mock manually for testing with static data
touch ./src/note/note.mock.ts
```

### More about nestjs generate cli

```bash
yarn nest generate --help
```

### Generate Migration & Seeder

```bash
# Generate migration after completed create model with fields
yarn mikro-orm migration:create

# Generate seeder for user
yarn mikro-orm seeder:create note

# Create factory for user manually
touch ./src/database/factories/NoteFactory.ts
```

### Test api with authentication

```bash
# API - request to login
curl -L -X POST 'localhost:9000/api/auth/login' -H 'Content-Type: application/json' --data-raw '{
    "username": "adminz",
    "password": "123123"
}'

# API - request to notes with access token
curl -L -X GET 'localhost:9000/api/notes' -H 'Authorization: Bearer $token$'

```

### MySQL - Create user with permissions

```sql
CREATE DATABASE 'nestjs_db';
CREATE USER 'adminz'@'%' IDENTIFIED WITH mysql_native_password BY '123123';
GRANT ALL PRIVILEGES ON 'nestjs_db'.* TO 'adminz'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

SHOW GRANTS FOR 'adminz'@'%';
```

### PostgreSQL - Create user with permissions

```sql
CREATE USER "adminz" WITH ENCRYPTED PASSWORD "123123";
ALTER USER "adminz" WITH SUPERUSER CREATEDB CREATEROLE;
GRANT ALL PRIVILEGES ON DATABASE "nestjs_db" TO "adminz";
\du+
```
