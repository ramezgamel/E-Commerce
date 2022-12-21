import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../Models/icategory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { };

  // query params
      // sort limits search (paginate) => limit, page
  getAllCategories():Observable<ICategory[]>{
    return this.httpClient.get(`${environment.APIUrl}category`)
      .pipe<ICategory[]>(
        map(
          (cats:any) => cats.response.data
        )
      )
  };

  getCategoryByID(catID:number):Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(`${environment.APIUrl}category/${catID}`)
  };

  // Admins Only
  addCategory(data:ICategory):Observable<ICategory>{
    return this.httpClient.post<ICategory>(`${environment.APIUrl}category`,data)
  };

  deleteCategory(catID:number):Observable<ICategory>{
    return this.httpClient.delete<ICategory>(`${environment.APIUrl}category/${catID}`)
  };

  updateCategory(catID:number, data:ICategory):Observable<ICategory>{
    return this.httpClient.put<ICategory>(`${environment.APIUrl}category/${catID}`,data)
  };
  
  


}
