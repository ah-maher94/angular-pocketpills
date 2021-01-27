import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://pocket-pills.herokuapp.com/api';
  currentUser: any= [];
  userId: any;

  constructor(private router: Router, private http: HttpClient) { }

  getProductInfo(id){
    return this.http.get(`${this.baseUrl}/getproduct/${id}`);
  }

  getQuantity(productCode, userId){
    // if(localStorage.getItem('currentUser')){

      return this.http.get(`${this.baseUrl}/getproductquantity/${productCode}/${userId}`);
    // }
  }

  getAdminInfo(adminId){
    // return this.http.get(`${this.baseUrl}/getproduct/${id}`);
  }

  getUserCartProducts(){

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId= this.currentUser[0]['userId'];
    
    return this.http.get(`${this.baseUrl}/cart/${this.userId}`);
  }

  // removeProduct(productCode){
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   this.userId= this.currentUser[0]['userId'];
  //   return this.http.post(`${this.baseUrl}/cart/${productCode}`, this.userId);
  // }

  checkout(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId= this.currentUser[0]['userId'];
    return this.http.get(`${this.baseUrl}/users/cart/${this.userId}`);
  }
  
  searchProduct(searchFor){
    return this.http.get(`${this.baseUrl}/products/search/${searchFor}`);
  }
}
