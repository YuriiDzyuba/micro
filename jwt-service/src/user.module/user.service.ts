import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import {
  CantUpdateUserException,
  UserExistException,
  UserNotExistException,
  WrongPasswordException,
} from './exceptions/userNotExist.exception';
import { CryptoService } from './crypto.service';
import { UserServiceInterface } from './types/userService.interface';
import { SafeUserType } from './types/safeUser.type';
import { EventsService } from '../events.module/events.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './entity/user.entity';
import { UserType } from './types/user.type';
import { EmailActivationLink } from './entity/emailActivationLink.entity';
import { SafeUserWithTokensType } from './types/safeUserWithTokens.type';

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

  async createUser(candidate: CreateUserDto): Promise<SafeUserWithTokensType> {
    const existingUser = await this.userRepository.findUserByEmailAndUserName(
      candidate.email,
      candidate.userName,
    );

    if (existingUser) throw new UserExistException();

    const hashedPassword = await this.cryptoService.passwordToHash(
      candidate.password,
    );

    const newUser = new User();
    const newEmailActivationLink = new EmailActivationLink(newUser.userId);

    const createdUser: SafeUserType =
      await this.userRepository.createNewUserAndActivationLink(
        {
          ...newUser,
          ...candidate,
          password: hashedPassword,
        },
        newEmailActivationLink,
      );

    if (createdUser) {
      await this.eventService.onUserCreateEventEmitter({
        email: createdUser.email,
        userName: createdUser.userName,
        emailActivationLink: newEmailActivationLink.emailActivationLink,
      });
    }

    return this.addTokensToSafeUser(createdUser);
  }

  async loginUser(candidate: LoginUserDto): Promise<SafeUserType> {
    const foundedUserByEmail: User = await this.userRepository.findUserByEmail(
      candidate.email,
    );

    if (!foundedUserByEmail) throw new UserNotExistException();

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

    if (!foundedUser) throw new UserNotExistException();

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

    if (!foundedUser) throw new UserNotExistException();

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
}
