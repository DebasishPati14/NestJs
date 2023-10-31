import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwtGuard') {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  async validate(reqPayload: { sub: number; email: string }) {
    const userObj = await this.prismaService.user.findUnique({
      where: { id: reqPayload.sub },
    });

    delete userObj.hash;
    return userObj;
  }
}
