import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  categories!:ICategory[]
  constructor(private catService:CategoryService) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(cats => this.categories = cats)
  }

  logout(){
    this.isLogged=!this.isLogged
  }

}
