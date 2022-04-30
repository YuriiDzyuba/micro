import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/createUser.dto';
import {User} from './entity/user.entity';
import {FindUserByIdDto} from './dto/findUserById.dto';
import {SafeUserType} from "../contracts/shared/safeUser.type";
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository, UpdateWriteOpResult} from "typeorm";
import {UserMappers} from "./user.mappers";
import {ChangeUserPictureDto} from "./dto/changeUserPicture.dto";
import {ChangeUserNameDto} from "./dto/changeUserName.dto";


@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User)
              readonly userModel: MongoRepository<User>,
              readonly userMapper: UserMappers
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
    const result: User = await this.userModel.save({...newUser, ...userToSave});
    return this.userMapper.mapUserEntityToSafeUser(result);
  }

  async updateUserField(userId: FindUserByIdDto, fieldToUpdate: ChangeUserPictureDto | ChangeUserNameDto): Promise<SafeUserType> {
    const result: UpdateWriteOpResult = await this.userModel.updateOne({userId}, {fieldToUpdate});
    return this.userMapper.mapUserEntityToSafeUser(result);
  }

  async findUsers(): Promise<SafeUserType[]> {
    const foundedUsers: User[] = await this.userModel.find();
    return foundedUsers ? this.userMapper.mapUserEntitiesToSafeUsers(foundedUsers) : []
  }

  async findUserById(id: FindUserByIdDto): Promise<SafeUserType> {
    const foundedUser: User = await this.userModel.findOne(id);
    return this.userMapper.mapUserEntityToSafeUser(foundedUser);
  }

  async removeUser(id: FindUserByIdDto): Promise<void> {
    await this.userModel.deleteOne(id);
  }
}
