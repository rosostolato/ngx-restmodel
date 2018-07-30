import { Base } from '../base';

export class RestModelCollection<T> extends Array<T> {
  constructor (base: any, models: any[]) {
    super(...models);

    const proto = Object.getPrototypeOf(base);
    Object.assign(proto, Object.getPrototypeOf(proto));
    Object.setPrototypeOf(proto, Array.prototype);
    Object.setPrototypeOf(this, proto);
  }
}
