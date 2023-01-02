import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Models/icategory';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  uploadFile!: File;
  categories?: ICategory[]
  constructor(
    private fb:FormBuilder, 
    private prdService:ProductService,
    private catService:CategoryService,
    private snackBar:MatSnackBar 
    ) {

    this.productForm = fb.group({
      name: ['Samsung 45 inch ', [Validators.required]],
      quantity: [2, [Validators.required]],
      category: ['636f86d3ba88a8e1dc79c968', [Validators.required]],           
      desc: ['smart tv, FullHD+ resolution', [Validators.required]],
      price: [7200, [Validators.required]],
      coverImage: [''],
      // Optional
      // brand: '',
      // sold: 0,
      // subCategories: '',
      // colors: '',
      // images: '',
      // priceAfterDiscount: 0,
      // ratingAverage: '',
      // ratingQuantity: ''
    })
  }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(cats => this.categories = cats);
    // this.snackBar.open("Created", 'Undo');
  }

  createOne(){
    const formData =  new FormData();
    for(let prd in this.productForm.value){
      formData.append(prd, this.productForm.value[prd])
    }
      formData.append('coverImage', this.uploadFile)
    this.prdService.addProduct(formData)
      .subscribe({
        next:res => this.snackBar.open("Created", 'success'), 
        error:err => console.log(err)
      })
    console.log(this.productForm.value)
  };

  onFileChange(event:any){
      this.uploadFile = event.target.files[0];
      console.log(this.uploadFile)
  }


}
