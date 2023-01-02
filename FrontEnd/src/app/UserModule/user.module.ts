import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"register", component:UserComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class UserModule { }
