import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import crypto from 'crypto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;
    if (!name || !password) {
      return {
        code: 500,
        message: '用户名和密码必须输入',
        data: null,
      };
    }
    const user = await this.findOne(name);
    if (user) {
      return {
        code: 500,
        message: '用户名已经存在~',
        data: null,
      };
    }
    const md5 = crypto.createHash('md5');
    await this.userService.save({
      ...createUserDto,
      password: md5.update(password).digest('hex'),
    });
    const findUser = await this.findOne(name);
    return {
      code: 200,
      message: '创建用户成功~',
      data: findUser,
    };
  }

  findAll() {
    return this.userService.find();
  }

  findOne(name: string) {
    return this.userService.findOne({
      where: {
        name,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
