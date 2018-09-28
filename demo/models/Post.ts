import { IPost } from './interfaces';
import { FromJson } from './fromJson';
import { JsonIgnore } from '../../src';

export class Post extends FromJson<IPost> implements IPost {
  id: number;
  userId: number;
  title: string;

  @JsonIgnore
  body: string;

  getTitle() {
    return this.title;
  }
}
