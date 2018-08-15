import { HttpParams, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { IAbstractBase } from './types';
import { RestRoute } from './index';
import { Observable } from 'rxjs';

export class RestModelBase<T> extends RestRoute {
  id: number;

  constructor (_base: IAbstractBase, data: T) {
    super(_base);

    const thisProto = Object.getPrototypeOf(this);
    const dataProto = Object.getPrototypeOf(data);
    Object.assign(thisProto, dataProto);
    Object.setPrototypeOf(this, thisProto);
    Object.assign(this, data);
  }

  private createModelHttpRequest(method: 'PUT'|'DELETE', params?: HttpParams, data?: any) {
    const headers = new HttpHeaders(this.getDefaultHeaders());
    const url = this.getFullPath();

    const req = new HttpRequest(
      method, url, method === 'PUT' ? data : null,
      { headers, params }
    );

    return this.createHttpRequest(req);
  }

  put(params?: HttpParams | undefined): Observable<any> {
    return this.createModelHttpRequest('PUT', params, this.getPlain());
  }

  delete(params?: HttpParams | undefined): Observable<any> {
    return this.createModelHttpRequest('DELETE', params);
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

  // Base

  route(path: string): RestRoute {
    return this._base.route(path);
  }
}

export type RestModel<T> = RestModelBase<T> & T;
