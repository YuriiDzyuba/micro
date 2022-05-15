import { EmailVerificationLinkType } from './emailVerificationLink.type';
import { UserType } from './user.type';

export type CreatedUserWithActivationLinkType = Pick<
  UserType,
  'email' | 'userName'
> &
  Pick<EmailVerificationLinkType, 'verificationLink'>;
