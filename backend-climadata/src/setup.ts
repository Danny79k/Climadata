import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setup(app: INestApplication) {

  const config = new DocumentBuilder()
    .setTitle('Climadata API')
    .setDescription('the clean air api')
    .setVersion('0.1.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}