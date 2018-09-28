import { Component } from '@angular/core';
import { RestApi } from './restApi.service';
import { Post } from './models/Post';
import { Comment } from './models/Comment';
import { RestModel } from '../src';

@Component({
  selector: 'rest-demo-app',
  template: /* html */`
  <div class="container" style="margin-bottom: 50px">
  <div style="display: flex; justify-content: space-between">
    <h2>Posts</h2>
    <input type="button" value="Get Posts" (click)="GetPosts()" class="btn btn-primary" />
  </div>
  <br />
  <div style="width: 100%; height: 500px; border: 1px solid gray; overflow: auto">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
          <th>body</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let post of posts">
          <td>{{post.id}}</td>
          <td>{{post.userId}}</td>
          <td>{{post.title}}</td>
          <td>{{post.body}}</td>
          <td><input class="btn btn-default" type="button" value="Get Comments" (click)="GetComments(post)" /></td>
        </tr>
        <tr *ngIf="!posts.length">
          <td><i>Click on 'Get Posts'</i></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Comments</h2>

  <div style="width: 100%; height: 250px; border: 1px solid gray; overflow: auto">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>postId</th>
          <th>name</th>
          <th>email</th>
          <th>body</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let comment of comments">
          <td>{{comment.id}}</td>
          <td>{{comment.postId}}</td>
          <td>{{comment.name}}</td>
          <td>{{comment.email}}</td>
          <td>{{comment.body}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  `
})
export class DemoComponent {
  posts: Array<RestModel<Post>> = [];
  comments: Array<RestModel<Comment>> = [];

  constructor (private restApi: RestApi) {
  }

  GetPosts() {
    this.restApi
      .route('posts')
      .getList<Post>()
      .subscribe(posts => {
        this.posts = posts;

        posts[0].put().subscribe(post => {
          // there is no 'body' because of @jsonIgnore decorator
          debugger;
        });
      });
  }

  GetComments(post: RestModel<Post>) {
    post.route('comments')
      .getList<Comment>()
      .subscribe(comments => {
        this.comments = comments;
      });
  }
}
