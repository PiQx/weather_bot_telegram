import VkClient from './vk-client/vk-client';
import config from './config';

const vkClient = new VkClient({ accessToken: config.vkApiKey });

export default vkClient;
