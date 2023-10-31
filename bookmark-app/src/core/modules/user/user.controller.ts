import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-me')
  getMe(@GetUser() user: User, @GetUser('email') userEmail: User) {
    console.log(userEmail);
    return user;
  }

  @Patch('edit-me')
  editUser(@GetUser('id') userId: number, @Body() updatedUser: EditUserDto) {
    return this.userService.editUser(userId, updatedUser);
  }
}
