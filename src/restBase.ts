import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestRoute } from './restRoute';

export class RestBase {
  constructor (protected http: HttpClient) {
  }

  protected requestInterceptor(req: HttpRequest<any>): HttpRequest<any> {
    return req;
  }

  protected responseInterceptor(res: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    return res;
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
