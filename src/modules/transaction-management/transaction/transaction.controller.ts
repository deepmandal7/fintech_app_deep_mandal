import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transaction Management')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: Transaction,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      return await this.transactionService.createTransaction(
        createTransactionDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all transactions',
    type: Transaction,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllTransactions(): Promise<Transaction[]> {
    try {
      return await this.transactionService.findAllTransactions();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the transaction with the specified ID',
    type: Transaction,
  })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findTransactionById(@Param('id') id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionService.findTransactionById(id);
      if (!transaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Update transaction details' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully',
    type: Transaction,
  })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Put(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    try {
      const updatedTransaction =
        await this.transactionService.updateTransaction(
          id,
          updateTransactionDto,
        );
      if (!updatedTransaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return updatedTransaction;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      const result = await this.transactionService.deleteTransaction(id);
      if (!result) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get total expenses' })
  @ApiResponse({ status: 200, description: 'Return total expenses' })
  @Get('summary/total-expenses')
  @UseGuards(AuthGuard('jwt'))
  async getTotalExpenses(): Promise<{ totalExpenses: number }> {
    try {
      const totalExpenses = await this.transactionService.getTotalExpenses();
      return { totalExpenses };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get total income' })
  @ApiResponse({ status: 200, description: 'Return total income' })
  @Get('summary/total-income')
  @UseGuards(AuthGuard('jwt'))
  async getTotalIncome(): Promise<{ totalIncome: number }> {
    try {
      const totalIncome = await this.transactionService.getTotalIncome();
      return { totalIncome };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get category-wise spending' })
  @ApiResponse({ status: 200, description: 'Return category-wise spending' })
  @Get('summary/category-wise-spending')
  @UseGuards(AuthGuard('jwt'))
  async getCategoryWiseSpending(): Promise<{ [key: string]: number }> {
    try {
      const categoryWiseSpending =
        await this.transactionService.getCategoryWiseSpending();
      return categoryWiseSpending;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
