import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template } from './schemas/template.schema';
import CreateTemplateDto from './dto/create-template.dto';
import { HTTP_SUCCESS } from '../../config/httpcode';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<Template>,
  ) {}

  async create(body: CreateTemplateDto) {
    const createdTemplate = new this.templateModel(body);
    const data = await createdTemplate.save();
    return {
      code: HTTP_SUCCESS,
      data: data,
      msg: '添加模版成功',
    };
  }

  async findAll() {
    const data = await this.templateModel.find().exec();
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
