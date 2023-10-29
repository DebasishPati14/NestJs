import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/core/modules/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: AuthDto) {
    // login(
    //   @Body('email') email: string,
    //   @Body('password', ParseIntPipe) password: number,
    // ) {
    console.log({ dto: loginDto });

    return this.authService.postLogin(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() signupDto: AuthDto) {
    return this.authService.postSignUp(signupDto);
  }
}
