import TelegramClient from './telegram-client/telegram-client';
import config from './config';
import createMessage from './controllers/send-info-weather';
import { users } from './constants';
import openTableWeather from './controllers/parser-weather';
import weatherClient from './weather-client';
import { inspect } from 'util';

const telegramClient = new TelegramClient({ botToken: config.botTokenTelegram });

exports.handler = async (): Promise<void> => {
  try {
    const table = await openTableWeather();
    for (const user of users.values()) {
      const weatherResult = await weatherClient.getInfoCity(user.city);
      const { message } = createMessage(weatherResult, table);
      await telegramClient.sendMessage(message, user.chatId.toString());
      console.log(`Successful sending message to user with id: ${user.chatId}`);
    }
  } catch (e) {
    console.error(inspect(e));
  }
};
