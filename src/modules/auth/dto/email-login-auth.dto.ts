import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class EmailLoginAuthDto {
  @ApiProperty({ example: 'example@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  userEmailId: string;

  @ApiProperty({ example: 'John@321' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
