import { HttpParams, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { IAbstractBase } from './types';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Resource } from './types';
import { RestRoute } from './restRoute';

export type RestModel<T> = RestModelBase<T> & T;

export class RestModelBase<T> {
  id: number;

  constructor (private _base: IAbstractBase, data: T) {
    const thisProto = Object.getPrototypeOf(this);
    const dataProto = Object.getPrototypeOf(data);
    Object.assign(thisProto, dataProto);
    Object.setPrototypeOf(this, thisProto);
    Object.assign(this, data);
  }

  private createHttpRequest(method: 'PUT'|'DELETE', params?: HttpParams, data?: any) {
    const headers = new HttpHeaders(this.getDefaultHeaders());
    const url = this.getFullPath();

    let req = new HttpRequest(
      method,url, data, {
      headers, params
    });

    // pass through request interceptor
    req = this._base.requestInterceptor(req);

    // the observable to return
    let observable = this._base.http.request<any>(req);

    // pass through response interceptor
    observable = this._base.responseInterceptor(observable);

    return observable.pipe<any>(
      filter(response => response.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body)
    );
  }

  put(params?: HttpParams | undefined): Observable<any> {
    return this.createHttpRequest('PUT', params, this.getPlain());
  }

  delete(params?: HttpParams | undefined): Observable<any> {
    return this.createHttpRequest('DELETE', params);
  }

  getPlain(): T {
    const plain: any = {};
    Object.assign(plain, this);
    delete plain._base;

    const proto = { ...Object.getPrototypeOf(this) };
    const methods = [
      'delete',
      'getBaseUrl',
      'getDefaultHeaders',
      'getFullPath',
      'getPlain',
      'put',
      'route'
    ];

    for (const key of methods) {
      if (key) { delete proto[key]; }
    }

    Object.setPrototypeOf(plain, proto);
    return plain;
  }

  private getFullPath() {
    let parentUrl = '/';
    addRoute(this._base.resource);

    function addRoute(route?: Resource) {
      if (route) {
        if (route.id) {
          parentUrl = '/' + route.id + parentUrl;
        }

        parentUrl = '/' + route.path + parentUrl;

        if (route.parent) {
          addRoute(route.parent);
        }
      }
    }

    let baseurl = this.getBaseUrl();
    if (baseurl.charAt(baseurl.length - 1) === '/') {
      baseurl = baseurl.slice(0, -1);
    }

    const url = baseurl + parentUrl
    return url.slice(0, url.length-1);
  }

  // Base

  private getBaseUrl(): string {
    return this._base.getBaseUrl();
  }

  private getDefaultHeaders(): { [header: string]: string | string[]; } {
    return this._base.getDefaultHeaders();
  }

  route(path: string): RestRoute {
    return this._base.route(path);
  }
}
