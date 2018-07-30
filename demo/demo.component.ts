import { Component } from '@angular/core';
import { RestApi } from './restApi.service';
import { UserLogin } from './models/UserLogin';
import { Vessel } from './models/Vessel';

@Component({
  selector: 'rest-demo-app',
  template: ''
})
export class DemoComponent {
  constructor (private restApi: RestApi) {
    this.getVessels();
  }

  private login() {
    const userData = {
      username: 'admin',
      password: '$admin',
      grant_type: 'password'
    };

    this.restApi.route('users/login')
      .post<UserLogin>(userData)
      .subscribe(obs => {
      });
  }

  private getVessels() {
    this.restApi.route('vessels')
      .getList<Vessel>()
      .subscribe(vessels => {
        const v = vessels[0];

        vessels[0].route('assets')
          .getList()
          .subscribe(assets => {
          });
      });
  }

  private getVessel() {
    this.restApi
      .route('vessels')
      .getOne<Vessel>(1)
      .subscribe(vessel => {
        vessel.route('assets')
          .getList()
          .subscribe(assets => {
          });
      });
  }
}
