export class ChatMessage {
  message: string;
  token: string;

  constructor(message: string, token: string) {
    this.message = message;
    this.token = token;
  }
}
