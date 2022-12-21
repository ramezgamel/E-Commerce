import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from '../../Models/iproduct';
import { GlobalService } from 'src/app/core/global.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private globalService:GlobalService) { };

  getAllProducts(filter?:Object):Observable<IProduct[]>{
    return this.globalService.getAll("product", filter).pipe<IProduct[]>(map((d:any) => d.response.data)) 
  };
  
  getProductByID(prdID: number):Observable<IProduct>{
    return this.globalService.getSingle("product", prdID)
  };

  // Admins Only 
  addProduct(data:any):Observable<IProduct>{
    let token = localStorage.getItem("token") 
    if(token){
      return this.globalService.createOne("product", data, token)
    }
    throw Error("LogIn first")
  };

  deleteProductByID(prdID: number):Observable<IProduct>{
    return this.globalService.deleteOne("product", prdID)
  };

  updateProductByID(prdID: number, data: IProduct):Observable<IProduct>{
    return this.globalService.updateOne("product", prdID, data)
  };

};
