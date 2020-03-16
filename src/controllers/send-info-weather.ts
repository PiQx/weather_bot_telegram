import { GetWeatherResult } from '../weather-client/get-weather-result';
import { TableWeather } from './table-weather';

interface CreateMessageResult {
  message: string;
  status: string;
}

function createMessage(params: GetWeatherResult, table: TableWeather[]): CreateMessageResult {
  const {
    current: { weather_code, wind_speed, pressure, feelslike, temperature, humidity },
    location: { localtime, name },
  } = params;

  const statusWeather = table.filter(
    element => element.overhead_code === weather_code.toString() && element.lang_name === 'Russian',
  );

  const message = `Время: ${localtime}. Город: ${name}.\n${statusWeather[0].trans_text_day} Температура: ${temperature}°C.\tВлажность ${humidity}%\tощущается как ${feelslike}.\nВетер: ${wind_speed}км\\ч, Давление ${pressure} Millibar`;

  return {
    message,
    status: statusWeather[0].trans_text_day,
  };
}

export default createMessage;

