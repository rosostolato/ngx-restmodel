import { Component } from '@angular/core';
import { RestApi } from './restApi.service';
import { UserLogin, IUserLogin } from './models/UserLogin';

@Component({
  selector: 'rest-demo-app',
  template: ''
})
export class DemoComponent {
  constructor (private restApi: RestApi) {
    const userData = {
      username: 'admin',
      password: '$admin',
      grant_type: 'password'
    };

    restApi.route('users/login')
      .post<UserLogin>(userData)
      .subscribe(obs => {
        debugger;
      });
  }
}
