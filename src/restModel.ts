import { Base } from './base';
import { RestRoute } from './restRoute';

export interface IRestModel<T> {
  model: T;
  route: (path: string) => RestRoute;
}

export class RestModel<T> implements IRestModel<T> {
  constructor (base: any, public model: T) {
    Object.setPrototypeOf(this, base);
  }

  route(path: string): RestRoute {
    return new RestRoute(null, '');
  }
}
