import { JwtPayload } from 'jsonwebtoken';

export type VerifiedEmailVerificationLinkType = JwtPayload & { email: string };
