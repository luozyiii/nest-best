import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import CreateTemplateDto from './dto/create-template.dto';
import { Public } from '../decorators/public.decorator';

@Controller('template')
@ApiTags('Github 模版')
@Public()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('/list')
  @ApiOperation({ summary: '全部模版' })
  getTemplate() {
    return this.templateService.findAll();
  }

  @Post('/add')
  @ApiOperation({ summary: '添加书籍' })
  @ApiBody({ type: CreateTemplateDto })
  createTemplate(@Body() body: CreateTemplateDto) {
    return this.templateService.create(body);
  }
}
