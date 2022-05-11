export type UserType = {
  userId: string;
  userName: string;
  email: string;
  verifiedEmail: boolean;
  verifyEmailLink: string;
  roles: string[];
  picture: string;
  password: string;
  createdAt: number;
  updatedAt: number;
};
