import { Routes } from '@angular/router';
import {LoginComponent} from "./public/pages/login/login.component";
import {RegisterComponent} from "./public/pages/register/register.component";
import {AuthService} from "./core/services/auth/auth.service";
import {inject} from "@angular/core";
import { LigneFactureComponent } from './secure/pages/ligne-facture/ligne-facture.component';
import { ModelFactureComponent } from './secure/pages/model-facture/model-facture.component';
import { MdpasseComponent } from './public/pages/mdpasse/mdpasse.component';
import { ResetPasswordComponent } from './public/pages/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"mdpasse",
    component:MdpasseComponent
  },
  { path: 'reset-password',
   component: ResetPasswordComponent
  },

  

  { path: 'factures/:id', component: LigneFactureComponent },
  { path: 'factures/models/:id', component: ModelFactureComponent },


  {
    path:"admin",
    loadChildren:()=> import("./secure/secure.module").then(module=>module.SecureModule),
    //canMatch:[()=>inject(AuthService).isAuthenticated] //ne doit etre charger que si on est connecte
  },

  {
    path: '',
    redirectTo:'login',
    pathMatch : "full"
  },
];
