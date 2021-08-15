import csv = require('csv-parser');
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
import { logger } from './holidays.logger';
import { Holiday } from './holidays.types';

export const holidays: Holiday[] = [];
const allStates = ['ACT', 'SA', 'TAS', 'VIC', 'NSW', 'QLD', 'NT'];

const _getDataProcessor = (directory: string) => {
  switch (directory) {
    case 'historical-holidays':
      return (data: any) => {
        const isNational = data['Applicable To'] === 'NAT';

        let states: string[];
        if (isNational) {
          states = allStates;
        } else {
          states = data['Applicable To'].split('|');
        }

        states.forEach((state) => {
          const holiday: Holiday = {
            date: data.Date,
            name: data['Holiday Name'],
            description: data.Information,
            state,
            year: moment(data.Date).year().toString(),
          };
          holidays.push(holiday);
        });
      };
    case 'recent-holidays':
      return (data: any) => {
        const holiday: Holiday = {
          date: data.Date,
          name: data['Holiday Name'],
          description: data.Information,
          state: data.Jurisdiction,
          year: moment(data.Date).year().toString(),
        };
        holidays.push(holiday);
      };
    default:
      logger.error(`Unexpected resource directory name: ${directory}`);
  }
};

const _processFile = (filePath: string, processor: (chunk: any) => void) => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', processor)
    .on('end', () => {
      logger.debug(`Successfully read csv file: ${filePath}`);
    });
};

const readResources = async () => {
  try {
    const assetsDir = 'assets';
    const directories = await fs.promises.readdir(assetsDir);

    directories.forEach(async (directory) => {
      const assetsSubPath = path.join(assetsDir, directory);
      const files = await fs.promises.readdir(assetsSubPath);
      const processor = _getDataProcessor(directory);
      files.forEach((file) => {
        const filePath = path.join(assetsSubPath, file);
        _processFile(filePath, processor);
      });
    });
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
};

export default readResources;
