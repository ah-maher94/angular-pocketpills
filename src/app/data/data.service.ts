import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource=new BehaviorSubject('default message');
  currentMessage=this.messageSource.asObservable();
  private loginAdmin=new BehaviorSubject(0);
  private loginSuperAdmin=new BehaviorSubject(0);
  private ProductCode=new BehaviorSubject(0);
  private loginUser=new BehaviorSubject(1);

  loginAdminTrigger=this.loginAdmin.asObservable();
  loginSuperAdminTrigger=this.loginSuperAdmin.asObservable();

  loginUserTrigger=this.loginUser.asObservable();

  productCodeTrigger=this.ProductCode.asObservable();
  constructor() { }
  changeMessage(message: string)
  {
    this.messageSource.next(message);
  }
  changeProductCode(productCode: number)
  {
    this.ProductCode.next(productCode);
  }
  changeAdmin(Admin: number)
  {
    this.loginAdmin.next(Admin);
  }
  changeSuperAdmin(Admin: number)
  {
    this.loginSuperAdmin.next(Admin);
  }
  changeUser(User: number)
  {
    this.loginUser.next(User);
  }
}
