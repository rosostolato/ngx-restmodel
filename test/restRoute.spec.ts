import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { expect } from 'chai';
import { RestRoute } from '../src';
import { Post } from '../demo/models/Post';

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
      userId: 1,
      body: "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto",
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    };

    route.post<Post>(toPost)
      .subscribe(data => {
        expect(data).not.to.be.equal(null);
        expect(data.id).not.to.be.equal(null);
      });
  }));
});
