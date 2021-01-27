import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // orders: Object;
  adminOrders: any = [];

  constructor(private http: HttpClient,
    private authService: AuthServiceService,
    private orderService: OrdersService,
    private router: Router) { }

    async ngOnInit(): Promise<void> {
      this.authService.authUser();

      this.orderService.getAdminOrders().subscribe((data) => {
        console.log(data);
        this.adminOrders = data;
      });
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  deleteInvoice(invDetailsNo) {
    this.orderService.cancelOrder(invDetailsNo).subscribe((data) => {
      window.location.reload();
    });
  }

  updateStatus(invDetailsNo){
    this.orderService.updateStatus(invDetailsNo).subscribe((data) => {
      window.location.reload();
    });
  }

}
