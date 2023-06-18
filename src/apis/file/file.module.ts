import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { Avatar } from './entities/file.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Avatar])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
