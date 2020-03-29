import { Current } from './current';
import { Location } from './location';
import { RequestParams } from './request-params';

export interface GetWeatherResult {
  request: RequestParams;
  location: Location;
  current: Current;
}
