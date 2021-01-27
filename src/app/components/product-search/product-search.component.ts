import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data/data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  product: any;
  clicked = [];
  qtyminus: any;
  qtyplus: any;
  index: number;
  inputvalue: any;
  modifiedvalue: any;
  producCodetList: any;
  found = 0;
  AvailableQuantity: any;
  available = 0;
  updateQuantity = 0;
  testTemplet = 1;

  searchFor: string;
  productList: any = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private authService: AuthServiceService,
    private diplayedProduct: DataService,
    private productCodeService: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      if (this.route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchFor = this.route.snapshot.queryParamMap.get('searchTerm');
      }
      this.productService.searchProduct(this.searchFor).subscribe((data) => {
        console.log(data);
        // window.location.reload();
        this.productList = data;
        for (let index = 0; index < this.productList.length; index++) {
          this.clicked.push(0);
        }
      });
    } catch (error) {}
  }

  addToCard(event, i) {
    this.clicked[i] = 1;
    // this.updateQuantity=1;
    this.index = i;
    // this.changeQuantity(i);
    setTimeout(() => {
      this.qtyminus = document.getElementsByClassName('qtyminus');
      console.log(this.qtyminus.length);
      for (let index = 0; index < this.qtyminus.length; index++) {
        this.qtyminus[index].addEventListener('click', function () {
          this.inputvalue = document.getElementsByClassName('qty');

          this.modifiedvalue = this.inputvalue[index].value;
          if (this.modifiedvalue > 1) {
            this.inputvalue[index].value = this.modifiedvalue - 1;
          }
        });
        this.qtyplus = document.getElementsByClassName('qtyplus');
        this.qtyplus[index].addEventListener('click', function () {
          //     // console.log(i);

          this.inputvalue = document.getElementsByClassName('qty');
          // console.log(this.inputvalue);
          this.modifiedvalue = parseInt(this.inputvalue[index].value);
          if (this.modifiedvalue > 0) {
            this.inputvalue[index].value = this.modifiedvalue + 1;
          }
        });
      }
    }, 1000);
  }
  getQuantity(event, i, pc, pb) {
    let productCode, branchId;
    this.inputvalue = document.getElementsByClassName('qty');
    console.log(event.target);
    let quantity = parseInt(this.inputvalue[0].value);
    if (event.target.parentNode.id != '') {
      [productCode, branchId] = event.target.parentNode.id.split(',');
    } else {
      [productCode, branchId] = event.target.id.split(',');
    }
    let userId = JSON.parse(localStorage.getItem('currentUser'))[0]['userId'];
    const fd = new FormData();
    fd.append('userId', userId);
    fd.append('productCode', productCode);
    fd.append('branchId', branchId);
    fd.append('productQuantity', quantity.toString());

    this.http
      .post('https://pocket-pills.herokuapp.com/api/cartList', fd)
      .subscribe((res) => {
        this.producCodetList = res;
        for (let index = 0; index < this.producCodetList.length; index++) {
          if (this.producCodetList[index]['productCode'] == productCode) {
            this.found = 1;
          }
        }
        if (this.found == 0) {
          this.http
            .post('https://pocket-pills.herokuapp.com/api/getQuantity', fd)
            .subscribe((res) => {
              this.AvailableQuantity = res;
              if (this.AvailableQuantity[0]['productQuantity'] >= quantity) {
                this.available = 1;
              }
              console.log(this.available);

              if (this.available == 1) {
                this.http
                  .post('https://pocket-pills.herokuapp.com/api/appToCard', fd)
                  .subscribe((res) => {
                    this.productList = res;
                    if (res['message'] == 'Success') {
                      alert('item added to card successfully');
                    }
                    this.clicked[i] = 0;
                    this.updateQuantity = 0;
                  });
              } else {
                let massege =
                  'this quantity is not available the available quantity is ' +
                  this.AvailableQuantity[0]['productQuantity'];
                alert(massege);
              }
            });
        } else {
          alert('this product already exist in your card');
        }
      });
  }
  displayAddToCard() {
    let userId = JSON.parse(localStorage.getItem('currentUser'))[0]['userId'];
    const fd = new FormData();
    fd.append('userId', userId);
    this.http
      .post('https://pocket-pills.herokuapp.com/api/cartList', fd)
      .subscribe((res) => {
        this.producCodetList = res;
        for (let index = 0; index < this.producCodetList.length; index++) {
          if (
            this.producCodetList[index]['productCode'] ==
            this.productList[index]['productCode']
          ) {
            this;

            this.found = 1;
          }
        }
      });
  }
  singleProduct(productCode) {
    this.productCodeService.changeProductCode(productCode);
    this.router.navigate(['product']);
  }
}
