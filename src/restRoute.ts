import { HttpRequest, HttpParams, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Resource, IAbstractBase, HttpMethod } from './types';
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

  protected _createHttpRequest(req: HttpRequest<any>) {
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

  private _createRouteHttpRequest(method: 'GET'|'POST', params?: HttpParams, id_data?: any) {
    const url = this._getFullPath(method === 'GET' ? id_data : null);
    const headers = new HttpHeaders(this._getDefaultHeaders());

    const req = new HttpRequest(method, url,
      method === 'POST' ? id_data : null,
      { headers, params }
    );

    return this._createHttpRequest(req);
  }

  protected _makeRest<T>(method: HttpMethod, data: any): RestModel<T> {
    const model = this._mapModel(method, this._path || this._base.resource.path, data);

    // create a copy of base class
    const baseCopy = { ...this._base };
    const baseProto = Object.getPrototypeOf(this._base);
    Object.setPrototypeOf(baseCopy, baseProto);

    if (this._path) {
      const resource: Resource = {
        id: data.id,
        path: this._path,
        parent: this._base.resource
      };

      baseCopy.resource = resource;
    }

    return new RestModelBase<T>(baseCopy as any, model) as any;
  }

  getList<T>(params?: HttpParams): Observable<Array<RestModel<T>>> {
    return this._createRouteHttpRequest('GET', params)
      .pipe(map((response: any[]) => response.map(r => this._makeRest<T>(HttpMethod.GET, r))));
  }

  getOne<T>(id: number, params?: HttpParams): Observable<RestModel<T>> {
    return this._createRouteHttpRequest('GET', params, id)
      .pipe(map(response => this._makeRest<T>(HttpMethod.GET, response)));
  }

  post<T>(data: any, params?: HttpParams): Observable<RestModel<T>> {
    return this._createRouteHttpRequest('POST', params, data)
      .pipe(map(response => this._makeRest<T>(HttpMethod.POST, response)));
  }

  protected _getFullPath(id?: number) {
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

    let baseurl = this._getBaseUrl();
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

  protected _getBaseUrl(): string {
    return this._base.getBaseUrl();
  }

  protected _getDefaultHeaders(): { [header: string]: string | string[]; } {
    return this._base.getDefaultHeaders();
  }

  protected _mapModel(method: HttpMethod, path: string, data: any): any {
    return this._base.mapModel(method, path, data);
  }
}
