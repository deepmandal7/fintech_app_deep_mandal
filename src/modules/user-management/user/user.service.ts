import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';
import { PasswordService } from './pass.service';
import { ErrorHandlerService } from 'src/utils/error-handler/error-handler.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(ErrorHandlerService)
    private readonly errorHandlerService: ErrorHandlerService,
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
    @Inject(PasswordService) private readonly passwordService: PasswordService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const {
        userEmailId,
        userFname,
        userLname,
        userPassword,
        userMobileno,
        userCountrycode,
      } = createUserDto;
      const query = 'SELECT * FROM rd_insert_user($1, $2, $3, $4, $5, $6)';
      const values = [
        userEmailId,
        userFname,
        userLname,
        userPassword,
        userMobileno,
        userCountrycode,
      ];
      const result = await this.databaseService.executeQuery(query, values);
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }

  async findAllUsers(user: any): Promise<User[]> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT * FROM rd_get_user($1)',
      );
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }

  async findUserById(user: any, id: string): Promise<User> {
    try {
      const result = await this.databaseService.executeQuery(
        'SELECT * FROM users WHERE id = $1',
        [id],
      );
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }

  async updateUser(
    user: any,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const {
        userEmailId,
        userFname,
        userLname,
        userPassword,
        userMobileno,
        userCountrycode,
      } = updateUserDto;
      const query =
        'UPDATE users SET user_email_id = $1, user_fname = $2, user_lname = $3, user_password = $4, user_mobileno = $5, user_countrycode = $6 WHERE id = $7 RETURNING *';
      const values = [
        userEmailId,
        userFname,
        userLname,
        userPassword,
        userMobileno,
        userCountrycode,
        id,
      ];
      const result = await this.databaseService.executeQuery(query, values);
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }

  async deleteUser(user: any, id: string): Promise<boolean> {
    try {
      const result = await this.databaseService.executeQuery(
        'DELETE FROM users WHERE id = $1',
        [id],
      );
      return result[0];
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }

  async getUserByEmail(getUserByEmailDto: GetUserByEmailDto) {
    try {
      const user = await this.databaseService.executeQuery(
        `select * from rd_get_user($1, $2)`,
        [getUserByEmailDto.userEmailId, getUserByEmailDto.password],
      );
      if (user.length > 0) return user[0];
      return 'Failed to get user';
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }

  async getUserById(userid: string, userEmailId: string, mobile: any) {
    try {
      const user = await this.databaseService.executeQuery(
        `select * from rd_get_user_details($1, $2, $3, $4)`,
        [
          userid,
          userEmailId,
          mobile ? mobile.usercountrycode : null,
          mobile ? mobile.usermobileno : null,
        ],
      );
      if (user.length == 1) return user[0];

      return 'User not found';
    } catch (error) {
      return this.errorHandlerService.handleError(UserService.name, error);
    }
  }
}
