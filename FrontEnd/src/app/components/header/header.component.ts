import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/Services/category.service';
import { UserService } from 'src/app/UserModule/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  categories:ICategory[] = [];

  constructor(
    private catService:CategoryService, 
    private auth:UserService
  ){ };


  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(cats => {
      this.categories = cats
    });

    this.auth.currentUser.subscribe((res) => {
      if(res)  this.isLogged = true
    })
  };


  logout(){
    this.auth.deleteCurrentUser()
    this.isLogged = false
  }

}
