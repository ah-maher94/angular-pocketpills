import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { TopBarComponent } from './components/shared/header/top-bar/top-bar.component';
import { MenuBarComponent } from './components/shared/header/menu-bar/menu-bar.component';
import { IdentityBarComponent } from './components/shared/header/identity-bar/identity-bar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddCatagoryComponent } from './components/admin-components/add-catagory/add-catagory.component';
import { AddDepartmentComponent } from './components/admin-components/add-department/add-department.component';
import { AddEmployerComponent } from './components/admin-components/add-employer/add-employer.component';
import { AddProductComponent } from './components/admin-components/add-product/add-product.component';
import { CreateAccountComponent } from './components/admin-components/create-account/create-account.component';
import { DashboardComponent } from './components/admin-components/dashboard/dashboard.component';
import { NavComponent } from './components/admin-components/nav/nav.component';
import { ProfileComponent } from './components/admin-components/profile/profile.component';
import { StuffComponent } from './components/admin-components/stuff/stuff.component';
import { AdminFooterComponent } from './components/admin-components/admin-footer/admin-footer.component';
import { AdminProductsComponent } from './components/admin-components/admin-products/admin-products.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CategoryPipe } from './category.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { SuperAdminNavComponent } from './components/superAdmincomponent/super-admin-nav/super-admin-nav.component';
import { SuperDashboardComponent } from './components/superAdmincomponent/super-dashboard/super-dashboard.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    MenuBarComponent,
    IdentityBarComponent,
    FooterComponent,
    HomepageComponent,
    CategoriesComponent,
    PharmaciesComponent,
    ProductsComponent,
    ContactUsComponent,
    AboutUsComponent,
    OrdersComponent,
    AddCatagoryComponent,
    AddDepartmentComponent,
    AddEmployerComponent,
    AddProductComponent,
    CreateAccountComponent,
    DashboardComponent,
    NavComponent,
    ProfileComponent,
    StuffComponent,
    AdminFooterComponent,
    AdminProductsComponent,
    CategoryPipe,
    LoginComponent,
    RegisterComponent,
    SingleProductComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    SuperAdminNavComponent,
    SuperDashboardComponent,
    ProductSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
