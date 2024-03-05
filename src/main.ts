import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as fastifyMultipart from 'fastify-multipart';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import fastifyCsrf from '@fastify/csrf-protection';
import { AppModule } from './app.module';
// import { swaggerInit } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { bufferLogs: true, bodyParser: true, rawBody: true },
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get('port');

  const logger = new Logger();

  await app.register(helmet);
  await app.register(fastifyCsrf);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  app.useLogger(app.get(PinoLogger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: configService.get('port') === 'production',
    }),
  );
  app.enableShutdownHooks();
  app.enableCors();
  app.register(fastifyMultipart, { attachFieldsToBody: true });
  // configService.get('NODE_ENV') != 'production' ||
  // configService.get('NODE_ENV') != 'staging'
  //   ? swaggerInit(app)
  //   : null;

  await app.listen(
    PORT,
    configService.get('NODE_ENV') == 'development' ? '0.0.0.0' : null,
  );

  logger.log(
    `Application is running on ${configService.get(
      'NODE_ENV',
    )} server: ${await app.getUrl()}`,
  );
}
bootstrap();
