import { Current } from './current';
import { Location } from './location';
import { Request } from './request-params';

export interface GetWeatherResult {
  request: Request;
  location: Location;
  current: Current;
}
