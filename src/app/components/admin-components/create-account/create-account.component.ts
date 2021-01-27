import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private authService: AuthServiceService,private router: Router) { }

  ngOnInit(): void {
    this.authService.authUser();
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
