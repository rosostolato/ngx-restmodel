import { IComment } from './interfaces';
import { FromJson } from './fromJson';

export class Comment extends FromJson<IComment> implements IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
