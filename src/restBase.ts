import { HttpClient } from '@angular/common/http';
import { RestRoute } from './restRoute';

export class RestBase {
  constructor (protected http: HttpClient) {
  }

  protected requestInterceptor(req: Request) {
  }

  protected mapModel(path: string, data: any) {
    return data;
  }

  getBaseUrl() {
    return '';
  }

  getDefaultHeaders(): { [header: string]: string | string[]; } {
    return {};
  }

  route(path: string) {
    return new RestRoute(this as any, path);
  }
}
