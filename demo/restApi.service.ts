import { RestBase, Restful } from '../src/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '../node_modules/@angular/core';

@Injectable()
@Restful({
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  protected mapModel(route: string, data: any) {
    // if (route === 'users/login') {
    //   return new UserLogin(data);
    // }

    // if (route === 'vessels') {
    //   return new Vessel(data);
    // }

    return data;
  }
}
