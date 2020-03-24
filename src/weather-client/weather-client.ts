import { City } from '../constants';
import { GetWeatherResult } from './get-weather-result';
import BaseApiClient from '../base-api-client/base-api-client';

const API_URL = 'http://api.weatherstack.com';

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

class WeatherClient extends BaseApiClient implements WeatherClientMethods {
  constructor(options: WeatherClientOptions) {
    super(API_URL);
    this.apiKey = options.apiKey;
  }

  private readonly apiKey: string;

  public async getInfoCity(nameCity: City): Promise<GetWeatherResult> {
    return this.perform({ city: nameCity });
  }

  private async perform(params: GetInfoParams = { city: City.moscow, language: 'ru' }): Promise<GetWeatherResult> {
    const { city } = params;
    const param = { query: city, access_key: this.apiKey };

    return this.getPerform('current', param);
  }
}

export default WeatherClient;
