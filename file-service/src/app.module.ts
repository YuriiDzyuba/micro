import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { ImageModule } from './image/image.module';
import { FileModule } from './file/file.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [ ConfigModule.forRoot(), ImageModule, FileModule, AvatarModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
