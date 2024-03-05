import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserTypeEnum } from '../../user-management/user/enum/user.enum';

export class EmailSignupAuthDto {
  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  userEmailId: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  userPassword: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  userFname: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  userLastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Mobile number must not be empty' })
  userMobileno: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Country code must not be empty' })
  userCountrycode: string;

  @ApiProperty({
    example: UserTypeEnum.CUSTOMER,
    description: 'The type of the user',
    enum: UserTypeEnum,
  })
  @IsEnum(UserTypeEnum, { message: 'Invalid user type' })
  @IsNotEmpty({ message: 'User type is required' })
  userType: UserTypeEnum;
}
