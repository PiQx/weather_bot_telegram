import WeatherClient from "./weather-client/weather-client";
import config from "./config";

const weatherClient = new WeatherClient({ apiKey: config.weatherApiKey });

export default weatherClient;
