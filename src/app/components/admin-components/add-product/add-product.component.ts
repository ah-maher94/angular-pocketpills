import { Component, OnInit } from '@angular/core';

import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedFile=null;
  addProductReactiveForm: FormGroup;
  passregex=/^(?=(?:.[0-9]))(?=(?:.[a-z]))(?=(?:.*[A-Z])).{6,}$/;
  categoryerror;
  descriptionerror;
  productNameerror;
  productPiceerror;
  quantityerror;
  categorys:any;
  manufacturererror:any;
  productCodeerror;
  imageLinkerror;
  branchId;
  myImage;
  constructor(private authService: AuthServiceService,
    private http: HttpClient,private profile: FormBuilder,private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.authService.authUser();
    this.addProductReactiveForm = this.profile.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      description: [null, Validators.required], 
      category: [null, Validators.required], 
      quantity: ['',[Validators.required]],
      manufacturer: ['',[Validators.required]],
      productCode: ['',[Validators.required]],
    });
    try {
      await this.http.get("https://pocket-pills.herokuapp.com/api/category")
      .subscribe(res =>{
      this.categorys=res;
      console.log(res);
    });
    } catch (error) {
      
    }
  }
  onChange($event: Event)
  {
    console.log("hi");
    const file =($event.target as HTMLInputElement).files[0];
    // console.log(file);
    this.convertToBase64(file);
  }
  convertToBase64(file: File)
  {
    const observable=new Observable((subscrible: Subscriber<any>)=>{
      this.readfile(file,subscrible);
    })
    observable.subscribe((d)=>{
      console.log(d);
      
      this.myImage=d;
    })
  }

  readfile(file: File,subscrible: Subscriber<any>)
  {
    const filereader=new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload=()=>{
      subscrible.next(filereader.result);
      subscrible.complete();
    }
  }

  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  onFileSelected(event)
  {
    this.selectedFile=<File>event.target.files[0];  }
  onUpload()
  {
    
  }
  get registerFormControl() {
    
    return this.addProductReactiveForm.controls;
  }
  handleReactiveFormSubmit()
  {
    this.productNameerror=this.addProductReactiveForm.controls.productName.errors;
    this.productPiceerror=this.addProductReactiveForm.controls.productPrice.errors;
    this.descriptionerror=this.addProductReactiveForm.controls.description.errors;
    this.quantityerror=this.addProductReactiveForm.controls.quantity.errors;
    this.categoryerror=this.addProductReactiveForm.controls.category.errors;
    this.manufacturererror=this.addProductReactiveForm.controls.manufacturer.errors;
    this.productCodeerror=this.addProductReactiveForm.controls.productCode.errors;
    console.log(this.addProductReactiveForm.controls.category.value);
      
    if(this.productNameerror ==null 
      && this.productPiceerror==null 
      && this.descriptionerror==null 
      && this.categoryerror==null 
      && this.quantityerror==null
      && this.productCodeerror==null
      && this.manufacturererror==null)
    {
      const fd =new FormData;
      fd.append('productImage',this.myImage);
      // fd.append('productImage',this.selectedFile,this.selectedFile.name);

      fd.append('productPrice',this.addProductReactiveForm.controls.productPrice.value);
      fd.append('productdescription',this.addProductReactiveForm.controls.description.value);
      fd.append('manufacturer',this.addProductReactiveForm.controls.manufacturer.value);
      fd.append('productCode',this.addProductReactiveForm.controls.productCode.value);
      fd.append('quantity',this.addProductReactiveForm.controls.quantity.value);
      fd.append('categoryName',this.addProductReactiveForm.controls.category.value);
      fd.append('productName',this.addProductReactiveForm.controls.productName.value);
      this.http.post("https://pocket-pills.herokuapp.com/api/products",fd)
      .subscribe(res =>{
      console.log(res);
      let fd =new FormData;
      this.branchId = JSON.parse(localStorage.getItem('currentUserBranches'))[0]['branchId'];
      
      fd.append('pharmacyId',"400");
      fd.append('productCode',this.addProductReactiveForm.controls.productCode.value);
      fd.append('branchId',this.branchId);
      fd.append('productQuantity',this.addProductReactiveForm.controls.quantity.value);
      this.http.post("https://pocket-pills.herokuapp.com/api/branchproduct",fd)
      .subscribe(res =>{
      console.log(res);
      alert("product added succeffully");
      });
     

    }, error => {
      alert("product code already exist");
    });
      // this.router.navigate(['/home']);
    }
  }
}
