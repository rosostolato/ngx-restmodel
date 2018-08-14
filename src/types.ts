import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { RestRoute } from './restRoute';
import { Observable } from 'rxjs';

export interface Resource {
  path: string,
  id?: number,
  parent?: Resource
}

export interface IAbstractBase {
  http: HttpClient;
  resource: Resource;

  getBaseUrl(): string;
  getDefaultHeaders(): any;

  route(path: string): RestRoute;
  mapModel(path: string, data: any): any;

  requestInterceptor(req: HttpRequest<any>): HttpRequest<any>;
  responseInterceptor(res: Observable<any>): Observable<any>;
  FullResponseInterceptor(res: Observable<HttpEvent<any>>): Observable<HttpEvent<any>>;
}
