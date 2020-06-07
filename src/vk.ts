import openTableWeather from './utils/open-table-weather';
import {MESSAGE_KEY, users} from './constants';
import { inspect } from 'util';
import createMessage from './utils/create-message';
import weatherClient from './weather-client';
import vkClient from './vk-client';
import delay from './utils/delay';

const TIME_DELAY = 1000 * 2; // 3 секунды

exports.handler = async (): Promise<void> => {
  try {
    const table = await openTableWeather();
    for (const user of users.values()) {
      const weatherResult = await weatherClient.getInfoCity(user.city);
      const { message } = createMessage(weatherResult, table);
      await vkClient.sendMessage(message, [user.userId]);
      console.log(`Successful sending message to user with id: ${user.userId}`);
      await delay(TIME_DELAY);
    }

    if (users.get('vikaMSK') !== undefined) {
      const userId = users.get('vikaMSK')?.userId;
      await vkClient.sendMessage(MESSAGE_KEY, [userId as string])
    }

  } catch (e) {
    console.error(inspect(e));
  }
};
