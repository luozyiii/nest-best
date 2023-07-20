import { ApiProperty } from '@nestjs/swagger';

export default class SearchBookDto {
  @ApiProperty({ default: '三国演义' })
  readonly name: string;
}
