import { ApiProperty } from '@nestjs/swagger';
export default class CreateTemplateDto {
  @ApiProperty({ default: 'vite-antd-pc' })
  readonly name: string;

  @ApiProperty({ default: 'project' })
  readonly type: string;

  @ApiProperty({ default: 'https://github.com/luozyiii/vite-antd-pc' })
  readonly url: string;
}
