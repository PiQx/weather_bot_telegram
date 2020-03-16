import openTableWeather from './controllers/parser-weather';
import { users } from './constants';
import { inspect } from 'util';
import WeatherClient from './weather-client/weather-client';
import config from './config';
import VkClient from './vk-client/vk-client';
import createMessage from './controllers/send-info-weather';

const client = new WeatherClient({ apiKey: config.weatherApiKey });
const vkClient = new VkClient({ accessToken: config.vkApiKey });

exports.handler = async (): Promise<void> => {
  try {
    const table = await openTableWeather();
    for (const user of users.values()) {
      const weatherResult = await client.getInfoCity(user.city);
      const { message } = createMessage(weatherResult, table);
      await vkClient.sendMessage(message, [user.userId]);
      console.log(`Successful sending message to user with id: ${user.userId}`);
    }
  } catch (e) {
    console.error(inspect(e));
  }
};
