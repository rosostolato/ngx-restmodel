import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { RestBase, Restful } from '../src';
import { expect } from 'chai';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

describe('RestBase extend', () => {
  let restApi: RestApi;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RestApi]
    });

    restApi = TestBed.get(RestApi);
    httpClient = TestBed.get(HttpClient);
  });

  it('should get service', inject([RestApi], (service: RestApi) => {
    expect(restApi).to.be.equal(service);
  }));

  it('should get URL base', () => {
    const url = restApi.getBaseUrl();
    expect(url).to.be.equal('https://jsonplaceholder.typicode.com');
  });

  it('should intercept', async(() => {
    @Restful({
      baseUrl: 'https://jsonplaceholder.typicode.com/',
      headers: { 'content-type': 'application/json' }
    })
    class MockRestApi extends RestBase {
      constructor(http: HttpClient) {
        super(http)
      }

      requestInterceptor(req: HttpRequest<any>) {
        expect(req).to.be.an.instanceof(HttpRequest);
        expect(req.url).to.be.equal('https://jsonplaceholder.typicode.com/posts');
        return req;
      }

      responseInterceptor(res: Observable<HttpEvent<any>>) {
        expect(res).to.be.an.instanceof(Observable);

        res.pipe(tap((data) => {
          if (data.type === HttpEventType.Response) {
            expect(data.body).to.be.an.instanceof(Array);
            expect(data.body.length).to.be.greaterThan(0);
          }
        }));

        return res;
      }
    }

    const mock = new MockRestApi(httpClient);
    mock.route('posts').getList().subscribe();
  }));

  it('should test restBase class', async(() => {
    const mock = new RestBase(httpClient);

    expect(mock.getBaseUrl()).to.be.equal('');

    (mock as any).getBaseUrl = () => {
      return 'https://jsonplaceholder.typicode.com';
    };

    mock.route('posts').getList().subscribe();
  }));
});
