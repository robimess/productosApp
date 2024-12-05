import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingControl = inject(LoadingController)
  toastControl = inject(ToastController)
  router = inject(Router)

  //============CARGA============
  loading() {
    return this.loadingControl.create({ spinner: 'crescent' })
  }
  //============TOAST============
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastControl.create(opts);
    toast.present();
  }
  //============ENRUTADOR============
  routerLink(url: string) {
    return this.router.navigateByUrl(url)
  }
  //============LOCAL STOGARE============
  saveInLocalStoraga(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
   //============OBTENER DESDELOCAL STOGARE============
  getFromLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key))
  }

}
