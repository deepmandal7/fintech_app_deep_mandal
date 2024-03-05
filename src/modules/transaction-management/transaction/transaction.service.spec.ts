import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import {
  TransactionCategoryEnum,
  TransactionStatusEnum,
} from './dto/enum/transaction.enum';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const createTransactionDto: CreateTransactionDto = {
        amount: 100,
        date: new Date(),
        category: TransactionCategoryEnum.GROCERIES,
        status: TransactionStatusEnum.PENDING,
        paymentMethodId: 'pm12345678',
      };

      const createdTransaction: Transaction = await service.createTransaction(
        createTransactionDto,
      );

      expect(createdTransaction).toBeDefined();
      expect(createdTransaction.amount).toBe(createTransactionDto.amount);
      expect(createdTransaction.date).toEqual(createTransactionDto.date);
      expect(createdTransaction.category).toBe(createTransactionDto.category);
      expect(createdTransaction.status).toBe(createTransactionDto.status);
    });
  });

  describe('findAllTransactions', () => {
    it('should return an array of transactions', async () => {
      const transactions: Transaction[] = await service.findAllTransactions();

      expect(transactions).toBeDefined();
      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  // Add more test cases for other functions like findTransactionById, updateTransaction, deleteTransaction, etc.
});
