import openTableWeather from './utils/open-table-weather';
import { users } from './constants';
import createMessage from './utils/create-message';
import WeatherClient from './weather-client/weather-client';
import config from './config';
import VkClient from './vk-client/vk-client';

const client = new WeatherClient({ apiKey: config.weatherApiKey });
const vkClient = new VkClient({ accessToken: config.vkApiKey });

async function test() {
  const table = await openTableWeather();
  const user = users.get('vika');
  if (!user) {
    throw new Error('User not found');
  }

  const weatherResult = await client.getInfoCity(user.city);
  console.log(weatherResult);
  const { message } = createMessage(weatherResult, table);
  await vkClient.sendMessage(message, [user.userId]);
  console.log(`Successful sending message to user with id: ${user.userId}`);
}

test().catch(error => console.error(error));
