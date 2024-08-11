#!/bin/bash

set -e
set -u

echo "Creating user and database '$POSTGRES_DATABASE' with password '$POSTGRES_PASSWORD'"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER $POSTGRES_DATABASE with encrypted password '$POSTGRES_PASSWORD';
    CREATE DATABASE $POSTGRES_DATABASE;
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DATABASE TO $POSTGRES_DATABASE;
EOSQL
