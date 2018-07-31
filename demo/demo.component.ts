import { Component } from '@angular/core';
import { RestApi } from './restApi.service';
import { Post } from './models/Post';

@Component({
  selector: 'rest-demo-app',
  template: /* html */`
  <div style="width: 800px; height: 500px; border: 1px solid gray; overflow: auto">
    <input type="button" value="Get Posts" (click)="GetPosts()" />
    <br />
    <table style="width: 780px">
      <thead>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
          <th>body</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.userId}}</td>
          <td>{{post.title}}</td>
          <td>{{post.body}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class DemoComponent {
  posts: Post[]

  constructor (private restApi: RestApi) {
  }

  GetPosts() {
    this.restApi.route('posts')
      .getList<Post>()
      .subscribe(posts => {
        this.posts = posts.getPlain();

        const post = posts[0];
        this.restApi.route('posts').post(post);
      });
  }
}
