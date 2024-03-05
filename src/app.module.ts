import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user-management/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction-management/transaction/transaction.module';
import dbConfig from './config/database-config';
import { LoggerModule } from 'nestjs-pino';
import appConfig from './config/app-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            customProps: (req, res) => ({
              context: 'HTTP',
            }),
            level: config.get('log_level'),
            transport:
              config.get('NODE_ENV') !== 'production'
                ? {
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                      colorizeObjects: true,
                      sync: true,
                      singleLine: true,
                      translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
                    },
                  }
                : undefined,
          },
        };
      },
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
