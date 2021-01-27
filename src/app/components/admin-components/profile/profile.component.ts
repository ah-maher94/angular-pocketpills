import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any=[];

  constructor(private authService: AuthServiceService,private router: Router) { }

  ngOnInit(): void {
    this.authService.authUser();
    this.authService.getUser().subscribe((data) => {
      // console.log(data);
      this.userInfo = data;
    });
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
