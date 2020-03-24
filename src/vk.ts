import openTableWeather from './utils/open-table-weather';
import { users } from './constants';
import { inspect } from 'util';
import config from './config';
import VkClient from './vk-client/vk-client';
import createMessage from './utils/create-message';
import weatherClient from './weather-client';

const vkClient = new VkClient({ accessToken: config.vkApiKey });

exports.handler = async (): Promise<void> => {
  try {
    const table = await openTableWeather();
    for (const user of users.values()) {
      const weatherResult = await weatherClient.getInfoCity(user.city);
      const { message } = createMessage(weatherResult, table);
      await vkClient.sendMessage(message, [user.userId]);
      console.log(`Successful sending message to user with id: ${user.userId}`);
    }
  } catch (e) {
    console.error(inspect(e));
  }
};
