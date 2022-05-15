import { UserResponsePresentation } from '../../user.module/presentations/userResponse.presentation';
import { ManyUsersResponsePresentation } from '../presentations/manyUsersResponse.presentation';
import { RemovedUserResponsePresentation } from '../presentations/removedUserResponse.presentation';

export const findUsers = {
  apiOperation: {
    summary: 'return array of users',
  },
  apiResponse: {
    status: 200,
    description: 'returns an array of users matching the query',
    type: ManyUsersResponsePresentation,
  },
};

export const findUserById = {
  apiOperation: {
    summary: 'return one user by id',
  },
  apiResponse: {
    status: 201,
    description: 'returns one user by userId',
    type: UserResponsePresentation,
  },
};

export const deleteUserById = {
  apiOperation: {
    summary: 'delete one user by id',
  },
  apiResponse: {
    status: 202,
    description: 'return userId of deleted user',
    schema: RemovedUserResponsePresentation,
  },
};
