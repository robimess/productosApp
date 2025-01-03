import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService)
  //=======ENVIAR FORMULARIO=======
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();
      this.firebaseService.signIn(this.form.value as User).then(res => { 
        this.getUserInfo(res.user.uid)
      }).catch(error => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        }) 
      }).finally(() => {
        loading.dismiss();
      })
    }
  }
  //=======GET=======
  async getUserInfo(id: string) {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();
      let path = `users/${id}`;
      this.firebaseService.getDocument(path).then((user : User) => {
        this.utilsService.saveInLocalStoraga('user', user);
        this.utilsService.routerLink('/main/home');
        this.form.reset();
        this.utilsService.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        })
      }).catch(error => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })
    } 
  }


   
}
