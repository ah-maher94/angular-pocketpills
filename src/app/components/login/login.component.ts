import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token.service';
import { DataService } from '../../data/data.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    userEmail: null,
    userPassword: null,
  };
  currentUser: any = [];
  currentUserBranch: any = [];
  temp :any;
  public error: any; 
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private tokenService: TokenService,
    private setAdmin: DataService,
    private setSuperAdmin: DataService,

    private setUser: DataService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.form)
      .subscribe((data) => {
        // console.log(data['token']['original']['access_token']);

        // this.handleResponse(data['token']['original']['access_token']);
        if(data['details']['userId']){
          this.currentUser.push({
            userRole : data['details']['userRole'],
            userId : data['details']['userId']
          })

          // console.log(data['userRole']);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

          if(data['details']['userRole']==="admin"){
            this.setAdmin.changeAdmin(1);
            this.setUser.changeUser(0);
            this.setSuperAdmin.changeSuperAdmin(0)

            this.router.navigate(['dashboard']);
            for(this.temp=0; this.temp<data['branchId'].length; this.temp++){
              this.currentUserBranch.push({
                branchId: data['branchId'][this.temp]['branchId']
              });
            }
            
            localStorage.setItem('currentUserBranches', JSON.stringify(this.currentUserBranch));

          }else if(data['details']['userRole']==="user"){
            this.setUser.changeUser(1);
            this.setAdmin.changeAdmin(0);
            this.setSuperAdmin.changeSuperAdmin(0)

            this.router.navigate(['categories']);
          }else if(data['details']['userRole']==="superAdmin"){
              this.setAdmin.changeAdmin(0);
              this.setUser.changeUser(0);
              this.setSuperAdmin.changeSuperAdmin(1);
              this.router.navigate(['superdashboard']);
          }

        }

      }, error => {
        // console.log(error.error.message);
        if(error.error.message == 'The given data was invalid.'){
          this.error = 'The given data is invalid';
        }else{
          this.error = 'Wrong Email or Password';
        }
        
    });
  }

}
