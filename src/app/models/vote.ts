import { Choice } from './choice';
import { User } from './user';

export class Vote {
  id: string;
  choice: Choice;
  user: User;

  constructor(id: string, choice: Choice, user: User) {
    this.id = id;
    this.choice = choice;
    this.user = user;
  }
}
