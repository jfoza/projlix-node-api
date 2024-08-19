CREATE SCHEMA IF NOT EXISTS "project";

create table "project".sections
(
    id uuid default uuid_generate_v4() not null primary key,
    project_id uuid not null constraint "SectionProjectIdFk" references "project".projects on delete cascade,
    color_id uuid not null constraint "SectionColorIdFk" references general.colors,
    icon_id uuid not null constraint "SectionIconIdFk" references general.icons,
    name varchar(255) not null,
    section_order bigint,
    creator_id uuid,
    updater_id uuid,
    created_at timestamp(0) default now() not null,
    updated_at timestamp(0) default now() not null
);