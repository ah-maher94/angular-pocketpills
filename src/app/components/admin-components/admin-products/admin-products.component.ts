import { Component, OnInit } from '@angular/core';
import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  categories: any;
  products: any;
  branchId: any;

  constructor(private authService: AuthServiceService,
    private http: HttpClient,private profile: FormBuilder,private router: Router) { }


  async ngOnInit(): Promise<void> {
    this.authService.authUser();
    try {
     
      const fd =new FormData; 
      this.branchId = JSON.parse(localStorage.getItem('currentUserBranches'))[0]['branchId'];
      fd.append('branchId',this.branchId);
      await this.http
        .get('https://pocket-pills.herokuapp.com/api/category')
        .subscribe((res) => {
          this.categories = res;
        });
     
    

      this.http
        .post('https://pocket-pills.herokuapp.com/api/getProductBranch',fd)
        .subscribe((res) => {
          this.products = res;
        });

      
    } catch (error) {}
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  deleteCategory(categoryName) {
    console.log(categoryName); 
    this.http
    .delete('https://pocket-pills.herokuapp.com/api/category/' + categoryName)
    .subscribe((res) => {
      // this.categories = res;
      });
  }

  deleteProduct(productCode) {
    this.http
    .delete('https://pocket-pills.herokuapp.com/api/products/' + productCode)
    .subscribe((res) => {
      // this.products = res;
      });
  }
//   get(branchId) {
//   this.http
//   .get('https://pocket-pills.herokuapp.com/api/products'+branchId)
//   .subscribe((res) => {
//     this.products = res;
//   });
// }


}
