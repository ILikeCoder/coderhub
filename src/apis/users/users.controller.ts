import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipAuth } from 'src/decorator/skip-auth.decorator';
import fs, { read } from 'fs';
import path from 'path';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('avatar/:userId')
  @SkipAuth()
  async getAvatar(@Param('userId') userId: string, @Res() res: Response) {
    const { filename } = await this.usersService.showAvatarImage(userId);
    const uploadsPath = path.resolve(__dirname, '../../../src/uploads');
    const readImage = fs.createReadStream(`${uploadsPath}/${filename}`);
    readImage.pipe(res);
  }
}
