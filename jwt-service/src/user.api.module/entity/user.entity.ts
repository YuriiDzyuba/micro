import {Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';
import { UserRoleEnum } from '../../contracts/shared/enums/userRole.enum';
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @Exclude()
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false,  select: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ default: UserRoleEnum.user })
  roles: string[];

  @Column({ default: false })
  verified_email: boolean;

  @Column()
  picture: string;

  @Column({ nullable: false, default: Date.now })
  createdAt: Date;

  @Column({ nullable: false })
  updatedAt: Date;
}

