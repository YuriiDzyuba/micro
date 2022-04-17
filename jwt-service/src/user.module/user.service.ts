import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import { UserNotExistException } from './exceptions/userNotExist.exception';
import { PasswordService } from './password.service';
import { FindUserByIdDto } from './dto/findUserById.dto';
import { UserType } from '../contracts/shared/user.type';
import { ChangeUserPictureDto } from './dto/changeUserPicture.dto';
import { ChangeUserNameDto } from './dto/changeUserName.dto';
import { UserServiceInterface } from '../contracts/user.module/interfaces/userService.interface';
import { SafeUserType } from "../contracts/shared/safeUser.type";
import { EventsService } from "../events/events.service";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly password: PasswordService,
    private readonly eventService: EventsService
  ) {}

  async createUser(candidate: CreateUserDto): Promise<SafeUserType> {
    const existingUser = await this.userRepository.findUserByEmailAndUserName(
      candidate.email,
      candidate.userName,
    );

    if (existingUser) throw new UserNotExistException();

    const hashedPassword = await this.password.toHash(candidate.password);

    const savedUser: SafeUserType = await this.userRepository.saveUser({
      ...candidate,
      password: hashedPassword,
    });

    await this.eventService.onUserCreateEventEmitter(savedUser);

    return savedUser;
  }

  async findUsers(): Promise<UserType[]> {
    return await this.userRepository.findUsers();
  }

  async findUserById(userId: FindUserByIdDto): Promise<UserType> {
    return await this.userRepository.findUserById(userId);
  }

  async changeUserPicture(
    userId: FindUserByIdDto,
    userPicture: ChangeUserPictureDto,
  ): Promise<SafeUserType> {
    const foundedUser = await this.findUserById(userId);

    if (!foundedUser) throw new UserNotExistException();

    foundedUser.picture = userPicture as unknown as string;

    return await this.userRepository.saveUser(foundedUser);
  }

  async changeUserName(
    userId: FindUserByIdDto,
    userName: ChangeUserNameDto,
  ): Promise<SafeUserType> {
    const foundedUser = await this.findUserById(userId);

    if (!foundedUser) throw new UserNotExistException();

    foundedUser.userName = userName as unknown as string;

    return await this.userRepository.saveUser(foundedUser);
  }

  async removeUser(userId: FindUserByIdDto): Promise<void> {
    await this.userRepository.removeUser(userId);
  }
}
