CREATE SCHEMA IF NOT EXISTS "general";

create table "general".icons
(
    id uuid default uuid_generate_v4() not null primary key,
    type varchar(255) not null,
    name varchar(255) not null,
    creator_id uuid,
    updater_id uuid,
    created_at timestamp(0) default now() not null,
    updated_at timestamp(0) default now() not null
);