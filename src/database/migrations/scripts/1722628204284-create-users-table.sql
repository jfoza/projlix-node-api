CREATE SCHEMA IF NOT EXISTS "user_conf";

CREATE TABLE IF NOT EXISTS "user_conf".users
(
    id uuid default uuid_generate_v4() not null primary key,
    profile_id uuid constraint "UsersProfileIdFk" references "user_conf".profiles on delete restrict,
    name varchar not null,
    short_name varchar,
    email varchar not null constraint "UQ_97672ac88f789774dd47f7c8be3" unique,
    password varchar not null,
    active boolean not null default true,
    creator_id uuid,
    updater_id uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);