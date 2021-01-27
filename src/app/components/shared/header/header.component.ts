import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchValue: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['categories']);
  }

  searchProduct(){
    // window.location.reload();
    this.router.navigate(['products/search'], {
      queryParams:{'searchTerm': this.searchValue}
    })
  }

}
