import {Component, OnInit} from '@angular/core';
import {ChatMessage} from '../models/chat/chatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private webSocket;
  private messageValue = '';
  private chatMessages: string[] = [];

  constructor() {
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    if (token !== null && typeof token !== 'undefined') {
      this.webSocket = new WebSocket('ws://' +  token + '@localhost:59116/ChatApp-1.0/chat');
      this.webSocket.onmessage = message => {
        const messageObject = JSON.parse(message.data);
        const date = new Date(messageObject.unixTimeStamp * 1000);
        const hours = date.getHours();
        const minutes = '0' + date.getMinutes();
        const seconds = '0' + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        this.chatMessages.push('[' + formattedTime + '] ' + messageObject.user.username + ': ' + messageObject.message);
      };
    }
  }

  ngOnInit() {
  }

  sendMessage() {
    if (this.messageValue !== '') {
      const token = JSON.parse(localStorage.getItem('currentUser')).token;
      if (token !== null && typeof token !== 'undefined') {
        const message = new ChatMessage(this.messageValue, token);
        this.webSocket.send(JSON.stringify(message));
        this.messageValue = '';
      }
    }
  }
}
