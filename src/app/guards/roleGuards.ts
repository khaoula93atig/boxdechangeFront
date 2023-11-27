import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private accountService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      /*console.log(this.accountService.getUser())
      console.log(next.data['role'])
      console.log(next)*/
    if(this.accountService.currentUserValue.roles!=next.data['role']) {
      this.router.navigateByUrl('');
      return false;
    }

    return true;
  }

}                                                             