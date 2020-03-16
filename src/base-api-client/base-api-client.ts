import fetch from 'node-fetch';
import { stringify } from 'querystring';

interface RequestParams {
  [key: string]: string | number | string[];
}

class BaseApiClient {

  constructor(uri: string) {
    this.baseUrl = uri;
  }

  private readonly baseUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async getPerform(method: string, requestParams: RequestParams): Promise<any> {
    const uri = this.buildUri(requestParams);
    const url = `${this.baseUrl}/${method}?${uri}`;
    const result = await fetch(url);

    return result.json();
  }

  private buildUri(params: RequestParams): string {
    return stringify(params);
  }
}

export default BaseApiClient;
