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
import { UserServiceInterface } from '../contracts/user.module/interfaces/userService.interface';
import { SafeUserType } from '../contracts/shared/safeUser.type';
import { EventsService } from '../events/events.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './entity/user.entity';
import { UserMappers } from './user.mappers';
import { UserType } from '../contracts/shared/user.type';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly password: CryptoService,
    private readonly eventService: EventsService,
    private readonly userMapper: UserMappers,
  ) {}

  async createUser(candidate: CreateUserDto): Promise<SafeUserType> {
    const existingUser = await this.userRepository.findUserByEmailAndUserName(
      candidate.email,
      candidate.userName,
    );

    if (existingUser) throw new UserExistException();

    const hashedPassword = await this.password.toHash(candidate.password);

    const savedUser: SafeUserType = await this.userRepository.saveUser({
      ...candidate,
      password: hashedPassword,
    });

    await this.eventService.onUserCreateEventEmitter(savedUser);

    return savedUser;
  }

  async loginUser(candidate: LoginUserDto): Promise<SafeUserType> {
    const userEntityByEmail: User = await this.userRepository.findUserByEmail(
      candidate.email,
    );

    if (!userEntityByEmail) throw new UserNotExistException();

    const isPasswordCorrect = await this.password.compare(
      userEntityByEmail.password,
      candidate.password,
    );

    if (!isPasswordCorrect) throw new WrongPasswordException();

    return this.userMapper.mapUserEntityToSafeUser(userEntityByEmail);
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

    const result = await this.userRepository.updateUserField(userId.toString(), userPicture);

    if (!result) throw new CantUpdateUserException();

    return { ...foundedUser, ...userPicture };
  }

  async changeUserName(
    userId: Pick<UserType, 'userId'>,
    userName: Pick<UserType, 'userName'>,
  ): Promise<SafeUserType> {
    const foundedUser = await this.findUserById(userId);

    if (!foundedUser) throw new UserNotExistException();

    const result = this.userRepository.updateUserField(userId.toString(), userName);

    if (!result) throw new CantUpdateUserException();

    return { ...foundedUser, ...userName };
  }

  async removeUser(userId: Pick<UserType, 'userId'>): Promise<void> {
    await this.userRepository.removeUser(userId.toString());
  }
}
