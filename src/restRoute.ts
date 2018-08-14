import { HttpRequest, HttpParams, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Resource, IAbstractBase } from './types';
import { RestModel, RestModelBase } from './restModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class RestRoute {
  constructor (private base: IAbstractBase, private path: string) {
  }

  private createHttpRequest(method: 'GET'|'POST', params?: HttpParams, id_data?: any) {
    const url = this.getFullPath(method === 'GET' ? id_data : null);
    const headers = new HttpHeaders(this.getDefaultHeaders());

    let req = new HttpRequest(method, url,
      method === 'POST' ? id_data : null,
      { headers, params }
    );

    // pass through request interceptor
    req = this.base.requestInterceptor(req);

    // the observable to return
    const requestObservable = this.base.http.request<any>(req);

    const observable = new Observable<any>(observer => {
      // pass through response interceptor
      this.base
        .FullResponseInterceptor(requestObservable)
        .subscribe(response => {
          if (response.type === HttpEventType.Response) {
            observer.next(response.body);
          }
        });
    });

    return observable;
  }

  private makeRest<T>(data: any): RestModel<T> {
    const model = this.mapModel(this.path, data);

    const base = { ...this.base };
    const proto = Object.getPrototypeOf(this.base);
    Object.setPrototypeOf(base, proto);

    const resource: Resource = {
      id: data.id,
      path: this.path,
      parent: base.resource
    };

    base.resource = resource;
    return new RestModelBase<T>(base as any, model) as any;
  }

  getList<T>(params?: HttpParams | undefined): Observable<Array<RestModel<T>>> {
    return this.createHttpRequest('GET', params)
      .pipe(map((response: any[]) => response.map(r => this.makeRest<T>(r))));
  }

  getOne<T>(id: number, params?: HttpParams | undefined): Observable<RestModel<T>> {
    return this.createHttpRequest('GET', params, id)
      .pipe(map(response => this.makeRest<T>(response)));
  }

  post<T>(data: any, params?: HttpParams | undefined): Observable<RestModel<T>> {
    return this.createHttpRequest('POST', params, data)
      .pipe(map(response => this.makeRest<T>(response)));
  }

  private getFullPath(id?: number) {
    let parentUrl = '/';
    addRoute(this.base.resource);

    function addRoute(route?: Resource) {
      if (route) {
        if (route.id) {
          parentUrl = '/' + route.id + parentUrl;
        }
        parentUrl = '/' + route.path + parentUrl;

        if (route.parent) {
          addRoute(route.parent);
        }
      }
    }

    let baseurl = this.getBaseUrl();
    if (baseurl.charAt(baseurl.length - 1) === '/') {
      baseurl = baseurl.slice(0, -1);
    }

    return baseurl + parentUrl + this.path + (id ?  '/' + id : '');
  }

  // Base

  private getBaseUrl(): string {
    return this.base.getBaseUrl();
  }

  private getDefaultHeaders(): { [header: string]: string | string[]; } {
    return this.base.getDefaultHeaders();
  }

  private mapModel(path: string, data: any): any {
    return this.base.mapModel(path, data);
  }
}
