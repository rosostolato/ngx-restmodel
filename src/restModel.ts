import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from './types';
import { RestRoute } from './restRoute';

interface AbstractBase {
  http: HttpClient;
  resource: Resource;

  getBaseUrl(): string;
  getDefaultHeaders(): any;
  route(path: string): RestRoute;
}

export class RestModel<T> {
  id?: number;

  constructor (private _base: AbstractBase, data: T) {
    const thisProto = Object.getPrototypeOf(this);
    const dataProto = Object.getPrototypeOf(data);
    Object.assign(thisProto, dataProto);
    Object.setPrototypeOf(this, thisProto);
    Object.assign(this, data);
  }

  put(): Observable<any> {
    const headers = this.getDefaultHeaders();
    const url = this.getFullPath();

    return this._base.http.put(url, {headers}, this.getPlain());
  }

  delete(): Observable<any> {
    const headers = this.getDefaultHeaders();
    const url = this.getFullPath();

    return this._base.http.put(url, {headers}, this.getPlain());
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

  private getDefaultHeaders(): any {
    return this._base.getDefaultHeaders();
  }

  route(path: string): RestRoute {
    return this._base.route(path);
  }
}
