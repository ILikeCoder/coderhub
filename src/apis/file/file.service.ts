import { Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { createWriteStream } from 'fs';
import path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Avatar } from './entities/file.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Avatar)
    private readonly fileRepository: Repository<Avatar>,
  ) {}
  async create({ mimetype, size, buffer }, user) {
    const uploadsPath = path.resolve(__dirname, '../../uploads');
    const filename = uuidv4();
    const writeImage = createWriteStream(`${uploadsPath}/${filename}`);
    writeImage.write(buffer);
    writeImage.end();

    const statement =
      'INSERT INTO avatar (filename,mimetype,size,userId) VALUES (?,?,?,?)';

    await this.fileRepository.query(statement, [
      filename,
      mimetype,
      size,
      user.id,
    ]);
    const { SERVE_HOST, SERVE_PORT } = process.env;
    const avatar_url = `${SERVE_HOST}:${SERVE_PORT}/users/avatar/${user.id}`;
    await this.updateUserAvatar(avatar_url, user.id);

    return {
      code: 200,
      message: '文件上传成功~',
      data: {
        url: avatar_url,
      },
    };
  }

  async updateUserAvatar(avatar_url, id) {
    const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?';
    return this.fileRepository.query(statement, [avatar_url, id]);
  }
  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
