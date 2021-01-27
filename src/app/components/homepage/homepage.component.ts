import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data/data.service'; 
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  categories: any;
  products: Object;
  productCodeService: any;
  router: any;
  constructor(
    private authService: AuthServiceService,
    private http: HttpClient,private setCategory: DataService) { }

  async ngOnInit(): Promise<void> {
    this.authService.authAdmin();
    try {
      await this.http.get("https://pocket-pills.herokuapp.com/api/category")
      .subscribe(res =>{
      this.categories=res;
    });

    await this.http.get("https://pocket-pills.herokuapp.com/api/products")
    .subscribe(res =>{
    this.products=res;
  });

    } catch (error) {
      
    }
  }
  product(event)
  {
    // console.log(event.target.value);
    this.setCategory.changeMessage(event.target.value);
  }

  singleProduct(productCode)
  {
    this.productCodeService.changeProductCode(productCode);
    this.router.navigate(['product']);
  }
}
