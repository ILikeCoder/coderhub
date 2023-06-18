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
  Query,
  UseGuards,
} from '@nestjs/common';
import { MomentService } from './moment.service';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { SkipAuth } from 'src/decorator/skip-auth.decorator';
@Controller('moment')
export class MomentController {
  constructor(private readonly momentService: MomentService) {}

  @Post()
  create(@Req() req, @Body() createMomentDto: CreateMomentDto) {
    const { id: userId } = req.user;
    return this.momentService.create({ userId, ...createMomentDto });
  }

  @Get()
  @SkipAuth()
  findAll(
    @Query('pageNum') pageNum: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.momentService.findAll(pageNum, pageSize);
  }

  @Get(':momentId')
  @SkipAuth()
  findOne(@Param('momentId') id: string) {
    return this.momentService.findOne(+id);
  }

  @Post(':momentId/labels')
  @UseGuards(VerifyPermissionGuard)
  addLabels(@Body() body: { momentId: number; labels: string[] }) {
    return this.momentService.addMomentLabel(body);
  }

  @Patch(':momentId')
  @UseGuards(VerifyPermissionGuard)
  update(
    @Param('momentId') id: string,
    @Body() updateMomentDto: UpdateMomentDto,
  ) {
    return this.momentService.update(+id, updateMomentDto);
  }

  @Delete(':momentId')
  @UseGuards(VerifyPermissionGuard)
  remove(@Param('momentId') id: string) {
    return this.momentService.remove(+id);
  }
}
