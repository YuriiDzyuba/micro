import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import {
  CantUpdateUserException,
  UserExistException,
  WrongPasswordException,
  UserDoesntExistExceptions,
  NotImplementedFeatureException,
} from './user.exceptions';
import { CryptoService } from './crypto.service';
import { UserServiceInterface } from './types/userService.interface';
import { SafeUserType } from './types/safeUser.type';
import { EventsService } from '../events.module/events.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './entity/user.entity';
import { UserType } from './types/user.type';
import { EmailVerification } from './entity/emailVerification.entity';
import { SafeUserWithTokensType } from './types/safeUserWithTokens.type';
import { OAuthUserType } from '../oAuth.module/types/oAuthUser.type';
import { CreateUserType } from './types/createUser.type';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly eventService: EventsService,
  ) {}

  private addTokensToSafeUser(safeUser: SafeUserType): SafeUserWithTokensType {
    return {
      ...safeUser,
      accessToken: this.cryptoService.generateToken(safeUser),
      refreshToken: this.cryptoService.generateToken(safeUser, 'refresh'),
    };
  }

  private async addUserWithActivationLinkToDbAndEmitEvent(
    candidate: CreateUserType & Pick<UserType, 'email' | 'userName'>,
  ): Promise<SafeUserType> {
    const password = candidate.password
      ? candidate.password
      : this.cryptoService.createRandomString();

    const hashedPassword = await this.cryptoService.passwordToHash(password);
    const emailVerificationLink =
      await this.cryptoService.createEmailVerificationLink(candidate.email);

    const newUser = new User();
    const newEmailVerification = new EmailVerification(
      newUser.userId,
      emailVerificationLink,
    );

    const createdUser =
      await this.userRepository.createNewUserAndActivationLink(
        {
          ...newUser,
          ...candidate,
          password: hashedPassword,
        },
        newEmailVerification,
      );

    if (createdUser) {
      await this.eventService.onUserCreateEventEmitter({
        email: createdUser.email,
        userName: createdUser.userName,
        verificationLink: newEmailVerification.verificationLink,
      });
    }

    return createdUser;
  }

  getCurrentUser(safeUser: SafeUserType): SafeUserWithTokensType {
    return this.addTokensToSafeUser(safeUser);
  }

  async getSafeUserByEmail(email: string): Promise<SafeUserType> {
    return await this.userRepository.getSafeUserByEmail(email);
  }

  async createOAuthUser(
    candidate: OAuthUserType,
  ): Promise<SafeUserWithTokensType> {
    const password = this.cryptoService.createRandomString();

    const createdUser = await this.addUserWithActivationLinkToDbAndEmitEvent({
      ...candidate,
      password,
    });

    return this.addTokensToSafeUser(createdUser);
  }

  async createUser(candidate: CreateUserType): Promise<SafeUserWithTokensType> {
    const existingUser = await this.getSafeUserByEmail(candidate.email);

    if (existingUser) throw new UserExistException();

    const createdUser = await this.addUserWithActivationLinkToDbAndEmitEvent(
      candidate,
    );

    return this.addTokensToSafeUser(createdUser);
  }

  async loginUser(candidate: LoginUserDto): Promise<SafeUserType> {
    const foundedUserByEmail: User = await this.userRepository.findUserByEmail(
      candidate.email,
    );

    if (!foundedUserByEmail) throw new UserDoesntExistExceptions();

    const isPasswordCorrect = await this.cryptoService.comparePasswords(
      foundedUserByEmail.password,
      candidate.password,
    );

    if (!isPasswordCorrect) throw new WrongPasswordException();

    const safeUser = this.userRepository.getSafeUser(foundedUserByEmail);

    return this.addTokensToSafeUser(safeUser);
  }

  async findUsers(): Promise<SafeUserType[]> {
    return await this.userRepository.findUsers();
  }

  async findUserById(userId: Pick<UserType, 'userId'>): Promise<SafeUserType> {
    return await this.userRepository.findUserById(userId.toString());
  }

  async changeUserPicture(
    userId: Pick<UserType, 'userId'>,
    userPicture: Pick<UserType, 'picture'>,
  ): Promise<SafeUserType> {
    const foundedUser = await this.findUserById(userId);

    if (!foundedUser) throw new UserDoesntExistExceptions();

    const result = await this.userRepository.updateUserField(
      userId.toString(),
      userPicture,
    );

    if (!result) throw new CantUpdateUserException();

    return { ...foundedUser, ...userPicture };
  }

  async changeUserName(
    userId: Pick<UserType, 'userId'>,
    userName: Pick<UserType, 'userName'>,
  ): Promise<SafeUserType> {
    const foundedUser = await this.findUserById(userId);

    if (!foundedUser) throw new UserDoesntExistExceptions();

    const result = this.userRepository.updateUserField(
      userId.toString(),
      userName,
    );

    if (!result) throw new CantUpdateUserException();

    return { ...foundedUser, ...userName };
  }

  async removeUser(userId: Pick<UserType, 'userId'>): Promise<void> {
    await this.userRepository.removeUser(userId.toString());
  }

  async verifyEmail(link: string): Promise<boolean> {
    const { email } = this.cryptoService.verifyEmailVerificationString(link);

    console.log(email, 'email');
    const existingUser = await this.getSafeUserByEmail(email);
    console.log(existingUser, 'existingUser');

    if (!existingUser) throw new UserDoesntExistExceptions();

    const isEmailVerified = await this.userRepository.updateEmailStatus(
      existingUser.email,
    );
    console.log(isEmailVerified, 'isEmailVerified');

    if (!isEmailVerified) throw new NotImplementedFeatureException();

    return this.userRepository.removeEmailVerificationByUserId(
      existingUser.userId,
    );
  }
}
