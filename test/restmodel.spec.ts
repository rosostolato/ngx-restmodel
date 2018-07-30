import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { RestApi } from '../demo/restApi.service';
import { expect } from 'chai';

describe('restmodel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient],
      providers: [RestApi]
    });
  });

  it('should get login', () => {
    const userData = {
      username: 'admin',
      password: '$admin',
      grant_type: 'password'
    };

    expect(userData)
  });

  // it('should say hello world', () => {
  //   const fixture: ComponentFixture<HelloWorldComponent> = TestBed.createComponent(HelloWorldComponent);
  //   fixture.detectChanges();
  //   expect(fixture.nativeElement.innerHTML.trim()).to.equal(
  //     'Hello world from the Ngx Restmodel module!'
  //   );
  // });
});
