import { Controller, Post, Body, Get, Put, Delete, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';

@ApiTags('Transaction Management')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully', type: Transaction })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    try {
      return await this.transactionService.createTransaction(createTransactionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Returns all transactions', type: Transaction, isArray: true })
  @Get()
  async findAllTransactions(): Promise<Transaction[]> {
    try {
      return await this.transactionService.findAllTransactions();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ status: 200, description: 'Returns the transaction with the specified ID', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @Get(':id')
  async findTransactionById(@Param('id') id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionService.findTransactionById(id);
      if (!transaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Update transaction details' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Put(':id')
  async updateTransaction(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    try {
      const updatedTransaction = await this.transactionService.updateTransaction(id, updateTransactionDto);
      if (!updatedTransaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return updatedTransaction;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}