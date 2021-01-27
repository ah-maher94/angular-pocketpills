import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { ProductsComponent } from './components/products/products.component';
import {AdminProductsComponent} from './components/admin-components/admin-products/admin-products.component';
import {CreateAccountComponent} from './components/admin-components/create-account/create-account.component';
import {StuffComponent} from './components/admin-components/stuff/stuff.component';
import {AddEmployerComponent} from './components/admin-components/add-employer/add-employer.component';
import {AddDepartmentComponent} from './components/admin-components/add-department/add-department.component';
import {AddProductComponent} from './components/admin-components/add-product/add-product.component';
import {AddCatagoryComponent} from './components/admin-components/add-catagory/add-catagory.component';
import {ProfileComponent} from './components/admin-components/profile/profile.component';
import {DashboardComponent} from './components/admin-components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { SuperDashboardComponent } from './components/superAdmincomponent/super-dashboard/super-dashboard.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'home', component: HomepageComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'contact', component: ContactUsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'pharmacies', component: PharmaciesComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'products', component: ProductsComponent},
  {path:"create-account", component:CreateAccountComponent},
  { path:"stuff",component:StuffComponent},
  {path:"add-employer",component:AddEmployerComponent},
  { path:'add-department',component:AddDepartmentComponent},
  {path:'admin-products',component:AdminProductsComponent },
  {path:'add-product',component:AddProductComponent},
  {path:'add-catagory',component:AddCatagoryComponent},
  {path:'profile',component:ProfileComponent},
  {path:'dashboard',component:DashboardComponent },
  {path:'superdashboard',component:SuperDashboardComponent },
  {path:'product',component:SingleProductComponent },
  {path:'shopping-cart',component:ShoppingCartComponent },
  {path:'order-success',component:OrderSuccessComponent },
  {path:'products/search',component:ProductSearchComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
