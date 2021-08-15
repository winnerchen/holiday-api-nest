import { Injectable } from '@nestjs/common';
import { HolidayHelper } from './holidays.helper';
import { holidays } from './holidays.resource';
import { Holiday, queryType } from './holidays.types';

@Injectable()
export class HolidaysService {
  constructor(private readonly holidayHelper: HolidayHelper) {}
  listHolidays(queries: queryType): Holiday[] {
    let results = holidays;

    for (const queryName of Object.keys(queries)) {
      const queryValue = queries[queryName];
      const predicate = this.holidayHelper.getPredicate(queryName, queryValue);
      results = results.filter(predicate);
    }
    return results;
  }
}
