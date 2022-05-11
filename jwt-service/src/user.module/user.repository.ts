import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';
import { SafeUserType } from './types/safeUser.type';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, UpdateWriteOpResult } from 'typeorm';
import { UserMappers } from './user.mappers';
import { ChangeUserPictureDto } from './dto/changeUserPicture.dto';
import { ChangeUserNameDto } from './dto/changeUserName.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    readonly userModel: MongoRepository<User>,
    readonly userMapper: UserMappers,
  ) {}

  async findUserByEmailAndUserName(
    email: string,
    userName: string,
  ): Promise<User> {
    return await this.userModel.findOne({ email, userName });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async saveUser(userToSave: CreateUserDto): Promise<SafeUserType> {
    const newUser = new User();
    const result: User = await this.userModel.save({
      ...newUser,
      ...userToSave,
    });
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
    return !!result.matchedCount
  }

  async findUsers(): Promise<SafeUserType[]> {
    const foundedUsers: User[] = await this.userModel.find();
    return foundedUsers
      ? this.userMapper.mapUserEntitiesToSafeUsers(foundedUsers)
      : [];
  }

  async findUserById(userId: string): Promise<SafeUserType> {
    const foundedUser: User = await this.userModel.findOne({ userId });
    return foundedUser
      ? this.userMapper.mapUserEntityToSafeUser(foundedUser)
      : null;
  }

  async removeUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({ userId });
  }
}
