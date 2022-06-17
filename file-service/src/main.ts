import { NestFactory } from '@nestjs/core';
import { Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";


async function bootstrap() {
  const natsUrl = process.env.NATS_URL || 'nats://nats:8222'

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [natsUrl],
    },
  });

  const configService = app.get(ConfigService);
  const NAME = configService.get<string>('SERVICE_NAME');

  await app.listen();
  console.log(`${NAME} listening and connected to ${natsUrl}`)
}
bootstrap();