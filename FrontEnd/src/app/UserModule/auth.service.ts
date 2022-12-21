import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { };

  register(user:IUser):Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.APIUrl}user/register`,user)
  };

  login(email:string, password:string):Observable<string>{
    return this.httpClient.post<string>(`${environment.APIUrl}user/login`,
      {email,password});
  };
  
  logout(){
    localStorage.removeItem("token")
  };
  
  getProfile(profileID:number):Observable<IUser>{
    return this.httpClient.get<IUser>(`${environment.APIUrl}user/profile/${profileID}`);
  };

  updateProfile(profileID:number, user:IUser):Observable<IUser>{
    return this.httpClient.post<IUser>(`${environment.APIUrl}user/profile/${profileID}`,user);
  };

  forgetPassword(){

  };

  // Admins Only
  addAdmin(){

  };
}
