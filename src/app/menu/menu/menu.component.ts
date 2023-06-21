import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { notifications } from 'src/app/models/Notification';
import { WebsocketsService } from 'src/app/services/websockets.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { NotificationService } from 'src/app/services/notification.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  now=new Date()
  nbr=0;
  notification= new notifications;
  notifications:notifications[]=[]
  constructor(   private tokenStorage: TokenStorageService,
    private router: Router,
    private stompService: RxStompService,
    private notificationService:NotificationService) {
      const url = `/socket/notif/`
      this.stompService.watch(url).subscribe(res => {
       
        const data: notifications = JSON.parse(res.body)
        this.notification=data;
        console.log("***** test tta",this.notification)
        this.notifications.push(this.notification)
        this.nbr++ 
     })
    }
  roles =[]
  role : any;
  userName:string
  messages: string[] = [];
  userId:number
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  ngOnInit(): void {
   const userId = this.tokenStorage.getUser().id;
      const url = `/socket/notif/`+userId
      this.stompService.watch(url).subscribe(res => {
       console.log("***** test tta")
        const data: notifications = JSON.parse(res.body)
        
        this.notification=data;
        this.notifications.push(this.notification)
        this.nbr++ 
     })

    this.roles= this.tokenStorage.getUser().roles;
    this.role=this.roles.find(element => element = 'ROLE_USER');
    console.log("rooooole",this.role)
    this.userName= this.tokenStorage.getUser().username;
    console.log(this.userName)
    this.userId = this.tokenStorage.getUser().id;

    this.notificationService.getNotificationByuserAndDate(String(this.userId)).subscribe(data=>{
      console.log("notifUser*****",data)
      this.notifications=data
      this.nbr=this.nbr+this.notifications.length
        })
    

  }
  logoutAndQuit(): void {
    // Perform logout logic here
    // ...

    // Quit the application
    this.tokenStorage.signOut()
    this.router.navigateByUrl('/');

    window.close();
  }

  readNotification(){
    for(let not of this.notifications){
    this.notificationService.sendReadReceipt(not.channel, not.sender).subscribe(data=>{
      console.log(data)
      if(this.nbr>0){
        this.nbr--}
      console.log(this.nbr)
    }
      )
    }
  }

}
