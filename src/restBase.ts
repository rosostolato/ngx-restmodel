import { HttpClient } from '@angular/common/http';
import { RestRoute } from './restRoute';

export class RestBase {
  constructor (protected http: HttpClient) {
  }

  protected getBaseUrl() {
    return '';
  }

  protected getDefaultHeaders() {
    return {};
  }

  protected requestInterceptor(req: Request) {
  }

  protected mapModel(path: string, data: any) {
    return data;
  }

  route(path: string) {
    return new RestRoute(this as any, path);
  }
}
