import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import CreateTemplateDto from './dto/create-template.dto';
import { HTTP_SUCCESS } from '../../config/httpcode';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template) private templateModel: Repository<Template>,
  ) {}

  async create(body: CreateTemplateDto) {
    const data = await this.templateModel.save(body);
    return {
      code: HTTP_SUCCESS,
      data: data,
      msg: '添加模版成功',
    };
  }

  async findAll() {
    const data = await this.templateModel.find();
    return {
      code: HTTP_SUCCESS,
      data: data?.map((item: any) => {
        const { id, name, url, type } = item;
        return {
          id,
          name,
          url,
          type,
        };
      }),
      msg: 'success',
    };
  }
}
