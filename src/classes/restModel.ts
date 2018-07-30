import { RestBase } from '../index';

export class RestModel<T> extends RestBase {
  id?: number;

  constructor (base: any, public model: T) {
    super(base.http);

    const proto = Object.getPrototypeOf(this);
    Object.setPrototypeOf(proto, Object.getPrototypeOf(base));
    Object.assign(this, base);

    if (this.id) {
      this._route.path += '/' + this.id;
    }
  }
}
