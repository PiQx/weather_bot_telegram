import BaseApiClient from '../base-api-client/base-api-client';
import { SendMessageResult } from './send-message-result';
import faker from 'faker';
import VkErrors from './errors';

interface VkClientMethods {
    sendMessage(message: string, userIds: string[]): Promise<SendMessageResult>;
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
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.apiKey,
            // eslint-disable-next-line @typescript-eslint/camelcase
            random_id: faker.random.number(),
            // eslint-disable-next-line @typescript-eslint/camelcase
            user_ids: userIds,
            v: VERSION_API,
            // eslint-disable-next-line @typescript-eslint/camelcase
        };
        const result = await this.getPerform('messages.send', params);

        return this.parseResponse(result);
    }

    public async sendSticker(stickerId: number, userIds: string[]): Promise<SendMessageResult> {
        const params = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.apiKey,
            // eslint-disable-next-line @typescript-eslint/camelcase
            random_id: faker.random.number(),
            // eslint-disable-next-line @typescript-eslint/camelcase
            user_ids: userIds,
            v: VERSION_API,
          // eslint-disable-next-line @typescript-eslint/camelcase
            sticker_id: stickerId,
        };
        const result = await this.getPerform('messages.send', params);

        return this.parseResponse(result);
    }

    private parseResponse(response: any): SendMessageResult {
        if ('error' in response) {
            // eslint-disable-next-line @typescript-eslint/camelcase
            const { error_code, error_msg } = response.error;
            throw new VkErrors(error_code, error_msg);
        }

        return response;
    }
}

export default VkClient;
