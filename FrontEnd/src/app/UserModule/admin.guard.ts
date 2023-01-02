import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
      private _auth:UserService,
      private _router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this._auth.currentUser.getValue() != null){
        const user:{userId: string, isAdmin: boolean, iat: number} = this._auth.currentUser.getValue()!
        if(user.isAdmin) return true
        this._router.navigate(['/products'])
        return false
      }
      this._router.navigate(['/user/login'])
      return false

  }
  
}
