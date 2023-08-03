import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Template } from './schemas/template.schema';
import CreateTemplateDto from './dto/create-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<Template>,
  ) {}

  async create(body: CreateTemplateDto): Promise<Template> {
    const createdCat = new this.templateModel(body);
    return createdCat.save();
  }

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }
}
