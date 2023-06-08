import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [UsersModule],
})
export class LoginModule {}
