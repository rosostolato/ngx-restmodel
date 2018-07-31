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
    return this._base.http
      .put(this.getFullPath(), { headers }, this.getPlain());
  }

  delete(): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this._base.http
      .put(this.getFullPath(), { headers }, this.getPlain());
  }

  getPlain() {
    const plain: any = {};
    const _this: any = {};
    Object.assign(_this, this);

    for (const key in _this) {
      if (key.charAt(0) !== '_') {
        plain[key] = _this[key];
      }
    }

    const proto: any = {...Object.getPrototypeOf(this)};
    for (const key in RestModel.prototype) {
      if (key) {
        delete proto[key];
      }
    }

    Object.setPrototypeOf(plain, proto);
    return plain as T;
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

    // fix baseurl
    let baseurl = this.getBaseUrl();
    if (baseurl.charAt(baseurl.length - 1) === '/') {
      baseurl = baseurl.slice(0, -1);
    }

    return baseurl + parentUrl
      + this._base.resource.path
      + (this._base.resource.id ? '/'
      + this._base.resource.id : '');
  }

  // Base

  private getBaseUrl(): string {
    return this._base.getBaseUrl();
  }

  private getDefaultHeaders(): any {
    return this._base.getDefaultHeaders();
  }

  route(path: string): RestRoute {
    debugger;
    return this._base.route(path);
  }
}
