import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { TableWeather } from './table-weather';

const PATH_TABLE = 'src/Multilingual_Weather_Conditions.csv';

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
