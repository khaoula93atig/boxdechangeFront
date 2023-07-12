import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService,
     private tokenStorage: TokenStorageService, 
     private toastr: ToastrService,
     private router: Router) { }

  ngOnInit(): void {
   /*if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }*/
  }
  onSubmit(): void {
    console.log(this.form)
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data)
        /*this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;*/
        this.roles = this.authService.currentUserValue.roles;
        console.log(this.roles)
        this.toastr.success('Connection approuvée','Bienvennue!!' );
        if(this.roles.find(element => element ='ROLE_ENCHERE')=='ROLE_ENCHERE'){
          this.router.navigate(['/dash/dashboard'])
        }
        if (this.roles.find(element => element ='ROLE_BANK')=='ROLE_BANK'){
          this.router.navigate(['/dash/list'])
        }
        if (this.roles.find(element => element ='ROLE_ADMIN')=='ROLE_ADMIN'){
          this.router.navigate(['/dash/box'])
        }
        
      },
      err => {
        this.toastr.error('Vérifier vos informations','Erreur' );
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
