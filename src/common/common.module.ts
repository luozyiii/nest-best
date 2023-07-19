import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Common',
      useValue: { author: 'Leslie' },
    },
  ],
  exports: [
    {
      provide: 'Common',
      useValue: { author: 'Leslie' },
    },
  ],
})
export class CommonModule {}
