import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRoleEnum } from '../../contracts/shared/enums/userRole.enum';
import { UserType } from '../../contracts/shared/user.type';
import { Exclude } from "class-transformer";

export type UserDocument = User & Document;

@Schema()
export class User implements UserType {
  @Prop({
    unique: true,
    required: true,
    default: Types.ObjectId,
  })
  userId: Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: UserRoleEnum.user })
  roles: string[];

  @Prop({ default: false })
  verified_email: boolean;

  @Prop()
  picture: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
