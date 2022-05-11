import { Request } from 'express';
import {SafeUserType} from "../user.module/types/safeUser.type";

export interface ExpressRequestInterface extends Request {
  currentUser?: SafeUserType;
  userToRefreshTokens?: SafeUserType;
}
