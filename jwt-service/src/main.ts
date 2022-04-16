import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX || 'jwt_api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('JWt token service')
    .setDescription('registration and auth service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `${process.env.GLOBAL_PREFIX || 'jwt-api'}/docs`,
    app,
    document,
  );

  await app.listen(PORT, () =>
    console.log(`JWT server has been started on port ${PORT}`),
  );
}
bootstrap();
