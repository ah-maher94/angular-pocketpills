import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  addDeparmentReactiveForm: FormGroup;
  departmentNameError;
  constructor(private authService: AuthServiceService,
    private profile: FormBuilder,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.authUser();
    this.addDeparmentReactiveForm = this.profile.group({
      departmentName: ['', [Validators.required]],
    });
  }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  get registerFormControl() {
    
    return this.addDeparmentReactiveForm.controls;
  }
  handleReactiveFormSubmit()
  {
    this.departmentNameError=this.addDeparmentReactiveForm.controls.departmentName.errors;
    if(this.departmentNameError ==null)
    {
      const fd =new FormData;
      let branchId = JSON.parse(localStorage.getItem('currentUserBranches'))[0]['branchId'];
      
      // fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('branchId',branchId);
      fd.append('departmentName',this.addDeparmentReactiveForm.controls.departmentName.value);
      this.http.post("https://pocket-pills.herokuapp.com/api/addDepartment",fd)
      .subscribe(res =>{
          alert('department added succeffully');
    });
    }
  }

}
