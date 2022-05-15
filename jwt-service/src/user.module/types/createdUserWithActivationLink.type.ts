import { EmailActivationLinkType } from './emailActivationLink.type';
import { UserType } from './user.type';

export type CreatedUserWithActivationLinkType = Pick<
  UserType,
  'email' | 'userName'
> &
  Pick<EmailActivationLinkType, 'emailActivationLink'>;
