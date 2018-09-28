import { HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IAbstractBase, HttpMethod } from './types';
import { RestRoute } from './index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IRestModel<T> {
  put(params?: HttpParams): Observable<T>;
  delete(params?: HttpParams): Observable<any>;

  getPlain(): T;

  route(path: string): RestRoute;
}

export class RestModelBase<T> extends RestRoute implements IRestModel<T> {
  id: number;

  private _jsonIgnore?: string[];

  constructor (_base: IAbstractBase, data: T) {
    super(_base);

    const thisProto = Object.getPrototypeOf(this);
    let dataProto = Object.getPrototypeOf(data);
    dataProto = this._unifyPrototype(dataProto);

    if (isObject(dataProto)) {
      dataProto = thisProto;
    } else {
      Object.setPrototypeOf(dataProto, thisProto);
    }

    Object.setPrototypeOf(this, dataProto);
    Object.assign(this, data);

    function isObject(p: any) {
      const names = Object.getOwnPropertyNames(p);
      return names.some(v => v === 'isPrototypeOf');
    }
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

  private _createModelHttpRequest(method: HttpMethod.PUT|HttpMethod.DELETE, params?: HttpParams) {
    const headers = new HttpHeaders(this._getDefaultHeaders());
    const url = this._getFullPath();

    const req = new HttpRequest(
      method, url, method === HttpMethod.PUT ? this.getPlain(true) : null,
      { headers, params }
    );

    return this._createHttpRequest(req);
  }

  put(params?: HttpParams): Observable<T> {
    return this._createModelHttpRequest(HttpMethod.PUT, params)
      .pipe(map(response => this._makeRest<T>(HttpMethod.PUT, response)));
  }

  delete(params?: HttpParams): Observable<any> {
    return this._createModelHttpRequest(HttpMethod.DELETE, params)
      .pipe(map(response => this._makeRest<T>(HttpMethod.DELETE, response)));
  }

  getPlain(removeIngoredFields = false): T {
    const plain: any = {};
    Object.assign(plain, this);
    delete plain._base;

    if (removeIngoredFields) {
      // JsonIgnore
      if (this._jsonIgnore) {
        for (const key of this._jsonIgnore) {
          delete plain[key];
        }
      }

      delete plain._jsonIgnore;
    }

    const proto = { ...Object.getPrototypeOf(this) };
    const methods = [
      'route',
      'put',
      'delete',
      'getPlain',
      'getBaseUrl',
      'getFullPath',
      'getDefaultHeaders',
      '_createModelHttpRequest',
      '_unifyPrototype'
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

export type RestModel<T> = IRestModel<T> & T;
