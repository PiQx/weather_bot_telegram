import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { TableWeather } from './table-weather';

async function openTableWeather(): Promise<TableWeather[]> {
    const tableWeather: any = [];
    return new Promise((resolve, reject) => {
        createReadStream('src/Multilingual_Weather_Conditions.csv')
            .pipe(csv())
            .on('data', data => tableWeather.push(data))
            .on('end', () => {
                resolve(tableWeather);
            })
            .on('error', error => reject(error));
    });
}

export default openTableWeather;
