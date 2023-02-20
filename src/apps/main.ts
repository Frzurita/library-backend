import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger init
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Library')
    .setDescription(
      'This is the API of a Library store were you can manage the information',
    )
    .setVersion(process.env.VERSION)
    .addTag('Library')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
