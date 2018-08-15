import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { expect } from 'chai';
import { RestModel, RestRoute } from '../src';
import { Post } from '../demo/models/Post';

describe('RestModel', () => {
  let post: RestModel<Post>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RestApi]
    });

    const restApi: RestApi = TestBed.get(RestApi);
    restApi.route('posts').getOne<Post>(1).subscribe(postRes => { post = postRes });
  }));

  it('should put', async(() => {
    const test = 'testing';
    post.body = test;

    post.put().subscribe(res => {
      expect(res).not.to.be.equal(null);
      expect(res.body).to.be.equal(test);
    });
  }));

  it('should delete', async(() => {
    post.delete().subscribe(res => {
      expect(res).to.be.eql({});
    });
  }));

  it('should route', async(() => {
    const route = post.route('comments');

    expect(route).to.be.an.instanceof(RestRoute);
    expect(route['_path']).to.be.equal('comments');

    route.getList().subscribe(data => {
      expect(data).to.be.an.instanceof(Array);
      expect(data.length).to.be.greaterThan(0);
    });
  }));

  // There is no a third level on this test web api
  //
  // it('should route twice', async(() => {
  //   const route = post.route('comments');

  //   expect(route).to.be.an.instanceof(RestRoute);
  //   expect(route['_path']).to.be.equal('comments');

  //   route.getList().subscribe(data => {
  //     expect(data).to.be.an.instanceof(Array);
  //     expect(data.length).to.be.greaterThan(0);
  //   });
  // }));

  it('should get plain', () => {
    const plain = post.getPlain();
    const proto = Object.getPrototypeOf(plain);

    const methods = [
      'delete',
      'getBaseUrl',
      'createModelHttpRequest',
      'getDefaultHeaders',
      'getFullPath',
      'getPlain',
      'put',
      'route'
    ];

    for (const pk of proto) {
      for (const mk of methods) {
        expect(pk).not.to.be.equal(mk);
      }
    }
  });
});
