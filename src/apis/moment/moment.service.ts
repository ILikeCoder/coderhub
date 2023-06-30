import { Injectable } from '@nestjs/common';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './entities/moment.entity';
import { MomentLabel } from '../label/entities/label.entity';
import { LabelService } from '../../apis/label/label.service';
interface label {
  name: string;
  id?: number;
}
@Injectable()
export class MomentService {
  constructor(
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    @InjectRepository(MomentLabel)
    private readonly moment_labelRepository: Repository<MomentLabel>,
    private readonly labelService: LabelService,
  ) {}
  async create(createMomentDto: CreateMomentDto) {
    await this.momentRepository.save(createMomentDto);
    return {
      code: 200,
      message: '发布动态成功',
    };
  }

  async findAll(pageNum = 1, pageSize = 10) {
    const offset = (pageNum - 1) * pageSize;
    const statement = `
    SELECT
    m.id id,
    m.content content,
    m.createAt createTime,
    m.updateAt updateTime,
      JSON_OBJECT(
        'id', u.id,
        'name', u.NAME,
        'avatar_url',u.avatar_url
      ) user ,
      (SELECT COUNT(*) FROM comment WHERE comment.momentId = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.momentId = m.id) labelCount
    FROM moment m
    LEFT JOIN user u ON u.id = m.userId 
    LIMIT ? OFFSET ?
  `;
    const result = await this.momentRepository.query(statement, [
      +pageSize,
      +offset,
    ]);

    return result;
  }

  async findOne(id: number) {
    const statement = `
    SELECT
    m.id id,
    m.content content,
    m.createAt createTime,
    m.updateAt updateTime,
    JSON_OBJECT(
      'id', u.id,
      'name', u.NAME,
      'avatar_url',u.avatar_url
    ) user,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'id',c.id,
      'content',c.content,
      'commentId',c.commentId,
      'user',JSON_OBJECT(
        'id',cu.id,
        'name',cu.name,
        'avatar_url',u.avatar_url
      )
    )) FROM comment c LEFT JOIN user cu ON c.userId = cu.id WHERE c.momentId = m.id) comments,
    (JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name))) labels
    FROM moment m
    LEFT JOIN user u ON u.id = m.userId
    LEFT JOIN moment_label ml ON ml.momentId = m.id
    LEFT JOIN label l ON ml.labelId = l.id
    WHERE m.id = ? 
    GROUP BY m.id
    `;
    const result = await this.momentRepository.query(statement, [id]);
    return result;
  }

  async addMomentLabel(data: { momentId: number; labels: string[] }) {
    const labels: label[] = [];
    for (const name of data.labels) {
      const result = await this.queryLabelByName(name);
      const labelObject: label = { name };
      if (result) {
        labelObject.id = result.id;
      } else {
        const result = await this.labelService.create({ name });
        labelObject.id = result.id;
      }
      labels.push(labelObject);
    }
    const { momentId } = data;
    for (const label of labels) {
      const isExist = await this.hasLabel(momentId, label.id);
      if (!isExist) await this.addMomentLabelRelation(momentId, label.id);
    }
    return {
      code: 200,
      message: '为动态添加标签成功~',
    };
  }
  async queryLabelByName(name) {
    const statement = 'SELECT * FROM label Where name = ?';
    const result = await this.momentRepository.query(statement, [name]);
    return result[0];
  }
  // 添加moment_label表的关系
  async addMomentLabelRelation(momentId, labelId) {
    const statement = `INSERT INTO moment_label (momentId,labelId) VALUES (?,?)`;
    await this.moment_labelRepository.query(statement, [momentId, labelId]);
  }
  async hasLabel(momentId, labelId) {
    const statement =
      'SELECT * FROM moment_label WHERE momentId = ? AND labelId = ?';
    const result = await this.moment_labelRepository.query(statement, [
      momentId,
      labelId,
    ]);
    return !!result.length;
  }

  update(id: number, updateMomentDto: UpdateMomentDto) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?';
    return this.momentRepository.query(statement, [
      updateMomentDto.content,
      id,
    ]);
  }

  remove(id: number) {
    const statement = 'DELETE FROM moment WHERE id = ?';
    return this.momentRepository.query(statement, [id]);
  }
}
