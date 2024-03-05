import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserByEmailDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsString()
  @IsNotEmpty()
  userEmailId: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
