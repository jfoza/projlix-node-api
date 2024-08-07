CREATE SCHEMA IF NOT EXISTS "user_conf";

create table "user_conf".profiles_rules
(
    id uuid default uuid_generate_v4() not null primary key,
    profile_id uuid constraint "ProfilesRulesProfileIdFk" references "user_conf".profiles on delete cascade,
    rule_id uuid constraint "ProfilesRulesRuleIdFk" references "user_conf".rules on delete cascade,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);