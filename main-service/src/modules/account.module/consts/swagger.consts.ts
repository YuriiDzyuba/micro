import { AccountEntity } from '../entities/account.entity';

export const createAccount = {
  apiOperation: {
    summary: 'create new Account ',
  },
  apiResponse: {
    status: 201,
    description: 'created new Account',
    type: AccountEntity,
  },
};

export const findAllAccounts = {
  apiOperation: {
    summary: 'find many Account',
  },
  apiResponse: {
    status: 200,
    description: 'founded Account',
    type: AccountEntity,
  },
};

export const findOneAccount = {
  apiOperation: {
    summary: 'update current Account ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Account',
    type: AccountEntity,
  },
};

export const updateAccount = {
  apiOperation: {
    summary: 'update current Account ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Account',
    type: AccountEntity,
  },
};

export const removeAccount = {
  apiOperation: {
    summary: 'update current Account ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Account',
    type: AccountEntity,
  },
};
