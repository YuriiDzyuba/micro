import { Request } from 'express';
import {SafeUserType} from "./safeUser.type";

export interface ExpressRequestInterface extends Request {
  currentUser?: SafeUserType;
  userToRefreshTokens?: SafeUserType;
}
