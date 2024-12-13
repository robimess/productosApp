import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const utilsService = inject(UtilsService);

  const user = localStorage.getItem('user');
  
  return new Promise<boolean>((resolve) => {
    firebaseService.getAuth().onAuthStateChanged((auth) => {
      if (auth) {
        if (user) {
          resolve(true);
        } else {
          utilsService.routerLink('/auth');
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  });
};
