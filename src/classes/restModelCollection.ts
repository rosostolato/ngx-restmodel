import { RestBase } from './restBase';
import { RestRoute } from './restRoute';
import { RestModel } from './restModel';

interface Route {
  path: string,
  id?: number,
  parent?: Route
}

// @ts-ignore
export class RestModelCollection<T> extends Array<RestModel<T> & T> implements RestBase {
  private _route: Route;
  private _base: any;

  constructor (base: any, _route: Route, items: any[]) {
    super(base._http);

    const proto = Object.getPrototypeOf(base);
    Object.setPrototypeOf(proto, Array.prototype);
    Object.setPrototypeOf(this, proto);
    Object.assign(this, { ...items });

    this._route = { ..._route };
    this._base = base;
  }

  route(path: string) {
    return new RestRoute(this._base, this._route, path);
  }
}
