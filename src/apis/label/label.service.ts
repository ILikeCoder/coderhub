import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}
  async create(createLabelDto: CreateLabelDto) {
    const label = await this.findOne(createLabelDto.name);
    if (!label) return this.labelRepository.save(createLabelDto);
    return {
      code: 500,
      message: '标签已存在',
      id: label.id,
    };
  }

  findAll() {
    return `This action returns all label`;
  }

  findOne(name: string) {
    return this.labelRepository.findOne({
      where: {
        name,
      },
    });
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return `This action updates a #${id} label`;
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }
}
