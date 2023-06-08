import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '119.23.233.156',
      port: 3306,
      username: 'root', // 数据库用户名
      password: 'Aa123456@', // 数据库密码
      database: 'coderhub',
      retryDelay: 100,
      retryAttempts: 1,
      synchronize: true,
      autoLoadEntities: true,
    }),
    LoginModule,
    UsersModule,
  ],
})
export class AppModule {}
