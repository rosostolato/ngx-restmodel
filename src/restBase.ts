import { HttpClient } from '@angular/common/http';
import { Base } from './base';
import { RestRoute } from './restRoute';

export class RestBase extends Base {
  constructor (http: HttpClient) {
    super(http);
  }

  route(path: string) {
    return new RestRoute(this, path);
  }
}
