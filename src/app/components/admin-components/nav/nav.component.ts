import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
