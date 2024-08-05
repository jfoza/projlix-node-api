CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".profiles
(
    id uuid default uuid_generate_v4() not null primary key,
    profile_type_id uuid constraint "ProfilesProfileTypeIdFk" references "user_conf".profile_types on delete restrict,
    description varchar not null,
    unique_name varchar unique not null,
    active boolean default true,
    creator_id uuid,
    updater_id uuid,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);