export enum ActionTypes {
  REGISTER = '[AUTH] REGISTER',
  REGISTER_SUCCESS = '[AUTH] REGISTER SUCCESS',
  REGISTER_FAILURE = '[AUTH] REGISTER FAILURE',

  AUTH = '[AUTH] LOGIN',
  AUTH_SUCCESS = '[AUTH] LOGIN SUCCESS',
  AUTH_FAILURE = '[AUTH] LOGIN FAILURE',

  GET_CURRENT_USER = '[AUTH] GET_CURRENT_USER',
  GET_CURRENT_USER_SUCCESS = '[AUTH] GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE = '[AUTH] GET_CURRENT_USER_FAILURE',
}
