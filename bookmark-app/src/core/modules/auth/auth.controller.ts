import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/core/modules/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  login(@Body() loginDto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.postLogin(loginDto);
  }

  @Post('sign-up')
  signup(@Body() signupDto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.postSignUp(signupDto);
  }
}
