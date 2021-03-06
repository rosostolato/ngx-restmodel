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
  mapModel(method: HttpMethod, path: string, data: any): any;

  requestInterceptor(req: HttpRequest<any>): HttpRequest<any>;
  responseInterceptor(res: Observable<HttpEvent<any>>): Observable<HttpEvent<any>>;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
