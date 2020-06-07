import fetch from 'node-fetch';
import { stringify } from 'querystring';

interface RequestParams {
  [key: string]: string | number | string[];
}

abstract class BaseApiClient {

  protected constructor(uri: string) {
    this.baseUrl = uri;
  }

  private readonly baseUrl: string;

  protected async getPerform<Response>(method: string, requestParams: RequestParams): Promise<Response> {
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
