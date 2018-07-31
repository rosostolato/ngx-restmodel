import { Observable } from 'rxjs';
import { applyMixin } from '../utils';
import { RestBase } from '../index';
import { Route } from '../base';

export class RestModel<T> extends RestBase {
  id?: number;

  constructor (base: any, _route: Route, model: T) {
    super(base._http);

    applyMixin(this, [base, model]);
    Object.assign(this, base, model);

    this._route = { ..._route };
    this._base = base;
  }

  put(): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this._http.put(this.getFullPath(), { headers }, this.getPlain());
  }

  delete(): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this._http.put(this.getFullPath(), { headers }, this.getPlain());
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
    let parentUrl = '';
    let currentRoute = this._route;

    while(currentRoute.parent) {
      addParent(currentRoute.parent);
      currentRoute = currentRoute.parent;
    }

    function addParent(parent: Route) {
      if (parent.path !== '') {
        if (parent.id) {
          parentUrl = '/' + parent.id + parentUrl;
        }
        parentUrl = '/' + parent.path + parentUrl;
      }
    }

    return this.getBaseUrl() + '/'
      + (parentUrl !== '' ? parentUrl + '/': '')
      + this._route.path + '/'
      + this.id;
  }
}
