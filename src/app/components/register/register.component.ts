import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerReactiveForm: FormGroup;
  havePharmacy: boolean= false;
  myImage;
  public error: any; 
  public form = {
    userName: null,
    userEmail: null,
    userPassword: null,
    userPhone: null,
    userLocation: null,
    pharmacyName: null,
    pharmacyPhoto: null,
    PharmacyOwner:null,
    branchRegion:null,
    branchStreet:null,
  };

  emailRegex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordRegex = /^(?=(?:.*[0-9]))(?=(?:.*[a-z]))(?=(?:.*[A-Z])).{6,}$/;
  phoneRegex = /^(01)\d{9}$/;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.registerReactiveForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      userEmail: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      userPassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      userPhone: ['', [Validators.required,  Validators.pattern(this.phoneRegex)]],
      userLocation: ['', [Validators.required]],
      pharmacyName: ['', [Validators.required, Validators.minLength(4)]],
      pharmacyPhoto: ['', [Validators.required]],
      PharmacyOwner: ['', [Validators.required, Validators.minLength(4)]],
      branchRegion: ['', [Validators.required, Validators.minLength(4)]],
      branchStreet: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get registerFormControl(){
    return this.registerReactiveForm.controls;
  }


  onChange($event: Event)
  {
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
      this.myImage=d;
      this.form.pharmacyPhoto=d;
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
  onSubmit(){ 
    this.authService.register(this.form)
    .subscribe((data) => {
      // console.log("dsfsfd");
      
        this.router.navigate(['login']);
    }, error => {
      // console.log(error.error.errors.userEmail[0]);
      if(error.error.errors.userEmail[0]=='The user email has already been taken.'){
        this.error = 'The user email has already been taken';
      }
      else{
        this.error = 'Complete required fields';
      }
      // console.log(this.error);

      
  });

  }

  toggleAdmin(){
    this.havePharmacy = !this.havePharmacy;
  }
}
