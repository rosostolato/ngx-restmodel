import { IPost } from './interfaces';

export class Post implements IPost {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor (obj?: IPost) {
    if (obj) {
      Object.assign(this, obj);
    }
  }

  getTitle() {
    return this.title;
  }
}
