import { Module } from '@nestjs/common';
import { MomentService } from './moment.service';
import { MomentController } from './moment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moment } from './entities/moment.entity';
import { MomentLabel } from '../label/entities/label.entity';
import { LabelModule } from '../../apis/label/label.module';

@Module({
  imports: [TypeOrmModule.forFeature([Moment, MomentLabel]), LabelModule],
  controllers: [MomentController],
  providers: [MomentService],
  exports: [MomentService],
})
export class MomentModule {}
