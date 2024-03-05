import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DatabaseService } from 'src/database/database.service';
import { PasswordService } from 'src/modules/user-management/user/pass.service';
import { ErrorHandlerService } from 'src/utils/error-handler/error-handler.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(ErrorHandlerService)
    private readonly errorHandlerService: ErrorHandlerService,
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
    @Inject(PasswordService) private readonly passwordService: PasswordService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      const { amount, date, category, status, paymentMethodId } =
        createTransactionDto;
      const query =
        'INSERT INTO transactions (amount, date, category, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [
        amount,
        date,
        category,
        status,
        await this.passwordService.hashPaymentMethod(paymentMethodId),
      ];
      const result = await this.databaseService.executeQuery(query, values);
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async findAllTransactions(): Promise<Transaction[]> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT * FROM transactions',
      );
      return result;
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async findTransactionById(id: string): Promise<Transaction> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT * FROM transactions WHERE id = $1',
        [id],
      );
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async updateTransaction(
    id: string,
    updateTransactionDto: any,
  ): Promise<Transaction> {
    try {
      const { amount, date, category, status } = updateTransactionDto;
      const query =
        'UPDATE transactions SET amount = $1, date = $2, category = $3, status = $4 WHERE id = $5 RETURNING *';
      const values = [amount, date, category, status, id];
      const result = await this.databaseService.executeQuery(query, values);
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async deleteTransaction(id: string) {
    try {
      const result = await this.databaseService.executeQuery(
        'DELETE FROM transactions WHERE id = $1',
        [id],
      );
      return result;
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async getTotalExpenses(): Promise<number> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT SUM(amount) FROM transactions WHERE status IN ($1, $2)',
        ['completed', 'approved'],
      );
      return parseFloat(result[0].sum) || 0;
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async getTotalIncome(): Promise<number> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT SUM(amount) FROM transactions WHERE status IN ($1, $2)',
        ['income', 'revenue'],
      );
      return parseFloat(result[0].sum) || 0;
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }

  async getCategoryWiseSpending(): Promise<{ [key: string]: number }> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT category, SUM(amount) AS total FROM transactions GROUP BY category',
      );
      const categoryWiseSpending: { [key: string]: number } = {};
      result.forEach((item) => {
        categoryWiseSpending[item.category] = parseFloat(item.total) || 0;
      });
      return categoryWiseSpending;
    } catch (error) {
      return this.errorHandlerService.handleError(
        TransactionService.name,
        error,
      );
    }
  }
}
