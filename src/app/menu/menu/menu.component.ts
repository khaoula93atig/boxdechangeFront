import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { notifications } from 'src/app/models/Notification';
import { WebsocketsService } from 'src/app/services/websockets.service';
import { WebSocketSubject } from 'rxjs/webSocket';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nbr=0;
  notification= new notifications;
  notifications:notifications[]=[]
  constructor(   private tokenStorage: TokenStorageService,
    private router: Router,
    private stompService: RxStompService) {
      console.log("***** test tta", this.stompService.watch(`/channel/notif/`+this.tokenStorage.getUser().id).subscribe() )
      const userId = this.tokenStorage.getUser().id;
      this.stompService.watch(`/channel/notif/`+userId).subscribe(res => {
       console.log("***** test tta")
        const data: notifications = JSON.parse(res.body)
        
        this.notification=data;
        
        this.nbr++
     })
    }
  roles =[]
  role : any;
  userName:string
  messages: string[] = [];
  ngOnInit(): void {
    
    this.roles= this.tokenStorage.getUser().roles;
    this.role=this.roles.find(element => element = 'ROLE_USER');
    console.log("rooooole",this.role)
    this.userName= this.tokenStorage.getUser().username;
    console.log(this.userName)

  }
  logoutAndQuit(): void {
    // Perform logout logic here
    // ...

    // Quit the application
    this.tokenStorage.signOut()
    this.router.navigateByUrl('/');

    window.close();
  }
}
