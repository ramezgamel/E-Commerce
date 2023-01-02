import { Cart } from './../../../Models/cart';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: IProduct[] = [];
  cart: Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };

  queryParams?: Object;
  APIRoot = environment.APIUrl;
  constructor(
    private prdService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart')!);
    }
    this.ActivatedRoute.queryParams.subscribe((param) => {
      this.queryParams = param;
      this.prdService
        .getAllProducts(param)
        .subscribe((res) => (this.products = res));
    });
  }

  sortby(sortType: string) {
    this.router.navigate(['/products'], {
      queryParams: { ...this.queryParams, sort: `${sortType}` },
    });
  }

  addToCart(product: IProduct, quantity: string) {
    this.cart.totalPrice = this.cart.totalQuantity = 0;

    this.cart?.items.push({
      name: product.name,
      image: product.coverImage!,
      id: product._id,
      price: product.price,
      quantity: +quantity,
    });

    this.cart?.items.forEach((item) => {
      this.cart!.totalPrice += item.price * item.quantity;
      this.cart!.totalQuantity += item.quantity;
    });

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
