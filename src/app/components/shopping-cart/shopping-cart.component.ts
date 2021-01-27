import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private baseUrl = 'https://pocket-pills.herokuapp.com/api';
  currentUser: any= [];
  userId: any;
  cartProducts: any =[];
  cartProductLength: any = 0;
  constructor(private productService: ProductsService, private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getUserCartProducts().subscribe((data)=>{
      console.log(data);
      this.cartProducts = data;
      this.cartProductLength = Object.keys(data).length;
      console.log(this.cartProductLength);

    });
  }

  removeProduct(product){
    // let fd =new FormData;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId= this.currentUser[0]['userId'];
    console.log(product.productCode);
    
    // fd.append('userId', this.userId)
    return this.http.get(`${this.baseUrl}/cart/${product.productCode}/${this.userId}`).subscribe((data)=>{
      window.location.reload();
      
    });
  }

  checkout(){
    return this.productService.checkout().subscribe((data)=>{
      console.log(data);
      this.router.navigate(['order-success']);
    });;
  }

}
