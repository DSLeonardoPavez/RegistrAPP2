import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RegisterPage }])
  ],
  providers: [
    HttpClient
  ]
})
export class RegisterPageModule {}
