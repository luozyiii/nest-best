import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
  @ApiProperty({ default: '三国演义' })
  readonly name: string;

  @ApiProperty({ default: '三国演义是一本好书' })
  readonly description: string;
}
