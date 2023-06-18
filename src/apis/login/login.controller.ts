import { Controller, Post, Body } from '@nestjs/common';
import { SkipAuth } from 'src/decorator/skip-auth.decorator';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  @SkipAuth()
  login(@Body() body) {
    return this.loginService.login(body);
  }
}
