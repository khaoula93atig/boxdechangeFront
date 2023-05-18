import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";
@Injectable({
    providedIn: 'root'
  })
export class AfterAuthGuard implements CanActivate{
    constructor(private tokenService:TokenStorageService,
        private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.tokenService.loggedIn()){
            this.router.navigateByUrl('/dash')
        }
        return true;
    }

}