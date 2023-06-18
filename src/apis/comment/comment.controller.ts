import { VerifyPermissionGuard } from '../../guards/verifyPermission.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentService.create({
      userId: req.user.id,
      ...createCommentDto,
    });
  }
  @Post('/reply')
  reply(@Body() replyDto: CreateCommentDto, @Req() req) {
    return this.commentService.reply({
      userId: req.user.id,
      ...replyDto,
    });
  }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':commentId')
  @UseGuards(VerifyPermissionGuard)
  remove(@Param('commentId') id: string) {
    return this.commentService.remove(+id);
  }
}
