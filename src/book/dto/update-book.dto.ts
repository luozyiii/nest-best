import { ApiProperty } from '@nestjs/swagger';

export default class UpdateBookDto {
  @ApiProperty()
  readonly description: string;
}
