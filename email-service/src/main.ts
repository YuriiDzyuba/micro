import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const redisPort = process.env.REDIS_URL || 'redis://localhost:6379'

  const app = await NestFactory.createMicroservice(EmailModule, {
    transport: Transport.REDIS,
    options: {
      url: redisPort,
    },
  });

  const configService = app.get(ConfigService);
  const NAME = configService.get<string>('SERVICE_NAME');

  await app.listen();
  console.log(`${NAME} listening and connected to ${redisPort}`)
}
bootstrap();