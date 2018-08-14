import { RestBase, Restful } from '../src/index';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';

@Injectable()
@Restful({
  baseUrl: 'https://jsonplaceholder.typicode.com'
})
export class RestApi extends RestBase {
  constructor (http: HttpClient) {
    super(http);
  }

  protected mapModel(route: string, data: any) {
    if (route === 'posts') {
      return new Post(data);
    }

    return data;
  }
}
