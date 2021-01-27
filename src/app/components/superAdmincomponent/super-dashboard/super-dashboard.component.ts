import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-super-dashboard',
  templateUrl: './super-dashboard.component.html',
  styleUrls: ['./super-dashboard.component.css']
})
export class SuperDashboardComponent implements OnInit {
  orders: any;
  allRequests: any = [];
  allRequestsLength: any = 0;
  contactInfo:boolean = false;

  constructor(private http: HttpClient,
    private authService: AuthServiceService,private router: Router) { }
    adminLogout()
    {
      localStorage.clear();
      this.router.navigate(['login']);
    }
    async ngOnInit(): Promise<void> {
      this.authService.authUser();
      try {
      
     await this.http.get("https://pocket-pills.herokuapp.com/api/getBranchinfo").subscribe(res=>{
       this.orders=res;
       console.log(res);
     });
    } catch (error) {
      
    }

    this.authService.getRequests().subscribe((data)=>{
      console.log(data);
      this.allRequests = data;
      this.allRequestsLength = Object.keys(data).length;
    });


  }

  accept(notificationId){
    this.authService.acceptRequest(notificationId).subscribe((data)=>{
      window.location.reload();
    });
  }

  decline(notificationId){
    // console.log(notificationId);
    this.authService.declineRequest(notificationId).subscribe((data)=>{
      window.location.reload();
    });
  }

  toggleContact(){
    this.contactInfo = !this.contactInfo;
  }

}
