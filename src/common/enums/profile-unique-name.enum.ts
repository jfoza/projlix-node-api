const ADMIN_MASTER: string = 'ADMIN_MASTER';
const PROJECT_MANAGER: string = 'PROJECT_MANAGER';
const TEAM_LEADER: string = 'TEAM_LEADER';
const PROJECT_MEMBER: string = 'PROJECT_MEMBER';

export const ProfileUniqueNameEnum = {
  ADMIN_MASTER,
  PROJECT_MANAGER,
  TEAM_LEADER,
  PROJECT_MEMBER,

  PROFILES_BY_ADMIN_MASTER: [
    ADMIN_MASTER,
    PROJECT_MANAGER,
    TEAM_LEADER,
    PROJECT_MEMBER,
  ],

  PROFILES_BY_ADMIN_MASTER_IN_TEAM_USERS: [
    PROJECT_MANAGER,
    TEAM_LEADER,
    PROJECT_MEMBER,
  ],

  PROFILES_BY_PROJECT_MANAGER: [PROJECT_MANAGER, TEAM_LEADER, PROJECT_MEMBER],

  PROFILES_BY_TEAM_LEADER: [TEAM_LEADER, PROJECT_MEMBER],

  PROFILES_BY_PROJECT_MEMBER: [PROJECT_MEMBER],
};
