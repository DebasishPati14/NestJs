import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRequest, AuthResponse } from 'src/core/modules/auth/dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async postLogin(dto: AuthRequest): Promise<AuthResponse> {
    // check email exist
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials! (email');
    }
    // check password match
    const passwordMatch = await argon.verify(user.hash, dto.password);
    if (!passwordMatch) {
      throw new ForbiddenException('Invalid credentials! (pass');
    }
    delete user.hash;
    return this.secretToken(user.email, user.id);
  }

  async postSignUp(dto: AuthRequest): Promise<AuthResponse> {
    try {
      // get the hash for password
      const hash = await argon.hash(dto.password);

      // save the user in db
      const user = await this.prismaService.user.create({
        data: { email: dto.email, hash },
      });
      // return the user
      delete user.hash;
      return this.secretToken(user.email, user.id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email id exist!');
        }
      }
    }
  }

  async secretToken(email: string, userId: number) {
    const payload = { sub: userId, email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('SECRET_KEY'),
        expiresIn: '15m',
      }),
    };
  }
}
