import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { md5Password } from 'src/utils/md5';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}
  async login({ name, password }: LoginDTO) {
    if (!name || !password) {
      return {
        code: 500,
        message: '缺少用户名或密码~',
        data: null,
      };
    }
    const user = await this.usersService.findOne(name);
    if (!user) {
      return {
        code: 500,
        message: '当前用户不存在~',
        data: null,
      };
    }

    if (user.password !== md5Password(password)) {
      return {
        code: 500,
        message: '用户名或密码错误~',
        data: null,
      };
    }

    const private_key = fs.readFileSync('../keys/PRIVATE_KEY.key');
    const token = jwt.sign(
      { id: user.id, name },
      { key: private_key, passphrase: '9981' },
      {
        expiresIn: 24 * 60 * 60,
        algorithm: 'RS256',
      },
    );
    return {
      code: 200,
      message: '登录成功',
      data: {
        id: user.id,
        name,
        token,
        expired: 24 * 60 * 60,
      },
    };
  }
}
