CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public VERSION '1.1';
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS hstore;

ALTER DATABASE postgres SET timezone TO 'Brazil/East';
