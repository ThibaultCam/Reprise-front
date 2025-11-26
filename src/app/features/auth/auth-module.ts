import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginPage,
    RegisterPage
  ]
})
export class AuthModule { }
