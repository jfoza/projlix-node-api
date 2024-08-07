CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".rules
(
    id uuid default uuid_generate_v4() not null primary key,
    description varchar not null constraint "UQ_029f52e88a42d77eba77064466d" unique,
    subject varchar,
    action varchar,
    active boolean default true,
    creator_id uuid,
    updater_id uuid,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);