import { Component, OnInit } from '@angular/core';
import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent implements OnInit {
    selectedFile=null;
    addEmployerReactiveForm: FormGroup;
    passregex=/^(?=(?:.[0-9]))(?=(?:.[a-z]))(?=(?:.*[A-Z])).{6,}$/;
    emailerror;
    passerror;
    usernameerror;
    gendererror;
    hiringerror;
    categorys:any;
    phonenumbererror:any;
    branchId;
  constructor(private authService: AuthServiceService,
    private http: HttpClient,private profile: FormBuilder,private router: Router) { }

 async ngOnInit(): Promise<void> {
  this.authService.authUser();
    this.addEmployerReactiveForm = this.profile.group({
      staffName: ['', [Validators.required]],
      staffEmail: ['', [Validators.email,Validators.required]],
      staffDepartment: [null, Validators.required], 
      salary: [null, Validators.required], 
      hiring: ['',[Validators.required]],
      phonenumber: ['',[Validators.required]],
    });
    try {
      const fd =new FormData; // fd.append('image',this.selectedFile,this.selectedFile.name);
      this.branchId = JSON.parse(localStorage.getItem('currentUserBranches'))[0]['branchId'];
      
      fd.append('branchId',this.branchId);
      await this.http.post("https://pocket-pills.herokuapp.com/api/departmentName",fd)
      .subscribe(res =>{
      this.categorys=res;
     
    });
    } catch (error) {
      
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
    
    return this.addEmployerReactiveForm.controls;
  }
  handleReactiveFormSubmit()
  {
    this.usernameerror=this.addEmployerReactiveForm.controls.staffName.errors;
    this.emailerror=this.addEmployerReactiveForm.controls.staffEmail.errors;
    this.gendererror=this.addEmployerReactiveForm.controls.staffDepartment.errors;
    this.passerror=this.addEmployerReactiveForm.controls.salary.errors;
    this.hiringerror=this.addEmployerReactiveForm.controls.hiring.errors;
    this.phonenumbererror=this.addEmployerReactiveForm.controls.phonenumber.errors;
console.log(this.addEmployerReactiveForm.controls.staffDepartment.value);
    if(this.usernameerror ==null && this.emailerror==null && this.gendererror==null && this.passerror==null && this.phonenumbererror==null)
    {
      const fd =new FormData;
      // fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('branchId',this.branchId);
      fd.append('staffPhone',this.addEmployerReactiveForm.controls.phonenumber.value);


      fd.append('staffName',this.addEmployerReactiveForm.controls.staffName.value);
      fd.append('staffEmail',this.addEmployerReactiveForm.controls.staffEmail.value);
      fd.append('staffDepartment',this.addEmployerReactiveForm.controls.staffDepartment.value);
      fd.append('salary',this.addEmployerReactiveForm.controls.salary.value);
      fd.append('hiringDate',this.addEmployerReactiveForm.controls.hiring.value);
      this.http.post("https://pocket-pills.herokuapp.com/api/staff",fd)
      .subscribe(res =>{
          alert('staff added succeffully');
    });
      // this.router.navigate(['/home']);
    }
  }
}
