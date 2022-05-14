import { UserResponsePresentation } from '../presentations/userResponse.presentation';

export const getCurrentUser = {
  apiOperation: {
    summary: 'return current user wit access and refresh tokens',
  },
  apiResponse: {
    status: 200,
    description: 'current user',
    type: UserResponsePresentation,
  },
};

export const createNewUser = {
  apiOperation: {
    summary: 'create new user by email, user name and password',
  },
  apiResponse: {
    status: 201,
    description: 'created new user',
    type: UserResponsePresentation,
  },
};

export const logInUser = {
  apiOperation: {
    summary: 'log In User with email and password',
  },
  apiResponse: {
    status: 200,
    description: 'return existed user',
    type: UserResponsePresentation,
  },
};

export const changeUserPicture = {
  apiOperation: {
    summary: 'change current user picture ',
  },
  apiResponse: {
    status: 200,
    description: 'return updated user with new picture url or null',
    type: UserResponsePresentation,
  },
};

export const changeUserName = {
  apiOperation: {
    summary: 'change current user name',
  },
  apiResponse: {
    status: 200,
    description: 'return updated user with new userName',
    type: UserResponsePresentation,
  },
};
