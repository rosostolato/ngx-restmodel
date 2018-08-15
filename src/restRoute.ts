import { HttpRequest, HttpParams, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Resource, IAbstractBase } from './types';
import { RestModel, RestModelBase } from './index';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export class RestRoute {
  private _path?: string;

  constructor (protected _base: IAbstractBase, _path?: string) {
    if (_path) {
      this._path = _path;
    }
  }

  protected createHttpRequest(req: HttpRequest<any>) {
    // pass through request interceptor
    req = this._base.requestInterceptor(req);

    // the observable to return
    let observable = this._base.http.request<any>(req);

    // pass through response interceptor
    observable = this._base.responseInterceptor(observable);

    return observable.pipe(
      filter(response => response.type === HttpEventType.Response),
      map((response: HttpResponse<any>) => response.body)
    );
  }

  private createRouteHttpRequest(method: 'GET'|'POST', params?: HttpParams, id_data?: any) {
    const url = this.getFullPath(method === 'GET' ? id_data : null);
    const headers = new HttpHeaders(this.getDefaultHeaders());

    const req = new HttpRequest(method, url,
      method === 'POST' ? id_data : null,
      { headers, params }
    );

    return this.createHttpRequest(req);
  }

  protected makeRest<T>(data: any): RestModel<T> {
    const model = this.mapModel(this._path || this._base.resource.path, data);

    const base = { ...this._base };
    const proto = Object.getPrototypeOf(this._base);
    Object.setPrototypeOf(base, proto);

    if (this._path) {
      const resource: Resource = {
        id: data.id,
        path: this._path,
        parent: base.resource
      };

      base.resource = resource;
    }

    return new RestModelBase<T>(base as any, model) as any;
  }

  getList<T>(params?: HttpParams | undefined): Observable<Array<RestModel<T>>> {
    return this.createRouteHttpRequest('GET', params)
      .pipe(map((response: any[]) => response.map(r => this.makeRest<T>(r))));
  }

  getOne<T>(id: number, params?: HttpParams | undefined): Observable<RestModel<T>> {
    return this.createRouteHttpRequest('GET', params, id)
      .pipe(map(response => this.makeRest<T>(response)));
  }

  post<T>(data: any, params?: HttpParams | undefined): Observable<RestModel<T>> {
    return this.createRouteHttpRequest('POST', params, data)
      .pipe(map(response => this.makeRest<T>(response)));
  }

  protected getFullPath(id?: number) {
    let parentUrl = '/';
    addRoute(this._base.resource);

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

    if (!this._path) {
      parentUrl = parentUrl.slice(0, parentUrl.length-1);
    }

    const url = baseurl + parentUrl + (this._path || '') + (id ?  '/' + id : '');
    return url;
  }

  // Base

  protected getBaseUrl(): string {
    return this._base.getBaseUrl();
  }

  protected getDefaultHeaders(): { [header: string]: string | string[]; } {
    return this._base.getDefaultHeaders();
  }

  protected mapModel(path: string, data: any): any {
    return this._base.mapModel(path, data);
  }
}
