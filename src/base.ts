import { HttpClient } from '@angular/common/http';

export class Base {
  protected _route: {
    path: string,
    parent: string[],
  }

  constructor (protected http: HttpClient) {
    this._route = {
      path: '',
      parent: []
    };
  }

  protected getBaseUrl(): string {
    return '';
  }

  protected getDefaultHeaders() {
    return {};
  }

  protected requestInterceptor(req: Request) {
  }

  protected mapModel(route: string, data: any) {
    return data;
  }
}
