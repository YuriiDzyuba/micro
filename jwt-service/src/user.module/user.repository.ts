import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/createUser.dto';
import {User} from './entity/user.entity';
import {FindUserByIdDto} from './dto/findUserById.dto';
import {SafeUserType} from "../contracts/shared/safeUser.type";
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository} from "typeorm";


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User)
              readonly userModel: MongoRepository<User>) {}

  serializeOne(result: User) {
    return (({userId, userName, email, verifiedEmail, picture, roles, createdAt, updatedAt}) => ({
      userId,
      userName,
      email,
      verifiedEmail,
      picture,
      roles, createdAt, updatedAt
    }))(result);
  }

  async findUserByEmailAndUserName(
      email: string,
      userName: string,
  ): Promise<User> {
    return await this.userModel.findOne({email, userName});
  }

  async saveUser(userToSave: CreateUserDto): Promise<SafeUserType> {
    const newUser = new User();
    const result = await this.userModel.save({...newUser, ...userToSave});
    return this.serializeOne(result);
  }

  async findUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findUserById(id: FindUserByIdDto): Promise<User> {
    return await this.userModel.findOne(id);
  }

  async removeUser(id: FindUserByIdDto): Promise<void> {
    await this.userModel.deleteOne(id);
  }
}
