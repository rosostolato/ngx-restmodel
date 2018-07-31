import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { expect } from 'chai';

describe('RestBase extend', () => {
  let restApi: RestApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RestApi]
    });

    restApi = TestBed.get(RestApi);
  });

  it('should get service', inject([RestApi], (service: RestApi) => {
    expect(restApi).to.be.equal(service);
  }));

  it('should have prototypes', () => {
    const proto = Object.getPrototypeOf(restApi);
    const protoKeys = Object.getOwnPropertyNames(proto);
    const expected = [
      'constructor',
      'getBaseUrl',
      'getDefaultHeaders',
      'requestInterceptor',
      'mapModel',
      'route'
    ];

    expect(protoKeys).to.include.members(expected);
  });

  it('should get URL base', () => {
    const url = restApi.getBaseUrl();
    expect(url).to.be.equal('https://jsonplaceholder.typicode.com');
  });

  // it('should say hello world', () => {
  //   const fixture: ComponentFixture<HelloWorldComponent> = TestBed.createComponent(HelloWorldComponent);
  //   fixture.detectChanges();
  //   expect(fixture.nativeElement.innerHTML.trim()).to.equal(
  //     'Hello world from the Ngx Restmodel module!'
  //   );
  // });
});
