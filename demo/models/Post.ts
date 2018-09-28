import { IPost } from './interfaces';
import { FromJson } from './fromJson';

export class Post extends FromJson<IPost> implements IPost {
  id: number;
  userId: number;
  title: string;
  body: string;

  getTitle() {
    return this.title;
  }
}
