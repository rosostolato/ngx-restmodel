import { applyMixin } from '../utils';
import { RestBase } from '../index';

export class RestModel<T> extends RestBase {
  id?: number;

  constructor (base: any, _route: Route, model: T) {
    super(base._http);

    applyMixin(this, [base, model]);
    Object.assign(this, base, model);

    this._route = { ..._route };
    this._base = base;
  }
}
