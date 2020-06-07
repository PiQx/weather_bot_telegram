import BaseApiClient from '../base-api-client/base-api-client';
import { SendMessageResult } from './send-message-result';
import faker from 'faker';
import VkErrors from './errors';

interface VkClientMethods {
  sendMessage(message: string, userIds: string[]): Promise<SendMessageResult>;
  sendSticker(stickerId: number, userId: string): Promise<SendMessageResult>;
}

interface VkClientOptions {
  accessToken: string;
}

const URL_API = 'https://api.vk.com/method';
const VERSION_API = '5.103';

class VkClient extends BaseApiClient implements VkClientMethods {
  constructor(params: VkClientOptions) {
    super(URL_API);
    this.apiKey = params.accessToken;
  }

  private readonly apiKey: string;

  public async sendMessage(message: string, userIds: string[]): Promise<SendMessageResult> {
    const params = {
      message,
      access_token: this.apiKey,
      random_id: faker.random.number(),
      user_ids: userIds,
      v: VERSION_API,
    };
    const result = await this.getPerform('messages.send', params);

    return this.parseResponse(result);
  }

  public async sendSticker(stickerId: number, userId: string): Promise<SendMessageResult> {
    const params = {
      access_token: this.apiKey,
      random_id: faker.random.number(),
      user_ids: userId,
      v: VERSION_API,
      sticker_id: stickerId,
    };
    const result = await this.getPerform<SendMessageResult>('messages.send', params);

    return this.parseResponse(result);
  }

  private parseResponse(response: any): SendMessageResult {
    if ('error' in response) {
      const { error_code, error_msg } = response.error;
      throw new VkErrors(error_code, error_msg);
    }

    return response;
  }
}

export default VkClient;
