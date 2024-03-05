import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PasswordService } from 'src/modules/user-management/user/pass.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PasswordService],
})
export class TransactionModule {}
