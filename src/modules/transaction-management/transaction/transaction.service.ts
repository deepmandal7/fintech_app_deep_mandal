import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    try {
      const { amount, date, category, status } = createTransactionDto;
      const query = 'INSERT INTO transactions (amount, date, category, status) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [amount, date, category, status];
      const result = await this.databaseService.executeQuery(query, values);
      return result[0];
    } catch (error) {
      // Handle error
    }
  }

  async findAllTransactions(): Promise<Transaction[]> {
    try {
      const result = await this.databaseService.executeQuery('SELECT * FROM transactions');
      return result;
    } catch (error) {
      // Handle error
    }
  }

  async findTransactionById(id: string): Promise<Transaction> {
    try {
      const result = await this.databaseService.executeQuery('SELECT * FROM transactions WHERE id = $1', [id]);
      return result[0];
    } catch (error) {
      // Handle error
    }
  }

  async updateTransaction(id: string, updateTransactionDto: any): Promise<Transaction> {
    try {
      const { amount, date, category, status } = updateTransactionDto;
      const query = 'UPDATE transactions SET amount = $1, date = $2, category = $3, status = $4 WHERE id = $5 RETURNING *';
      const values = [amount, date, category, status, id];
      const result = await this.databaseService.executeQuery(query, values);
      return result[0];
    } catch (error) {
      // Handle error
    }
  }

  async deleteTransaction(id: string) {
    try {
      const result = await this.databaseService.executeQuery('DELETE FROM transactions WHERE id = $1', [id]);
      return result;
    } catch (error) {
      // Handle error
    }
  }
}
