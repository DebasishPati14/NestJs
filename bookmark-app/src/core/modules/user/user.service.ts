import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(userId: number, updatedUser: EditUserDto) {
    const userResponse = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updatedUser,
      },
    });
    delete userResponse.hash;
    delete userResponse.id;
    return userResponse;
  }
}
