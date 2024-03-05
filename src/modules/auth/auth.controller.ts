import {
  Controller,
  Post,
  Body,
  HttpCode,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponseEntity } from 'src/entities/base-response.entity';
import { AuthService } from './auth.service';
import { EmailLoginAuthDto } from './dto/email-login-auth.dto';
import { EmailSignupAuthDto } from './dto/email-signup-auth.dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup a user using email and mobile' })
  @ApiOkResponse({ type: BaseResponseEntity })
  @Post('email-signup')
  @HttpCode(200)
  async emailSignup(
    @Body() emailSignupAuthDto: EmailSignupAuthDto,
  ): Promise<BaseResponseEntity> {
    const response = await this.authService.emailSignup(emailSignupAuthDto);
    if (typeof response !== 'string')
      return {
        message: 'Signed up successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }

  @ApiOperation({ summary: 'Login a user using email' })
  @ApiOkResponse({ type: BaseResponseEntity })
  @Post('email-login')
  @HttpCode(200)
  async emailLogin(
    @Body() emailLoginAuthDto: EmailLoginAuthDto,
  ): Promise<BaseResponseEntity> {
    const response = await this.authService.emailLogin(emailLoginAuthDto);
    if (typeof response !== 'string')
      return {
        message: 'Logged in successfully',
        data: response,
      };

    throw new UnauthorizedException({
      message: response,
      data: {},
    });
  }
}
