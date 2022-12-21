import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
  {path:"", component:AllProductsComponent, pathMatch:"full"},
  {path:"create", component:AddProductComponent},
  {path:":id", component:SingleProductComponent}
]

@NgModule({
  declarations: [
    AllProductsComponent,
    SingleProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProductsModule { }
