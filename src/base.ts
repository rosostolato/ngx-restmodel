import { HttpClient } from '@angular/common/http';

interface Route {
  path: string,
  id?: number,
  parent?: Route
}

export class Base {
  protected _route: Route;

  constructor (protected _http: HttpClient) {
    this._route = {
      path: ''
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
