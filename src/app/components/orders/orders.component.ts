import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userInfo: any=[];
  userOrders: any = [];
  constructor(
    private authService: AuthServiceService,
    private orderService: OrdersService) { }

  ngOnInit(): void {
    this.authService.authAdmin();
    this.orderService.getUserOrders().subscribe((data) => {
      console.log(data);
      this.userOrders = data;
    });
    this.authService.getUser().subscribe((data) => {
      // console.log(data);
      this.userInfo = data;
    });
  }

  cancelOrder(invDetailsNo){
    this.orderService.cancelOrder(invDetailsNo).subscribe((data) => {
      window.location.reload();
    });
  }



}
