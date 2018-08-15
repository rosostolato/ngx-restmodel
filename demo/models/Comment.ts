import { IComment } from './interfaces';

export class Comment implements IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor (obj?: IComment) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
