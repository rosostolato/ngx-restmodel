import { HttpClient } from '@angular/common/http';
import { RestRoute } from '../index';
import { Base } from '../base';

export class RestBase extends Base {
  constructor (http: HttpClient) {
    super(http);
  }

  route(path: string) {
    return new RestRoute(this, path);
  }
}
