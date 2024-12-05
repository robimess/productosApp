import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn:'root'
})
export class NoAuthGuard implements CanActivate {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = localStorage.getItem('user')
    return new Promise((resolve)=>{
      this.firebaseService.getAuth().onAuthStateChanged((auth)=>{
        if (auth) {
          if (user) {
            resolve(true)
          }else{
            this.utilsService.routerLink('/auth');
            resolve(false);
          }
        }
      })
    })
  }

}

 
