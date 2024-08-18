CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".team_users
(
    id uuid default uuid_generate_v4() not null primary key,
    user_id uuid not null constraint "TeamUsersUserIdFk" references "user_conf".users on delete cascade,
    creator_id uuid,
    updater_id uuid,
    can boolean not null default true,
    created_at timestamp(0) default now() not null,
    updated_at timestamp(0) default now() not null
);