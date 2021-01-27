import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'https://pocket-pills.herokuapp.com/api';
  currentUser: any= [];
  id: any;

  constructor(private router: Router, private http: HttpClient) { }

  // authorize(pageName){
  //   return this.http.get(`${this.baseUrl}/${pageName}`);
  // }

  register(userData){
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(userData){
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  authUser(){
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser[0]['userRole'] == "user"){
        this.router.navigate(['categories']);
      }
      if(this.currentUser[0]['userRole'] == "superAdmin"){
        this.router.navigate(['superadmin']);
      }
    }else{
      this.router.navigate(['categories']);
    }
  }

  authAdmin(){
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser[0]['userRole'] == "admin"){
        this.router.navigate(['dashboard']);
      }
      if(this.currentUser[0]['userRole'] == "superAdmin"){
        this.router.navigate(['superadmin']);
      }
    }else{
      this.router.navigate(['categories']);
    }
  }

  getUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id= this.currentUser[0]['userId']
    return this.http.get(`${this.baseUrl}/users/${this.id}`)
  }

  getRequests(){
    return this.http.get(`${this.baseUrl}/pharmacy/requests`)
  }

  declineRequest(notificationId){
    return this.http.get(`${this.baseUrl}/pharmacy/requests/${notificationId}`)
  }

  acceptRequest(notificationId){
    return this.http.post(`${this.baseUrl}/pharmacy/requests/${notificationId}`, notificationId)
  }
}
