import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

const scryptAsync = promisify(scrypt);

@Injectable()
export class PasswordService {
  async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }
  async compare(storedPassword: string, suppliedPassword: string) {
    // split() returns array
    const [hashedPassword, salt] = storedPassword.split('.');
    // we hash the new sign-in password
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    // compare the new supplied password with the stored hashed password
    return buf.toString('hex') === hashedPassword;
  }
}
