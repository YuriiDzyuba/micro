import { CreateUserRequestType } from './createUser.request.type';
import { EmailActivationLinkType } from './emailActivationLink.type';

export type CreatedUserWithActivationLinkType = Pick<
  CreateUserRequestType,
  'email' | 'userName'
> &
  Pick<EmailActivationLinkType, 'emailActivationLink'>;
