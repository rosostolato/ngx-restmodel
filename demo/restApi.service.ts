import { RestBase, Restful, HttpMethod } from '../src/index';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
@Restful({
  baseUrl: 'https://jsonplaceholder.typicode.com'
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  protected responseInterceptor(res: Observable<HttpEvent<any>>) {
    return res;
  }

  protected mapModel(method: HttpMethod, route: string, data: any) {
    if (method !== HttpMethod.DELETE && route === 'posts') {
      return new Post(data);
    }

    return data;
  }
}
