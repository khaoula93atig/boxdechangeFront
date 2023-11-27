import { Injectable } from '@angular/core';
import { notifications } from '../models/Notification';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifs: Array<notifications> = [];
  private msgs = new Subject<Array<notifications>>();

  constructor(private http: HttpClient) { }

  pushMessage(notif:notifications) {
    this.notifs.push(notif);
    this.msgs.next(this.notifs);
  }

  filterMessages(channel: string): Array<notifications> {
    return this.notifs.filter(message => channel === message.channel)
      .sort((m1, m2) => {
        if (m1.timestamp > m2.timestamp) {
          return 1;
        }

        return -1;
      });
  }

  sendReadReceipt(channelId: string, username: string):Observable<any> {
   
    return this.http.post<any>(environment.URL + '/messages/', {
      channel: channelId,
      username: username
    });
  }

  getMessages(): Observable<any> {
    return this.msgs.asObservable();
  }
  
   getNotificationByuserAndDate(userId : string): Observable<notifications[]>{
    return this.http.get<notifications[]>(environment.URL+"/messages/getNotification/"+userId)
   }

}
