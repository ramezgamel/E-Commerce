import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { };

  getAll<T>(endpoint:string, filter:Object = {}): Observable<T>{
    let params = {}
    if(filter){
      params = filter
    }
    return this.http.get<T>(`${environment.APIUrl}${endpoint}`,{params})
  };

  getSingle<T>(endpoint:string,id:number): Observable<T>{
    return this.http.get<T>(`${environment.APIUrl}${endpoint}/${id}`)
  };

  deleteOne<T>(endpoint:string, id:number, token:string): Observable<T>{
    return this.http.delete<T>(`${environment.APIUrl}${endpoint}/${id}`,{headers:{'x-auth-token': token}})
  };

  updateOne<T>(endpoint:string, id:number, newData:T, token:string): Observable<T>{
    return this.http.put<T>(`${environment.APIUrl}${endpoint}/${id}`, newData,{reportProgress:true, headers:{'x-auth-token': token}})
  };

  createOne<T>(endpoint:string, data:T, token:string): Observable<T>{
    return this.http.post<T>(`${environment.APIUrl}${endpoint}`, data, {headers:{'x-auth-token': token}})
  };

  
}
