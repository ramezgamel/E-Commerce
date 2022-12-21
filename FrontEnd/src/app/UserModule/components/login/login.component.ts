import { UserService } from './../../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent{
  loginForm:FormGroup
  constructor(private auth:UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('ramez@ram.com',[Validators.required, Validators.email]),
      password: new FormControl('123', [Validators.required])
    })
  }

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  login(){
    this.auth.login(this.email?.value , this.password?.value)
      .subscribe((res:any )=> {
        localStorage.setItem("token", res.response)
      })
  }

}
