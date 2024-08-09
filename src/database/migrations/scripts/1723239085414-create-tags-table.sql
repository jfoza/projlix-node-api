CREATE SCHEMA IF NOT EXISTS "general";

create table "general".tags
(
    id uuid default uuid_generate_v4() not null primary key,
    color_id uuid not null constraint "TagColorIdFk" references "general".colors,
    name varchar(255) not null,
    active boolean default true not null,
    creator_id uuid,
    updater_id uuid,
    created_at timestamp(0) default now() not null,
    updated_at timestamp(0) default now() not null
);