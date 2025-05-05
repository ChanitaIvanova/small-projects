#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER docker;
    CREATE DATABASE birdsdb;
    GRANT ALL PRIVILEGES ON DATABASE birdsdb TO docker;
EOSQL