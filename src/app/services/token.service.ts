import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleToken(token){
    this.setLocal(token);
  }

  setLocal(token){
    localStorage.setItem('token', token);
  }

}
