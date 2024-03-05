import { ApiResponseProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserTypeEnum } from 'src/modules/user-management/user/enum/user.enum';

export class Auth {
  @ApiResponseProperty({
    example:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMmNkMGNmZi00NmExLTQxODgtOWNkZS0wMWQ1Y2E5NjE1ZDUiLCJ1c2VydHlwZSI6IkFETUlOIiwiaWF0IjoxNjgxOTg1ODQ4fQ.kl8LVd7OVtgZJ5BkkxnlObi-rrAc5xxbbZz2QT9WDfM',
  })
  @IsString()
  @IsNotEmpty()
  Authorization: string;
}
