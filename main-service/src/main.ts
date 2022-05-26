import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('SERVICE_PORT');
  const HOST = configService.get<number>('SERVICE_HOST');
  const GLOBAL_PREFIX = configService.get<string>('SERVICE_GLOBAL_PREFIX');
  const NAME = configService.get<string>('SERVICE_NAME');

  app.setGlobalPrefix(GLOBAL_PREFIX || 'main-api');
  app.enableCors();

  const swaggerUrl = `${GLOBAL_PREFIX || 'main-api'}/docs`;
  const config = new DocumentBuilder()
    .setTitle(`${NAME}`)
    .setDescription('app service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerUrl, app, document);

  await app.listen(PORT, () => {
    console.log(`${NAME} has been started on port ${PORT}`);
    console.log(`open swagger ${HOST}${PORT}/${swaggerUrl}`);
  });
}
bootstrap();
