import { randomBytes, scrypt } from 'crypto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { SafeUserType } from './types/safeUser.type';
import {
  accessJwtExpIn,
  accessJwtSecret,
  hostDomain,
  hostDomainGlobalPrefix,
  refreshJwtExpIn,
  refreshJwtSecret,
} from '../config/config';
import { VerifiedEmailVerificationLinkType } from './types/verifiedEmailVerificationLink.type';

const scryptAsync = promisify(scrypt);

@Injectable()
export class CryptoService {
  private readonly secret = 'secret';
  private readonly expTime = '1h';

  async passwordToHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  private generateEmailVerificationString(email: string): string {
    return sign({ email }, this.secret, { expiresIn: this.expTime });
  }

  async comparePasswords(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }

  createEmailVerificationLink(email: string) {
    const uniqueEmailBasedString = this.generateEmailVerificationString(email);
    return `${hostDomain}${hostDomainGlobalPrefix}/user/verify_email/${uniqueEmailBasedString}`;
  }

  createRandomString() {
    return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  verifyEmailVerificationString(
    email: string,
  ): VerifiedEmailVerificationLinkType {
    return <VerifiedEmailVerificationLinkType>verify(email, this.secret);
  }

  generateToken(user: SafeUserType, tokenType = 'access'): string {
    return sign(
      {
        userId: user.userId,
        username: user.userName,
        email: user.email,
      },
      tokenType === 'refresh' ? refreshJwtSecret : accessJwtSecret,
      {
        expiresIn: tokenType === 'refresh' ? refreshJwtExpIn : accessJwtExpIn,
      },
    );
  }
}
