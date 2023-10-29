import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from './strategy/auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
