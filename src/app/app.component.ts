import { Component } from '@angular/core';
import { DataService } from './data/data.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pocketpills';
  adminRoute;
  UserRoute;
  superAdminRoute;
  constructor(private getUser: DataService
              ,private getAdmin: DataService
              ,private getSupetAdmin: DataService){}
  ngOnInit()
  {
    this.getUser.loginUserTrigger.subscribe(result => {
      this.UserRoute = result;})
    this.getAdmin.loginAdminTrigger.subscribe(result => {
      this.adminRoute = result;})
      this.getSupetAdmin.loginSuperAdminTrigger.subscribe(result =>{
        this.superAdminRoute=result;
      })
  }
}
