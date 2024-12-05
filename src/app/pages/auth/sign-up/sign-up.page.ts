import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {

  form = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  //===ENVIAR FORMULARIO===
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();
      this.firebaseService.signUp(this.form.value as User).then(async res => {
        await this.firebaseService.updateUser(this.form.value.name);
        let id = res.user.uid;
        this.form.controls.id.setValue(id);
        this.setUserInfo(id);
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
  //===SET===
  async setUserInfo(id: string) {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();
      let path = `users/${id}`;
      delete this.form.value.password;
      this.firebaseService.setDocument(path, this.form.value).then(async res => {
        this.utilsService.saveInLocalStoraga('user', this.form.value);
        this.utilsService.routerLink('/main/home');
        this.form.reset();
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
