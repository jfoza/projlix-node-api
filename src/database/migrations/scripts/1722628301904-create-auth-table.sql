CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".auth
(
    id uuid default uuid_generate_v4() not null primary key,
    user_id uuid constraint "SessionsUserIdFk" references "user_conf".users on delete cascade not null,
    initial_date timestamp not null,
    final_date timestamp,
    token text not null,
    ip_address inet not null,
    auth_type varchar(20) not null
        constraint ck_type
            check ((auth_type)::text = ANY
        ((ARRAY [
        'EMAIL_PASSWORD'::character varying,
        'GOOGLE'::character varying
        ])::text[])),
    active boolean default true,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);