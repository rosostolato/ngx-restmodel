import { applyMixin } from '../utils';
import { RestBase } from '../index';

interface Route {
  path: string,
  id?: number,
  parent?: Route
}

export class RestModel<T> extends RestBase {
  id?: number;

  constructor (base: any, _route: Route, model: T) {
    super(base._http);

    applyMixin(this, [base, model]);
    Object.assign(this, base, model);

    this._route = { ..._route };
    this._base = base;
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
}
