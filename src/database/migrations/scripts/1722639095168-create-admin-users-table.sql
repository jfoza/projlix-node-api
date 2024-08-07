CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".admin_users
(
    id uuid default uuid_generate_v4() not null primary key,
    user_id uuid constraint "AdminUsersUserIdFk" references "user_conf".users on delete cascade,
    creator_id uuid,
    updater_id uuid,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);