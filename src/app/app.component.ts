import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'boxDeChange';
  date:any

  constructor(private tokenService:TokenStorageService,
    private authService:AuthService){}

  ngOnInit(): void {
    this.date=this.tokenService.getExprirationDate(this.authService.currentUserValue.accessToken)
    console.log(this.date)
    if(this.date<new Date){
      this.authService.logout()
    }

    
  }
}
