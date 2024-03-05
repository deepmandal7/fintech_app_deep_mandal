import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  userEmailId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'First name must not be empty' })
  userFname: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userLname?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  userPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Mobile number must not be empty' })
  userMobileno: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Country code must not be empty' })
  userCountrycode: string;
}
