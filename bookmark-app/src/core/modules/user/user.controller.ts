import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto, UserResponse } from './dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-me')
  @ApiResponse({ status: 200, description: 'Success', type: UserResponse })
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit-me')
  @ApiResponse({ status: 200, description: 'Success', type: UserResponse })
  editUser(@GetUser('id') userId: number, @Body() updatedUser: EditUserDto) {
    return this.userService.editUser(userId, updatedUser);
  }
}
