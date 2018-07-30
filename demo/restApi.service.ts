import { RestBase, Restful } from '../src/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '../node_modules/@angular/core';
import { UserLogin } from './models/UserLogin';
import { Vessel } from './models/Vessel';

@Injectable()
@Restful({
  baseUrl: 'https://aoms.azurewebsites.net/api/v1',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwic2VjdXJpdHlfc3RhbXAiOiI4MGYyYWRlMi01MjQxLTQxMWYtOWJlOC00OTllMDBiMDQyODAiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1MzI3MTkxNDYsImV4cCI6MTUzMzMyMzk0NiwiaWF0IjoxNTMyNzE5MTQ2fQ.LKLgifA7wNXW-JQWQZbKPo2uXpwwCoUX-1Aiy7-oi5Y'
  }
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  protected mapModel(route: string, data: any) {
    if (route === 'users/login') {
      return new UserLogin(data);
    }

    if (route === 'vessels') {
      return new Vessel(data);
    }

    return data;
  }
}
