import { Types } from 'mongoose';

export type UserType = {
  userId: string | Types.ObjectId;
  userName: string;
  email: string;
  verified_email: boolean;
  picture: string;
  password: string;
};
