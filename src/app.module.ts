import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { LoginModule } from './apis/login/login.module';
import { UsersModule } from './apis/users/users.module';
import { MomentModule } from './apis/moment/moment.module';
import { CommentModule } from './apis/comment/comment.module';
import { LabelModule } from './apis/label/label.module';
import { FileModule } from './apis/file/file.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(3306),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        const { DATABASE_HOST, DATABASE_PORT, USERNAME, PASSWORD, DATABASE } =
          process.env;
        return {
          type: 'mysql',
          host: DATABASE_HOST,
          port: +DATABASE_PORT,
          username: USERNAME, // 数据库用户名
          password: PASSWORD, // 数据库密码
          database: DATABASE,
          retryDelay: 100,
          retryAttempts: 1,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    MulterModule.register({
      dest: './uploads', // 上传文件的存储路径
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
