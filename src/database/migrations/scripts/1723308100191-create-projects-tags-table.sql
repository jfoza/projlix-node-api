CREATE SCHEMA IF NOT EXISTS "project";

create table "project".projects_tags
(
    id uuid default uuid_generate_v4() not null primary key,
    project_id uuid not null constraint "ProjectsTagsProjectIdFk" references "project".projects,
    tag_id uuid not null constraint "ProjectsTagsTagIdFk" references general.tags,
    created_at timestamp(0) default now() not null,
    updated_at timestamp(0) default now() not null
);