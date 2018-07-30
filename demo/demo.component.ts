import { Component } from '@angular/core';
import { RestApi } from './restApi.service';

@Component({
  selector: 'rest-demo-app',
  template: ''
})
export class DemoComponent {
  constructor (private restApi: RestApi) {
  }
}
