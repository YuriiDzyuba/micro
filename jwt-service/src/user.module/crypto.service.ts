import { randomBytes, scrypt } from 'crypto';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
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

const scryptAsync = promisify(scrypt);

@Injectable()
export class CryptoService {
  async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }

  createLink(adress: string) {
    return `${hostDomain}/${hostDomainGlobalPrefix}/${adress}/${uuidv4()}`;
  }

  generateToken(user: SafeUserType, tokenType = 'access'): string {
    return sign(
      {
        id: user.userId,
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
