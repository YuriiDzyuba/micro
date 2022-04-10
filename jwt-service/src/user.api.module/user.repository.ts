import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { FindUserByIdDto } from './dto/findUserById.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUserByEmailAndUserName(
    email: string,
    userName: string,
  ): Promise<User> {
    return await this.userModel.findOne({ email, userName }).lean().exec();
  }

  async saveUser(userToSave: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userToSave);
    const result = await newUser.save();
    const savedUser =  result.toObject()
    delete savedUser.__v
    delete savedUser._id
    return savedUser
  }

  async findUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(id: FindUserByIdDto): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async removeUser(id: FindUserByIdDto): Promise<void> {
    await this.userModel.deleteOne(id).exec();
  }
}
