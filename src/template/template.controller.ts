import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemplateService } from './template.service';
import CreateTemplateDto from './dto/create-template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  getTemplate() {
    return this.templateService.findAll();
  }

  @Post('/add')
  createTemplate(@Body() body: CreateTemplateDto) {
    return this.templateService.create(body);
  }
}
