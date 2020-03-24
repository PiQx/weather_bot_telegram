import openTableWeather from './controllers/parser-weather';
import { users } from './constants';
import createMessage from './controllers/send-info-weather';
import WeatherClient from './weather-client/weather-client';
import config from './config';
import VkClient from './vk-client/vk-client';

const client = new WeatherClient({ apiKey: config.weatherApiKey });
const vkClient = new VkClient({ accessToken: config.vkApiKey });

(async function test() {
  const table = await openTableWeather();
  for (const user of users.values()) {
    const weatherResult = await client.getInfoCity(user.city);
    const { message } = createMessage(weatherResult, table);
    await vkClient.sendMessage(message, [user.userId]);
    console.log(`Successful sending message to user with id: ${user.userId}`);
  }
})().catch(error => console.log(error));
