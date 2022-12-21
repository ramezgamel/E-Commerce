import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:IProduct[] = [];
  queryParams?:Object ;
  APIRoot = environment.APIUrl
  constructor(
    private prdService: ProductService, 
    private ActivatedRoute: ActivatedRoute, 
    private router:Router) { }

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(
      param => {
        this.queryParams = param
          this.prdService.getAllProducts(param)
            .subscribe(res => this.products = res)
        }
    );
    
  };

  sortby(sortType:string){
    this.router.navigate(['/products'], {queryParams: {...this.queryParams,sort:`${sortType}`}})
  }

}
