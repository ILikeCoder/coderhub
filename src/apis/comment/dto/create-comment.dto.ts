export class CreateCommentDto {
  content: string;
  momentId: number;
  userId: number;
  commentId?: number;
}
