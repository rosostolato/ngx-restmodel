import { RestBase, Restful } from '../src/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '../node_modules/@angular/core';
import { UserLogin } from './models/UserLogin';

@Injectable()
@Restful({
  baseUrl: 'https://aoms.azurewebsites.net/api/v1'
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  protected mapModel(route: string, data: any) {
    if (route === 'users/login') {
      return new UserLogin(data);
    }

    return data;
  }
}
