import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerInit = (app) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('fintech_app_deep_mandal')
    .setDescription('The fintech_app_deep_mandal API description')
    .setVersion('3.0.3')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .setExternalDoc('Postman Collection', '/docs-json')
    .addTag('fintech_app_deep_mandal')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  return SwaggerModule.setup('api', app, document);
};
