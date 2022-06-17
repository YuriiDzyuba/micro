import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import config from './config/avatar.config';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forFeature(config),
  ],
  controllers: [AvatarController],
  providers: [AvatarService]
})
export class AvatarModule {}
