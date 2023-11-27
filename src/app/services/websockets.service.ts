import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Md5} from 'ts-md5';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { notifications } from '../models/Notification';



@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  /*private socket$ = webSocket('ws://localhost:8080/socket');

  constructor() {
    this.socket$.subscribe(
      (notification: Notification) => {
        // Handle the received notification
        // Update UI, display a notification message, etc.
        console.log('Received notification:', notification);
      },
      (error: any) => {
        // Handle WebSocket connection error
        console.error('WebSocket connection error:', error);
      }
    );
  }

  sendNotification(notification: Notification): void {
    this.socket$.next(notification);
  }
  subscribeToNotifications(): Observable<any> {
    return this.socket$.asObservable()
  }*/

  private channel = new Subject<string>();

  public static createChannel(user1: string, user2: string): string {
    let combined: string = '';

    if (user1 < user2) {
      combined = user1 + user2;
    } else {
      combined = user2 + user1;
    }

    return Md5.hashStr(combined).toString();
  }

  refreshChannel(channel: string) {
    this.channel.next(channel);
  }

  removeChannel() {
    this.channel.next();
  }

  getChannel(): Observable<any> {
    return this.channel.asObservable();
  }

  
}
