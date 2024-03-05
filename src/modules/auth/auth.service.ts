import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user-management/user/entities/user.entity';
import { EmailLoginAuthDto } from './dto/email-login-auth.dto';
import { EmailSignupAuthDto } from './dto/email-signup-auth.dto';
import { Auth } from './entities/auth.entity';
import { UserService } from '../user-management/user/user.service';
import { UserTypeEnum } from '../user-management/user/enum/user.enum';
import { ErrorHandlerService } from 'src/utils/error-handler/error-handler.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ErrorHandlerService)
    private readonly errorHandlerService: ErrorHandlerService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async emailSignup(
    emailSignupAuthDto: EmailSignupAuthDto,
  ): Promise<Auth | string> {
    try {
      // Create a user with email
      const createUser = await this.userService.createUser(emailSignupAuthDto);

      // If the user is successfully created, send an account creation email and return the authentication token
      if (
        typeof createUser !== 'string' &&
        createUser &&
        createUser.status == 1
      ) {
        return await this.getToken(null, emailSignupAuthDto.userEmailId, null);
      }
      // Return an error message if user creation fails (e.g., user already exists)
      return 'Signup failed - User already exists';
    } catch (error) {
      // Handle errors and return the error message
      return this.errorHandlerService.handleError(AuthService.name, error);
    }
  }

  /**
   * Handles user login using email authentication.
   *
   * @param {EmailLoginAuthDto} emailLoginAuthDto - The data transfer object containing email login authentication information.
   * @return {Promise<Auth | string>} A promise resolving to the authentication result or an error message.
   */
  async emailLogin(
    emailLoginAuthDto: EmailLoginAuthDto,
  ): Promise<Auth | string> {
    try {
      // Retrieve user details based on the provided email
      const user = await this.userService.getUserByEmail(emailLoginAuthDto);

      // Check if the user exists and has the correct user type (CUSTOMER)
      if (user.id && user.userType == UserTypeEnum.CUSTOMER) {
        // Generate and return a new authentication token
        return await this.getToken(user.userid, null, null);
      }

      // If user does not exist or has incorrect user type, return an error message
      return 'Email/password incorrect';
    } catch (error) {
      // Handle errors and return the error message
      // return this.errorHandlerService.handleError(AuthService.name, error);
    }
  }

  /**
   * Retrieves user details by ID, email, or mobile, and generates an authentication token.
   *
   * @param {string} userId - The user ID (optional).
   * @param {string} userEmailId - The user email ID (optional).
   * @param {{ usercountrycode: string; usermobileno: string }} userMobile - The user mobile information (optional).
   * @return {Promise<Auth | string>} A promise resolving to the authentication result or an error message.
   */
  async getToken(
    userId: string = null,
    userEmailId: string = null,
    userMobile: { usercountrycode: string; usermobileno: string } | null,
  ): Promise<Auth | string> {
    try {
      // Retrieve user details based on the provided ID, email, or mobile
      const userDetails: User | string = await this.userService.getUserById(
        userId,
        userEmailId,
        userMobile,
      );

      // Check if user details are found
      if (typeof userDetails == 'string') {
        return 'User not found';
      }

      // Generate and return an authentication token
      return {
        ...userDetails,
        Authorization: await this.jwtService.signAsync({
          sub: userDetails.id,
          userFname: userDetails.userFname,
          userLname: userDetails.userLname,
          userEmailId: userDetails.userEmailId,
          userCountrycode: userDetails.userCountrycode,
          userMobileno: userDetails.userMobileno,
          userType: userDetails.userType,
        }),
      };
    } catch (error) {
      // Handle errors and return the error message
      // return this.errorHandlerService.handleError(AuthService.name, error);
    }
  }
}
