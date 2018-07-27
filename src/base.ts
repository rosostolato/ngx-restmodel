import { HttpClient } from '@angular/common/http';

export class Base {
  constructor (protected http: HttpClient) { }

  public getBaseUrl(): string {
    return '';
  };

  public getDefaultHeaders() {
    return {};
  };

  protected requestInterceptor(req: Request) {
  }

  protected mapModel(route: string, data: any) {
    return data;
  }
}
