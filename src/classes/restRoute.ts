import { RestModel, RestModelCollection } from '../index';
import { Base } from '../base';
import { map } from 'rxjs/operators';

export class RestRoute extends Base {
  constructor (private base: any, path: string) {
    super(base.http);

    Object.setPrototypeOf(this, {
      ...RestRoute.prototype,
      ...Object.getPrototypeOf(base)
    });

    this._route.parent.push(this._route.path);
    this._route.path = path;
  }

  getList<T>() {
    const headers = this.getDefaultHeaders();

    return this.http.get(this.getFullPath(), { headers }).pipe<T>(
      map((response: any[]) => this.makeRestCollection<T>(this._route.path, response))
    );
  }

  getOne<T>(id: number) {
    const headers = this.getDefaultHeaders();

    return this.http.get(this.getFullPath(), { headers }).pipe<T & RestModel<T>>(
      map(response => this.makeRest<T>(this._route.path, response))
    );
  }

  post<T>(data: any) {
    return this.http.post(this.getFullPath(), data).pipe<RestModel<T>>(
      map(response => this.makeRest<T>(this._route.path, response))
    );
  }

  private makeRest<T>(path: string, data: any) {
    const model = this.mapModel(path, data);
    return new RestModel<T>(this.base, model);
  }

  private makeRestCollection<T>(path: string, data: any[]) {
    const models = data.map(d => this.makeRest<T>(path, d)) as any[];
    const collection = new RestModelCollection<T>(this.base, models);
    return collection;
  }

  private getFullPath() {
    const parents = this._route.parent.join('/');
    const url = `${this.getBaseUrl()}/${parents}/${this._route.path}`;
    return url;
  }
}
