import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestModel } from './restModel';
import { Resource } from './types';

interface AbstractBase {
  http: HttpClient;
  resource: Resource;

  getBaseUrl(): string;
  getDefaultHeaders(): any;
  mapModel(path: string, data: any): any;
}

export class RestRoute {
  private http: HttpClient

  constructor (private base: AbstractBase, private path: string) {
    this.http = base.http;
  }

  private makeRest<T>(data: any) {
    const model = this.mapModel(this.path, data);
    const baseClone = cloneDeep(this.base);

    baseClone.http = this.http;

    const resource: Resource = {
      id: data.id,
      path: this.path,
      parent: baseClone.resource
    };

    baseClone.resource = resource;
    return new RestModel<T>(baseClone as any, model);
  }

  getList<T>(): Observable<Array<RestModel<T>>> {
    const headers = this.getDefaultHeaders();
    const url = this.getFullPath();

    return this.http.get(url, {headers}).pipe(
      map((response: any[]) => response.map(r => this.makeRest<T>(r)))
    );
  }

  getOne<T>(id: number): Observable<RestModel<T>> {
    const headers = this.getDefaultHeaders();
    const url = this.getFullPath(id);

    return this.http.get(url, {headers}).pipe(
      map(response => this.makeRest<T>(response))
    );
  }

  post<T>(data: any): Observable<RestModel<T>> {
    const headers = this.getDefaultHeaders();
    const url = this.getFullPath();

    return this.http.post(url, {headers}, data).pipe(
      map(response => this.makeRest<T>(response))
    );
  }

  // private makeRestCollection<T>(data: any[]) {
  //   const models = data.map(d => this.makeRest<T>(d));
  //   const route = { ...this._route };
  //   return new RestModelCollection<T>(this.base, route, models);
  // }

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

    // fix baseurl
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

  private getDefaultHeaders(): any {
    return this.base.getDefaultHeaders();
  }

  private mapModel(path: string, data: any): any {
    return this.base.mapModel(path, data);
  }
}
