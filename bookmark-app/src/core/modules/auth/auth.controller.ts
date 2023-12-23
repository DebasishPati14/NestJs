import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest, AuthResponse } from 'src/core/modules/auth/dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Success', type: AuthResponse })
  @Post('sign-in')
  login(@Body() loginDto: AuthRequest): Promise<AuthResponse> {
    return this.authService.postLogin(loginDto);
  }

  @Post('sign-up')
  @ApiResponse({ status: 200, description: 'Success', type: AuthResponse })
  signup(@Body() signupDto: AuthRequest): Promise<AuthResponse> {
    return this.authService.postSignUp(signupDto);
  }
}
