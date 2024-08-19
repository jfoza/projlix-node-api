CREATE SCHEMA IF NOT EXISTS "project";

create table "project".cards
(
    id          uuid          default uuid_generate_v4() not null primary key,
    code        varchar(255)  not null,
    section_id  uuid          not null constraint "CardsSectionIdFk" references "project".sections,
    user_id     uuid          not null constraint "CardsUserIdFk" references user_conf.users,
    tag_id uuid not null constraint "CardsTagProjectIdFk" references "general".tags,
    description varchar(255)  not null,
    status      varchar(255)  not null,
    limit_date  date,
    card_order  bigint,
    creator_id  uuid,
    updater_id  uuid,
    created_at  timestamp(0) default now() not null,
    updated_at  timestamp(0) default now() not null
);