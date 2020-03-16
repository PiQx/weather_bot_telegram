import WeatherClient from '../weather-client/weather-client';
import VkClient from '../vk-client/vk-client';
import config from '../config';
import { users } from '../constants';
import openTableWeather from './parser-weather';
import { GetWeatherResult } from '../weather-client/get-weather-result';
import { TableWeather } from './table-weather';
import { inspect } from 'util';

const client = new WeatherClient({ apiKey: config.weatherApiKey });
const vkClient = new VkClient({ accessToken: config.vkApiKey });

interface CreateMessageResult {
    message: string;
    status: string;
}

const ONE_SEC = 1000;

function createMessage(params: GetWeatherResult, table: TableWeather[]): CreateMessageResult {
    const {
        current: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            weather_code,
            // eslint-disable-next-line @typescript-eslint/camelcase
            wind_speed,
            pressure,
            feelslike,
            temperature,
            humidity,
        },
        location: { localtime, name },
    } = params;

    const statusWeather = table.filter(
        // eslint-disable-next-line @typescript-eslint/camelcase
        element => element.overhead_code === weather_code.toString() && element.lang_name === 'Russian',
    );

    const message = `Время: ${localtime}. Город: ${name}.\n${statusWeather[0].trans_text_day} Температура: ${temperature}°C.\tВлажность ${humidity}%\tощущается как ${feelslike}.\nВетер: ${wind_speed}км\\ч, Давление ${pressure} Millibar`;

    return {
        message,
        status: statusWeather[0].trans_text_day,
    };
}
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
    while (true) {
        try {
            const table = await openTableWeather();
            for (const user of users.values()) {
                const weatherResult = await client.getInfoCity(user.city);
                const { message } = createMessage(weatherResult, table);
                await vkClient.sendMessage(message, [user.userId]);
            }
            await delay(ONE_SEC * 60 * 60);
        } catch (e) {
            console.error(inspect(e));
            await delay(ONE_SEC * 60 * 60);
        }
    }
}

export default main;
