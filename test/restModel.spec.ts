import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { expect } from 'chai';
import { RestModel } from '../src';
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

  // it('should delete', async(() => {
  //   route.getOne<Post>(1)
  //     .subscribe(data => {
  //       expect(data).not.to.be.equal(null);
  //       expect(data.id).not.to.be.equal(null);
  //     });
  // }));
});
