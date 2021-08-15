import { Controller, Get, Query } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { Holiday, queryType } from './holidays.types';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get()
  listHolidays(@Query() query: queryType): Holiday[] {
    return this.holidaysService.listHolidays(query);
  }
}
