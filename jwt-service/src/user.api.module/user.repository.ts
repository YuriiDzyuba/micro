import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { FindUserByIdDto } from './dto/findUserById.dto';
import { v4 as uuidv4 } from 'uuid';
import {SafeUserType} from "../contracts/shared/safeUser.type";

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private serializeOne(result: User) {
    return (({ userId, userName, email, verified_email, picture, roles, createdAt, updatedAt}) => ({
      userId,
      userName,
      email,
      verified_email,
      picture,
      roles, createdAt, updatedAt
    }))(result);
  }

  async findUserByEmailAndUserName(
    email: string,
    userName: string,
  ): Promise<User> {
    return await this.userModel.findOne({ email, userName }).lean().exec();
  }

  async saveUser(userToSave: CreateUserDto): Promise<SafeUserType> {
    const newUser = new this.userModel({ ...userToSave, userId: uuidv4() });
    const result = await newUser.save();
    return this.serializeOne(result.toObject());
  }

  async findUsers(): Promise<User[]> {
    return await this.userModel.find().lean().exec();
  }

  async findUserById(id: FindUserByIdDto): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async removeUser(id: FindUserByIdDto): Promise<void> {
    await this.userModel.deleteOne(id).exec();
  }
}
