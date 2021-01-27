import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-nav',
  templateUrl: './super-admin-nav.component.html',
  styleUrls: ['./super-admin-nav.component.css']
})
export class SuperAdminNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
