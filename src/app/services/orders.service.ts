import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'https://pocket-pills.herokuapp.com/api';


  currentUser: any = [];
  currentBranch: any = [];
  userId: any;
  branchId: any;

  constructor(private http: HttpClient) { }

  getUserOrders(){
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userId = this.currentUser[0]['userId'];
      return this.http.get(`${this.baseUrl}/customer/${this.userId}/orders`);
    }
  }

  getAdminOrders(){
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.userId = this.currentUser[0]['userId'];
    }
    if(localStorage.getItem('currentUserBranches')){
      this.currentBranch = JSON.parse(localStorage.getItem('currentUserBranches'));
      this.branchId = this.currentBranch[0]['branchId'];
    }
    return this.http.get(`${this.baseUrl}/pharmacy/${this.branchId}/orders`);
  }

  updateStatus(invDetailsNo){
    return this.http.put(`${this.baseUrl}/customer/orders/${invDetailsNo}`, invDetailsNo);
  }

  cancelOrder(invDetailsNo){
    return this.http.delete(`${this.baseUrl}/customer/orders/${invDetailsNo}`, invDetailsNo);
  }

  // getAdminOrder(invNo, productCode){
  //   if(localStorage.getItem('currentUserBranches')){
  //     this.currentBranch = JSON.parse(localStorage.getItem('currentUserBranches'));
  //     this.branchId = this.currentBranch[0]['branchId'];
  //   }
  //   return this.http.get(`${this.baseUrl}/pharmacy/${this.branchId}/${invNo}/${productCode}`);
  // }

}
