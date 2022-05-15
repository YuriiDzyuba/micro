import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { EmailVerificationLinkType } from '../types/emailVerificationLink.type';

@Entity()
export class EmailVerification implements EmailVerificationLinkType {
  @Exclude()
  @ObjectIdColumn()
  private _id: ObjectID;

  @PrimaryColumn({ unique: true })
  verificationLink: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  createdAt: number;

  constructor(userId, emailActivationLink) {
    this.verificationLink = emailActivationLink;
    this.userId = userId;
    this.createdAt = Date.now();
  }
}
