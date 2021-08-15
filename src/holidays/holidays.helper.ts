import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { logger } from './holidays.logger';
import { Holiday, HolidayPredicate } from './holidays.types';

@Injectable()
export class HolidayHelper {
  getPredicate(queryName: string, queryValue: string): HolidayPredicate {
    switch (queryName) {
      case 'state':
        return (holiday: Holiday) => {
          return holiday.state?.toUpperCase() === queryValue.toUpperCase();
        };
      case 'month':
        return (holiday: Holiday) => {
          const date = moment(holiday.date);
          return date.month() === parseInt(queryValue, 10) - 1;
        };
      case 'year':
        return (holiday: Holiday) => {
          const date = moment(holiday.date);
          logger.debug(date.year());
          return date.year() === parseInt(queryValue, 10);
        };
      case 'name':
        return (holiday: Holiday) => {
          const { name } = holiday;
          return name
            .toUpperCase()
            .includes((queryValue as string).toUpperCase());
        };

      default:
        logger.error(`Unknown query name: ${queryName}`);
        return () => {
          return true;
        };
    }
  }
}
