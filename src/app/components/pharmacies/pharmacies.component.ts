import { Component, OnInit } from '@angular/core';
import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data/data.service'; 
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-Pharmacies',
  templateUrl: './Pharmacies.component.html',
  styleUrls: ['./Pharmacies.component.css']
})


export class PharmaciesComponent implements OnInit {
  pharmacies: any;
  products: Object;
  constructor(
    private authService: AuthServiceService,
    private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.authService.authAdmin();
    try {
      await this.http.get("https://pocket-pills.herokuapp.com/api/pharmacy")
      .subscribe(res =>{
      this.pharmacies=res;
    });

    } catch (error) {
      
    }
  }

  

}
