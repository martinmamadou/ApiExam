import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('admin')
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('admin/:id')
  @UseGuards(AdminGuard)
  getUserWithCertificatsAndImages(@Param('id') id: string) {
    return this.usersService.getUserWithCertificatsAndImages(id);
  }

  @Delete('admin/:id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id as `${string}-${string}-${string}-${string}-${string}`);
  }

}
