import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  // 新增评论
  async create(createCommentDto: CreateCommentDto) {
    const { content, momentId, userId } = createCommentDto;
    const result = await this.commentRepository.query(
      `INSERT INTO comment (content,momentId,userId) VALUES(?,?,?)`,
      [content, momentId, userId],
    );
    return result;
  }
  // 回复评论
  async reply(createCommentDto: CreateCommentDto) {
    const { content, momentId, commentId, userId } = createCommentDto;
    const result = await this.commentRepository.query(
      `INSERT INTO comment (content,momentId,commentId,userId) VALUES(?,?,?,?)`,
      [content, momentId, commentId, userId],
    );
    return result;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    await this.commentRepository.query(`DELETE FROM comment WHERE id = ?`, [
      id,
    ]);
    return {
      code: 200,
      message: '删除评论成功',
    };
  }
}
