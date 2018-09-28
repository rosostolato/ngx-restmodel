export class FromJson<T> {
  constructor (obj?: T) {
    if (obj) {
      this.setValues(obj);
    }
  }

  setValues(obj: T) {
    Object.assign(this, obj);
  }
}
