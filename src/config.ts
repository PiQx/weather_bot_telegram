const vkApiKey = process.env.VK_API_KEY as string;
const weatherApiKey = process.env.WEATHER_API_KEY as string;
const file = process.env.TABLE_STATUS_FILE as string;
const botTokenTelegram = process.env.BOT_TOKEN_TELEGRAM as string;

export default {
  vkApiKey,
  weatherApiKey,
  file,
  botTokenTelegram
}
