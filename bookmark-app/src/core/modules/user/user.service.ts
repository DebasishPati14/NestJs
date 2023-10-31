import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(userId: number, updatedUser: EditUserDto) {
    const userResponse = this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updatedUser,
      },
    });
    delete (await userResponse).hash;
    return userResponse;
  }
}
