CREATE SCHEMA IF NOT EXISTS "project";

create table "project".projects
(
    id uuid default uuid_generate_v4() not null primary key,
    icon_id uuid not null constraint "ProjectIconIdFk" references "general".icons,
    name varchar(255) not null,
    description varchar(255),
    unique_name varchar(255) not null,
    image varchar(255),
    active boolean default true not null,
    creator_id uuid,
    updater_id uuid,
    created_at timestamp(0) default now() not null,
    updated_at timestamp(0) default now() not null
);
