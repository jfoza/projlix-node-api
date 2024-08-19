CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".projects_team_users
(
    id uuid default uuid_generate_v4() not null primary key,
    team_user_id uuid not null constraint "ProjectsTeamUsersTeamUserIdFk" references "user_conf".team_users,
    project_id   uuid not null constraint "ProjectsTeamUsersProjectIdIdFk" references "project".projects,
    created_at   timestamp(0) default now() not null,
    updated_at   timestamp(0) default now() not null
);