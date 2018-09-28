import { RestBase, Restful, HttpMethod } from '../src/index';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './models/Comment';
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
    return res;
  }

  protected mapModel(method: HttpMethod, route: string, data: any) {
    if (method !== HttpMethod.DELETE && route === 'posts') {
      return new Post(data);
    }
    if (method !== HttpMethod.DELETE && route === 'comments') {
      return new Comment(data);
    }

    return data;
  }
}
