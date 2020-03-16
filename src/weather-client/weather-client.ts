import { City } from '../constants';
import { stringify } from 'querystring';
import { GetWeatherResult } from './get-weather-result';
import fetch from 'node-fetch';

const API_URL = 'http://api.weatherstack.com/current';

interface WeatherClientOptions {
  apiKey: string;
}

interface WeatherClientMethods {
  getInfoCity(nameCity: City): Promise<GetWeatherResult>;
}

interface GetInfoParams {
  city: City;
  language?: string;
}

class WeatherClient implements WeatherClientMethods {
  constructor(options: WeatherClientOptions) {
    this.apiKey = options.apiKey;
  }

  private readonly apiKey: string;

  public async getInfoCity(nameCity: City): Promise<GetWeatherResult> {
    return this.perform({ city: nameCity });
  }

  private async perform(params: GetInfoParams = { city: City.moscow, language: 'ru' }): Promise<GetWeatherResult> {
    const { city, language } = params;
    const param = { query: city, language, access_key: this.apiKey };
    const url = `${API_URL}?${stringify(param)}`;

    const result = await fetch(url);

    return result.json();
  }
}

export default WeatherClient;
