create schema if not exists city;

create table city.states
(
    id          uuid         default uuid_generate_v4() not null primary key,
    description varchar(255)                            not null,
    uf          varchar(2)                              not null,
    created_at  timestamp(0) default now()              not null,
    updated_at  timestamp(0) default now()              not null
);