import { Choice } from './choice';
import { User } from './user';
import { Vote } from './vote';

export class Comparison {
  id: string;
  unixTimeStamp: string;
  user: User;
  choices: Choice[];
  votes: Vote[];

  constructor(id: string) {
    this.id = id;
  }
}
