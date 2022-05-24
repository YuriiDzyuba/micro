import { Request } from 'express';
import { User } from './user.type';

export interface ExpressRequestInterface extends Request {
  currentUser?: User;
}
