import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { HolidayHelper } from './holidays.helper';

@Module({
  controllers: [HolidaysController],
  providers: [HolidaysService, HolidayHelper],
})
export class HolidaysModule {}
