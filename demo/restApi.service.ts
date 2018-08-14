import { RestBase, Restful } from '../src/index';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';
import { Observable } from 'rxjs';

@Injectable()
@Restful({
  baseUrl: 'https://jsonplaceholder.typicode.com'
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  protected responseInterceptor(res: Observable<HttpEvent<any>>) {
    res.subscribe(response => {
      debugger;
    }, err => {
      debugger;
    });

    return res;
  }

  protected mapModel(route: string, data: any) {
    if (route === 'posts') {
      return new Post(data);
    }

    return data;
  }
}
