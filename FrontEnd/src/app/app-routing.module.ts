import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"user", loadChildren:()=> import('src/app/UserModule/user.module').then(m => m.UserModule)},
  {path:"products", loadChildren:()=> import('src/app/ProductsModule/products.module').then(m => m.ProductsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
