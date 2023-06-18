import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './apis/login/login.module';
import { UsersModule } from './apis/users/users.module';
import { MomentModule } from './apis/moment/moment.module';
import { CommentModule } from './apis/comment/comment.module';
import { LabelModule } from './apis/label/label.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './apis/file/file.module';
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // 上传文件的存储路径
    }),
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
    MomentModule,
    CommentModule,
    LabelModule,
    FileModule,
  ],
})
export class AppModule {}
