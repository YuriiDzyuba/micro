import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exclude } from 'class-transformer';
import { EmailActivationLinkType } from '../types/emailActivationLink.type';
import { hostDomain } from '../../config/config';

@Entity()
export class EmailActivationLink implements EmailActivationLinkType {
  @Exclude()
  @ObjectIdColumn()
  private _id: ObjectID;

  @PrimaryColumn({ unique: true })
  emailActivationLink: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  createdAt: number;

  constructor(userId) {
    this.emailActivationLink = `${hostDomain}/activate/${uuidv4()}`;
    this.userId = userId;
    this.createdAt = Date.now();
  }
}
