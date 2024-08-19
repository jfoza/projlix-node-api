export enum ErrorMessagesEnum {
  NOT_AUTHORIZED = 'Você não tem permissão para acessar este recurso.',
  USER_NOT_FOUND = 'Usuário não encontrado.',
  EMAIL_ALREADY_EXISTS = 'Este e-mal já existe.',
  USER_NOT_ALLOWED = 'Você não tem acesso aos dados deste usuário.',
  PROFILE_NOT_ALLOWED = 'Perfil não permitido.',
  PROFILE_NOT_FOUND = 'Perfil não encontrado.',

  REGISTER_NAME_ALREADY_EXISTS = 'Já existe um registro com o nome informado.',

  INVALID_COLUMN_NAME = 'A propridade columnName é inválida.',
  INVALID_COLUMN_ORDER = 'A propridade columnOrder é inválida.',

  COLOR_NOT_FOUND = 'Cor não encontrada.',
  ICON_NOT_FOUND = 'Ícone não encontrado.',
  TAG_NOT_FOUND = 'Tag não encontrada.',
  TAG_HAS_PROJECTS_IN_DELETE = 'Esta tag não pode ser excluída pois possui projetos vinculados.',
  TAG_ALREADY_ADDED_IN_PROJECT = 'Esta tag já está vinculada ao projeto.',
  TEAM_USER_ALREADY_ADDED_IN_PROJECT = 'Este usuário já está vinculado ao projeto.',

  PROJECT_NOT_FOUND = 'Projeto não encontrado.',
  PROJECT_NOT_ALLOWED = 'Você não tem acesso a este projeto.',
  PROJECT_NOT_ALLOWED_IN_TEAM_USERS = 'Você não tem acesso aos membros deste projeto.',
  PROJECT_ID_OR_PROJECT_UNIQUE_NAME_REQUIRED = 'Ao menos um dos parâmetros: projectId ou projectUniqueName deve ser informado.',

  SECTION_NOT_FOUND = 'Seção não encontrada.',
  SECTION_NOT_ALLOWED = 'Você não tem acesso a esta seção.',
}
