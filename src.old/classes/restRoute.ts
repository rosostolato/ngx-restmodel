import { RestModel, RestModelCollection } from '../index';
import { applyMixin } from '../utils';
import { Base, Route } from '../base';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class RestRoute extends Base {
  constructor (private base: any, parentRoute: Route, private path: string) {
    super(base._http);

    applyMixin(this, [base]);
    const proto = Object.getPrototypeOf(this);
    delete proto.route; // remove route
    Object.setPrototypeOf(this, proto);

    const parent = parentRoute;
    this._route = { path, parent };
  }

  getList<T>(): Observable<RestModelCollection<T>> {
    const headers = this.getDefaultHeaders();
    return this._http.get(this.getFullPath(), { headers }).pipe<RestModelCollection<T>>(
      map((response: any[]) => this.makeRestCollection<T>(response))
    );
  }

  getOne<T>(id: number): Observable<RestModel<T> & T> {
    const headers = this.getDefaultHeaders();
    return this._http.get(this.getFullPath(id), { headers }).pipe<RestModel<T> & T>(
      map(response => this.makeRest<T>(response))
    );
  }

  post<T>(data: any): Observable<RestModel<T> & T> {
    const headers = this.getDefaultHeaders();
    return this._http.post(this.getFullPath(), { headers }, data).pipe<RestModel<T> & T>(
      map(response => this.makeRest<T>(response))
    );
  }

  private makeRest<T>(data: any) {
    const model = this.mapModel(this.path, data);
    const route = { ...this._route };
    route.id = model.id;
    return new RestModel<T>(this.base, route, model);
  }

  private makeRestCollection<T>(data: any[]) {
    const models = data.map(d => this.makeRest<T>(d));
    const route = { ...this._route };
    return new RestModelCollection<T>(this.base, route, models);
  }

  private getFullPath(id?: number) {
    let parentUrl = '/';
    let currentRoute = this._route;

    while(currentRoute.parent) {
      addParent(currentRoute.parent);
      currentRoute = currentRoute.parent;
    }

    function addParent(parent: Route) {
      if (parent.path !== '') {
        if (parent.id) {
          parentUrl = '/' + parent.id + parentUrl;
        }
        parentUrl = '/' + parent.path + parentUrl;
      }
    }

    // fix baseurl
    let baseurl = this.getBaseUrl();
    if (baseurl.charAt(baseurl.length - 1) === '/') {
      baseurl = baseurl.slice(0, -1);
    }

    return baseurl + parentUrl +  this._route.path + (id ?  '/' + id : '');
  }
}