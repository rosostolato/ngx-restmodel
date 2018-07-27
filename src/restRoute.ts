import { map } from 'rxjs/operators';
import { Base } from './base';
import { RestModel } from './restModel';

export class RestRoute extends Base {
  constructor(private base: any, private route: string) {
    super(base.http);

    this.mapModel = base.mapModel;
  }

  private makeRest<T>(route: string, data: any) {
    const model = this.mapModel(route, data);
    return new RestModel<T>(this.base, model);
  }

  private getFullPath() {
    return `${this.base.getBaseUrl()}/${this.route}`;
  }

  public get<T>() {
    return this.http.get(this.getFullPath()).pipe<T>(
      map(response => response)
    );
  }

  public post<T>(data: any) {
    return this.http.post(this.getFullPath(), data).pipe<RestModel<T>>(
      map(response => this.makeRest<T>(this.route, response))
    );
  }
}
