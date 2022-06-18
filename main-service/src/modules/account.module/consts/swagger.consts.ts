import { AccountEntity } from '../entities/account.entity';
import { CreateAccountResponseDto } from "../presenters/responseDto/create.account.response.dto";
import { UpdateAccountResponseDto } from "../presenters/responseDto/update.account.response.dto";

export const createAccount = {
  apiOperation: {
    summary: 'create new Account ',
  },
  apiResponse: {
    status: 201,
    description: 'created new Account',
    type: CreateAccountResponseDto,
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
    type: UpdateAccountResponseDto,
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
