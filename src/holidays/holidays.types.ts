export interface Holiday {
  date: string;
  name: string;
  description: string;
  state: string;
  year: string;
}

interface BaseHoliday {
  date: string;
  holidayName: string;
  information: string;
  moreInformation: string;
}

export interface HistoricalHoliday extends BaseHoliday {
  applicableTo: string;
}

export interface RecentHoliday extends BaseHoliday {
  rawDate: string;
  jurisdiction: string;
}

export interface queryType {
  [keys: string]: string;
}

export type HolidayPredicate = (holiday: Holiday) => boolean;
