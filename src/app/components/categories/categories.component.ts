import { Component, OnInit } from '@angular/core';
import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data/data.service'; 
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categorys: any;
  constructor(
    private authService: AuthServiceService,
    private http: HttpClient,private setCategory: DataService) { }

  async ngOnInit(): Promise<void> {
    this.authService.authAdmin();
    try {
      await this.http.get("https://pocket-pills.herokuapp.com/category")
      .subscribe(res =>{
      this.categorys=res;
      console.log(res);
    });
    } catch (error) {
      
    }
  }
  product(event)
  {
    // console.log(event.target.value);
    this.setCategory.changeMessage(event.target.value);
  }

}
