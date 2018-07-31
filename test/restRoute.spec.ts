import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { expect } from 'chai';
import { RestRoute } from '../src';
import { Post } from '../demo/models/Post';
import { Route } from '../src/base';

describe('RestRoute', () => {
  let route: RestRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RestApi]
    });

    const restApi: RestApi = TestBed.get(RestApi);
    route = restApi.route('posts');
  });

  // it('should have prototypes', () => {
  //   const proto = Object.getPrototypeOf(route);
  //   const protoKeys = Object.getOwnPropertyNames(proto);
  //   const expected = [
  //     'constructor',
  //     'getList',
  //     'getOne',
  //     'post',
  //     'makeRest',
  //     'makeRestCollection',
  //     'getFullPath',
  //     'getBaseUrl',
  //     'getDefaultHeaders',
  //     'requestInterceptor',
  //     'mapModel'
  //   ];

  //   const notExpected = [
  //     'route'
  //   ];

  //   expect(protoKeys).to.include.members(expected);
  //   expect(protoKeys).not.to.include.members(notExpected);
  // });

  it('should get list', async(() => {
    route.getList<Post>()
      .subscribe(data => {
        expect(data).to.be.an.instanceof(Array);
        expect(data.length).to.be.greaterThan(0);
      });
  }));

  it('should get one', async(() => {
    route.getOne<Post>(1)
      .subscribe(data => {
        expect(data).not.to.be.equal(null);
        expect(data.id).not.to.be.equal(null);
      });
  }));

  it('should post', async(() => {
    const toPost = {
      body: "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto",
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      userId: 1
    };

    route.post<Post>(toPost)
      .subscribe(data => {
        expect(data).not.to.be.equal(null);
        expect(data.id).not.to.be.equal(null);
      });
  }));

  // it('should have route props', async(() => {
  //   expect(route).to.haveOwnProperty('_route');

  //   let mock: Route = {
  //     path: 'posts',
  //     parent: { path: '' }
  //   };
  //   expect((route as any)._route).to.be.eql(mock);

  //   // mock again
  //   mock.id = 1;
  //   mock = {
  //     path: 'comments',
  //     parent: mock
  //   };

  //   route.getOne(1).subscribe(post =>
  //     post.route('comments').getList().subscribe(data => {
  //       expect(data).to.haveOwnProperty('_route');
  //       expect((data as any)._route).to.be.eql(mock);
  //     }));
  // }));
});
