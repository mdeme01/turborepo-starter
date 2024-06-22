#!/bin/bash

set -e
set -u

function create_databases() {
    database=$1
    password=$2
    echo "Creating user and database '$database' with password '$password'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $database with encrypted password '$password';
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [ -n "$POSTGRES_DATABASES" ]; then
    echo "Creating databases: $POSTGRES_DATABASES"
    for db in $(echo $POSTGRES_DATABASES | tr ',' ' '); do
        user=$(echo $db | awk -F":" '{print $1}')
        pswd=$(echo $db | awk -F":" '{print $2}')
        if [[ -z "$pswd" ]]
            then
                pswd=$user
        fi

        echo "User is $user and password is $pswd"
        create_databases $user $pswd
    done
    echo "Databases created"
fi
