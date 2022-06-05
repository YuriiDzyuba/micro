import { randomBytes, scrypt } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { SafeUserType } from './types/safeUser.type';
import { VerifiedEmailVerificationLinkType } from './types/verifiedEmailVerificationLink.type';
import { ConfigService } from '@nestjs/config';

const scryptAsync = promisify(scrypt);

@Injectable()
export class CryptoService {
  private readonly secret = 'secret';
  private readonly expTime = '1h';
  private readonly serviceHost;
  private readonly servicePort;
  private readonly accessJwtSecret;
  private readonly refreshJwtSecret;
  private readonly accessJwtExpIn;
  private readonly refreshJwtExpIn;
  private readonly hostDomainGlobalPrefix;

  constructor(private configService: ConfigService) {
    this.serviceHost = this.configService.get('serviceHost');
    this.servicePort = this.configService.get('servicePort');
    this.accessJwtSecret = this.configService.get('accessJwtSecret');
    this.refreshJwtSecret = this.configService.get('refreshJwtSecret');
    this.accessJwtExpIn = this.configService.get('accessJwtExpIn');
    this.refreshJwtExpIn = this.configService.get('refreshJwtExpIn');
    this.hostDomainGlobalPrefix = this.configService.get(
      'hostDomainGlobalPrefix',
    );
  }

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
    return `${this.serviceHost}${this.servicePort}/${this.hostDomainGlobalPrefix}/user/verify_email/${uniqueEmailBasedString}`;
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
      tokenType === 'refresh' ? this.refreshJwtSecret : this.accessJwtSecret,
      {
        expiresIn:
          tokenType === 'refresh' ? this.refreshJwtExpIn : this.accessJwtExpIn,
      },
    );
  }
}
