import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ErrorHandlerService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  handleError(serviceName: string, error: any) {
    const logger = new Logger(serviceName);
    logger.error(error);
    return error.message;
  }
}
