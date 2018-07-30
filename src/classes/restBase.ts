import { HttpClient } from '@angular/common/http';
import { uniquePrototype } from '../utils';
import { RestRoute } from '../index';
import { Base } from '../base';

export class RestBase extends Base {
  protected _base: RestBase;

  constructor (http: HttpClient) {
    super(http);
    this._base = this;
    uniquePrototype(this);
  }

  route(path: string) {
    return new RestRoute(this._base, this._route, path);
  }
}
