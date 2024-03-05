import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from './pass.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
