import { HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IAbstractBase, HttpMethod } from './types';
import { RestRoute } from './index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class RestModelBase<T> extends RestRoute {
  id: number;

  constructor (_base: IAbstractBase, data: T) {
    super(_base);

    const thisProto = Object.getPrototypeOf(this);
    let dataProto = Object.getPrototypeOf(data);
    dataProto = this._unifyPrototype(dataProto);

    if (dataProto.isPrototypeOf) {
      dataProto = thisProto;
    } else {
      Object.setPrototypeOf(dataProto, thisProto);
    }

    Object.setPrototypeOf(this, dataProto);
    Object.assign(this, data);
  }

  private _unifyPrototype(proto: any) {
    if (isObject(proto)) {
      return proto;
    }

    let out = {...proto}
    recursive(Object.getPrototypeOf(proto));
    return out;

    function recursive(p: any) {
      if (!isObject(p)) {
        out = {...p, ...out}; // out is prefered
        recursive(Object.getPrototypeOf(p))
      }
    }

    function isObject(p: any) {
      const names = Object.getOwnPropertyNames(p);
      return names.some(v => v === 'isPrototypeOf');
    }
  }

  private _createModelHttpRequest(method: 'PUT'|'DELETE', params?: HttpParams, data?: any) {
    const headers = new HttpHeaders(this._getDefaultHeaders());
    const url = this._getFullPath();

    const req = new HttpRequest(
      method, url, method === 'PUT' ? data : null,
      { headers, params }
    );

    return this._createHttpRequest(req);
  }

  put(params?: HttpParams): Observable<T> {
    return this._createModelHttpRequest('PUT', params, this.getPlain())
      .pipe(map(response => this._makeRest<T>(HttpMethod.PUT, response)));
  }

  delete(params?: HttpParams): Observable<any> {
    return this._createModelHttpRequest('DELETE', params)
      .pipe(map(response => this._makeRest<T>(HttpMethod.PUT, response)));
  }

  getPlain(): T {
    const plain: any = {};
    Object.assign(plain, this);
    delete plain._base;

    const proto = { ...Object.getPrototypeOf(this) };
    const methods = [
      'delete',
      'getBaseUrl',
      'createModelHttpRequest',
      'getDefaultHeaders',
      'getFullPath',
      'getPlain',
      'put',
      'route'
    ];

    for (const key of methods) {
      delete proto[key];
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
