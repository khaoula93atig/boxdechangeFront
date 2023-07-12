import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";
import { AuthService } from "../services/auth.service";
@Injectable({
    providedIn: 'root'
  })
export class AfterAuthGuard implements CanActivate{
    constructor(private tokenService:TokenStorageService,
        private authService : AuthService,
        private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.tokenService.loggedIn()){
            if(this.authService.currentUserValue.roles.find(element => element ='ROLE_ENCHERE')=='ROLE_ENCHERE')
            this.router.navigateByUrl('/dash/dashboard')
            else if(this.authService.currentUserValue.roles.find(element => element ='ROLE_BANK')=='ROLE_BANK')
                this.router.navigate(['/dash/list'])
            else if(this.authService.currentUserValue.roles.find(element => element ='ROLE_ADMIN')=='ROLE_ADMIN')
            this.router.navigate(['/dash/box'])
        }
        return true;
    }

}