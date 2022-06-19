import {
  Entity,
  Column,
  ObjectIdColumn,
  PrimaryColumn,
  ObjectID,
} from 'typeorm';
import { UserRoleEnum } from '../../types/userRole.enum';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../types/user.type';

@Entity({ name:'user'} )
export class User implements UserType {
  @Exclude()
  @ObjectIdColumn()
  private _id: ObjectID;

  @PrimaryColumn({ unique: true })
  public userId: string;

  @Column()
  public userName: string;

  @Exclude()
  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column()
  public roles: string[];

  @Column()
  public verifiedEmail: boolean;

  @Column()
  public picture: string;

  @Column()
  public createdAt: number;

  @Column()
  public updatedAt: number;

  constructor() {
    this.userId = uuidv4();
    this.createdAt = Date.now();
    this.updatedAt = null;
    this.verifiedEmail = false;
    this.roles = [UserRoleEnum.USER];
  }
}
