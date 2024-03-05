import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class BaseResponseEntity {
  @IsString()
  @ApiProperty({ example: 'Success' })
  message: string;

  @IsObject()
  @ApiProperty({
    example: {},
  })
  data: any;
}
