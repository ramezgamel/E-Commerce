import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCartComponent } from './components/single-cart/single-cart.component';
import { AllCartsComponent } from './components/all-carts/all-carts.component';



@NgModule({
  declarations: [
    SingleCartComponent,
    AllCartsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CartsModule { }
