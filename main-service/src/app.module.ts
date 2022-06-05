import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseConfig } from './config/database.config';
import { AccountModule } from './modules/account.module/account.module';
import { PostModule } from './modules/post.module/post.module';
import { CommentModule } from './modules/comment.module/comment.module';
import { EventModule } from './modules/event.module/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AccountModule,
    PostModule,
    CommentModule,
    EventModule,
  ],
})
export class AppModule {}
