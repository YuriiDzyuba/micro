import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { SafeUserType } from './types/safeUser.type';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, UpdateWriteOpResult } from 'typeorm';
import { UserMappers } from './user.mappers';
import { ChangeUserPictureDto } from './dto/changeUserPicture.dto';
import { ChangeUserNameDto } from './dto/changeUserName.dto';
import { EmailActivationLink } from './entity/emailActivationLink.entity';
import { CreateUserRequestType } from './types/createUser.request.type';
import { EmailActivationLinkType } from './types/emailActivationLink.type';
import { UserType } from './types/user.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    readonly userModel: MongoRepository<User>,
    @InjectRepository(EmailActivationLink)
    readonly activateEmail: MongoRepository<EmailActivationLink>,
    readonly userMapper: UserMappers,
  ) {}

  async findUserByEmailAndUserName(
    email: string,
    userName: string,
  ): Promise<SafeUserType> {
    const foundedUser = await this.userModel.findOne({
      where: {
        $or: [{ email }, { userName }],
      },
    });

    return foundedUser
      ? this.userMapper.mapUserEntityToSafeUser(foundedUser)
      : null;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async createNewUserAndActivationLink(
    userToSave: CreateUserRequestType,
    newEmailActivationLink: EmailActivationLinkType,
  ): Promise<SafeUserType> {
    const result: User = await this.userModel.save(userToSave);
    await this.activateEmail.save(newEmailActivationLink);

    return this.userMapper.mapUserEntityToSafeUser(result);
  }

  async updateUserField(
    userId: string,
    fieldToUpdate: ChangeUserPictureDto | ChangeUserNameDto,
  ): Promise<boolean> {
    const result: UpdateWriteOpResult = await this.userModel.updateOne(
      { userId },
      { $set: { ...fieldToUpdate } },
    );
    return !!result.matchedCount;
  }

  async findUsers(): Promise<SafeUserType[]> {
    const foundedUsers: UserType[] = await this.userModel.find();
    return foundedUsers
      ? this.userMapper.mapUserEntitiesToSafeUsers(foundedUsers)
      : [];
  }

  async findUserById(userId: string): Promise<SafeUserType> {
    const foundedUser: UserType = await this.userModel.findOne({ userId });
    return foundedUser
      ? this.userMapper.mapUserEntityToSafeUser(foundedUser)
      : null;
  }

  async removeUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({ userId });
  }

  getSafeUser(user: UserType): SafeUserType {
    return this.userMapper.mapUserEntityToSafeUser(user);
  }
}
