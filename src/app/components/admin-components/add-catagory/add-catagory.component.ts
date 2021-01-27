import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-add-catagory',
  templateUrl: './add-catagory.component.html',
  styleUrls: ['./add-catagory.component.css']
})
export class AddCatagoryComponent implements OnInit {

  addCategoryReactiveForm: FormGroup;
  departmentNameError;
  categoryImageError: any;
  myImage;
  constructor(private authService: AuthServiceService,
    private profile: FormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.authUser();
    this.addCategoryReactiveForm = this.profile.group({
      categoryName: ['', [Validators.required]],
    });
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
  get registerFormControl() {
    
    return this.addCategoryReactiveForm.controls;
  }
  handleReactiveFormSubmit()
  {
    this.departmentNameError=this.addCategoryReactiveForm.controls.categoryName.errors;
    
    if(this.departmentNameError ==null)
    {
      const fd =new FormData;
      let branchId = JSON.parse(localStorage.getItem('currentUserBranches'))[0]['branchId'];
      
      // fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('categoryImage',this.myImage);
      fd.append('categoryName',this.addCategoryReactiveForm.controls.categoryName.value);
      this.http.post("https://pocket-pills.herokuapp.com/api/category",fd)
      .subscribe(res =>{
          alert('category added succeffully');
    });
    }
  }

  

}
