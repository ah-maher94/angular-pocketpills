import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  currentUser: any= [];
  userId: any;
  productInfo: any = [];
  productCode;
  constructor(private productService: ProductsService
              ,private productCodeService: DataService,) { }

  ngOnInit(): void {
    this.productCodeService.productCodeTrigger.subscribe(result => {
      this.productCode = result;})
    this.productService.getProductInfo(this.productCode)
    .subscribe((data) => {
      console.log(data);
      this.productInfo = data;
    });
  }


  getQuantity(productCode){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId= this.currentUser[0]['userId'];
    console.log(this.productService.getQuantity(productCode, this.userId));
    return this.productService.getQuantity(productCode, this.userId);
  }

  addToCart(product){

  }

  removeFromCart(product){

  }

}
