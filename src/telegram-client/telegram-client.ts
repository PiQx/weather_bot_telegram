import BaseApiClient from '../base-api-client/base-api-client';

interface TelegramClientOptions {
  botToken: string;
}

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

class TelegramClient extends BaseApiClient {
  constructor(options: TelegramClientOptions) {
    super(`${TELEGRAM_API_URL}${options.botToken}`);
  }

  public async sendMessage(message: string, chatId: string): Promise<any> {
    return this.getPerform('sendMessage', { chat_id: chatId, text: message });
  }
}


export default TelegramClient;
