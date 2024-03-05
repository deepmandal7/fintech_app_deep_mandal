import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsEnum,
} from 'class-validator';
import {
  TransactionCategoryEnum,
  TransactionStatusEnum,
} from './enum/transaction.enum';

export class CreateTransactionDto {
  @ApiProperty({ example: 100.5, description: 'The amount of the transaction' })
  @IsNumber()
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @ApiProperty({
    example: '2024-03-05',
    description: 'The date of the transaction',
  })
  @IsDateString({}, { message: 'Invalid date format' })
  @IsNotEmpty({ message: 'Date is required' })
  date: Date;

  @ApiProperty({
    example: TransactionCategoryEnum.GROCERIES,
    description: 'The category of the transaction',
    enum: TransactionCategoryEnum,
  })
  @IsEnum(TransactionCategoryEnum, { message: 'Invalid category' })
  @IsNotEmpty({ message: 'Category is required' })
  category: TransactionCategoryEnum;

  @ApiProperty({
    example: TransactionStatusEnum.PENDING,
    description: 'The status of the transaction',
    enum: TransactionStatusEnum,
  })
  @IsEnum(TransactionStatusEnum, { message: 'Invalid status' })
  @IsNotEmpty({ message: 'Status is required' })
  status: TransactionStatusEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Payment method must not be empty' })
  paymentMethodId: string;
}
