import { Component, OnInit } from '@angular/core';
import { HttpClient}from '@angular/common/http'; 
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css'],
})
export class StuffComponent implements OnInit {
  employees: object;
  departments: Object;
  index: number;
  oldValue: Array<string> = ['sss'];
  editedValue: Array<string>;
  numberOfInput = 50;
  changeInput: Array<string> = [];
  branchId: any;
  constructor(private authService: AuthServiceService,
    private http: HttpClient,private profile: FormBuilder,private router: Router) { }


  async ngOnInit(): Promise<void> {
    this.authService.authUser();
    try {
      const fd =new FormData; 
      this.branchId = JSON.parse(localStorage.getItem('currentUserBranches'))[0]['branchId'];
      fd.append('branchId',this.branchId);
      console.log('branchid: ',this.branchId);
      

     await this.http
    //  .get('https://pocket-pills.herokuapp.com/api/staff/'+ fd)
     .post('https://pocket-pills.herokuapp.com/api/getStaffBranch',fd)
     .subscribe((res) => {
          this.employees = res;
        });

       
     
          await this.http.post("https://pocket-pills.herokuapp.com/api/departmentName",fd)
          .subscribe(res =>{
          this.departments=res;
         
        });
        } catch (error) {
          
        }
      }


  //     await this.http
  //       .get('https://pocket-pills.herokuapp.com/api/staff')
  //       .subscribe((res) => {
  //         this.departments = res;
  //       });
  //   } catch (error) { }
  // }
  adminLogout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  deleteEmployee(staffId) {
    this.http
      .delete('https://pocket-pills.herokuapp.com/api/staff/' + staffId)
      .subscribe((res) => { });
  }






  editEmployee(staffId) {


    this.rowValue = 50;
    this.reassign = 100;


    let editedVal = document.getElementsByTagName('input');
    let i = 0;
    console.log(editedVal);
    for (const key in this.employees[this.index]) {
      this.oldValue.map(x => {
        if (x == this.employees[this.index][key]) {
          let rowt = document.getElementsByClassName('catchRow');
          for (let x = 1; x <= rowt.length; x++) {
            switch (key) {
              case "staffName": rowt[x].innerHTML = editedVal[0].value;
                break;
              case "salary": rowt[x].innerHTML = editedVal[1].value;
                break;
              case "staffDepartment": rowt[x].innerHTML = editedVal[2].value;
                break;
              case "staffPhone": rowt[x].innerHTML = editedVal[3].value;
                break;

              default:
                break;
            }

            i++;
          }
          // this.employees[this.index][key] = editedVal[i].value;
           

          this.http
      .put('https://pocket-pills.herokuapp.com/api/staff/' + staffId ,this.editedValue)
      .subscribe((res) => {

      });

        }
      });
    }
  }

  rowValue = 50;
  reassign = 100;

  myFunction(event) {

    if (this.rowValue != this.reassign) {

      this.changeInput.push(event.target.id);
      let inputValue = `<input type='text' style="width: 96px; height:60px" value='` + event.target.innerHTML + `' id='` + this.numberOfInput + `'>`;
      this.numberOfInput++;
      this.index = event.target.id;
      this.rowValue = event.target.id;
      this.reassign = this.index;
      this.oldValue.push(event.target.innerHTML);
      event.target.innerHTML = inputValue;
    }
    else if (this.index == event.target.id) {

      this.changeInput.push(event.target.id);
      let inputValue = `<input type='text' style="width: 96px; height:60px" value='` + event.target.innerHTML + `' id='` + this.numberOfInput + `'>`;
      this.numberOfInput++;
      this.rowValue = event.target.id;
      this.reassign = this.index;
      this.oldValue.push(event.target.innerHTML);
      event.target.innerHTML = inputValue;

    }

  }

}
