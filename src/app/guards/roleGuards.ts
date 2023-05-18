import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private accountService: TokenStorageService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.log(this.accountService.getUser())
      console.log(next.data['role'])
      console.log(next)
    if(this.accountService.getUser().roles!=next.data['role']) {
      this.router.navigateByUrl('');
      return false;
    }

    return true;
  }

}                                                             