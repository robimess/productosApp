import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirebaseService } from 'src/app/services/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[FirebaseService],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
