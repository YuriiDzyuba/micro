import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { SafeUserType } from './types/safeUser.type';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, UpdateWriteOpResult } from 'typeorm';
import { UserMappers } from './user.mappers';
import { ChangeUserPictureDto } from './dto/changeUserPicture.dto';
import { ChangeUserNameDto } from './dto/changeUserName.dto';
import { EmailVerificationLinkType } from './types/emailVerificationLink.type';
import { UserType } from './types/user.type';
import { EmailVerification } from './entity/emailVerification.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    readonly userModel: MongoRepository<User>,
    @InjectRepository(EmailVerification)
    readonly verifyEmail: MongoRepository<EmailVerification>,
    readonly userMapper: UserMappers,
  ) {}

  async getSafeUserByEmail(email: string): Promise<SafeUserType> {
    const foundedUser = await this.userModel.findOne({ email });

    return foundedUser
      ? this.userMapper.mapUserEntityToSafeUser(foundedUser)
      : null;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async createNewUserAndActivationLink(
    userToSave: Pick<UserType, 'email' | 'password' | 'userName'>,
    newEmailActivationLink: EmailVerificationLinkType,
  ): Promise<SafeUserType> {
    const result: User = await this.userModel.save(userToSave);
    await this.verifyEmail.save(newEmailActivationLink);

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

  async updateEmailStatus(email: string): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { email },
      { $set: { verifiedEmail: true } },
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

  async removeEmailVerificationByUserId(userId: string): Promise<boolean> {
    const result = await this.verifyEmail.deleteOne({ userId });
    return !!result.deletedCount;
  }

  getSafeUser(user: UserType): SafeUserType {
    return this.userMapper.mapUserEntityToSafeUser(user);
  }
}
