import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { TableWeather } from './table-weather';
import config from '../config';

const PATH_TABLE = config.file;

async function openTableWeather(): Promise<TableWeather[]> {
  const tableWeather: any = [];
  return new Promise((resolve, reject) => {
    createReadStream(PATH_TABLE)
      .pipe(csv())
      .on('data', data => tableWeather.push(data))
      .on('end', () => {
        resolve(tableWeather);
      })
      .on('error', error => reject(error));
  });
}

export default openTableWeather;
