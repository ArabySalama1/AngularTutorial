import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductdetailGuardGuard } from './product-list/productdetail-guard.guard';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProductGuardGuard } from './edit-product-guard.guard';




const routes: Routes = [{path:'products',component:ProductListComponent},
{path:'productsDetails/:id', canActivate:[ProductdetailGuardGuard],component:ProductDetailComponent},
{path:'product/:id/edit', component:EditProductComponent,canDeactivate:[EditProductGuardGuard]},
{path:'welcome',component:WelcomeComponent},
{path:'login',component:LoginComponent},
{path:'customer',component:CustomerComponent},
{path:'',redirectTo:'welcome',pathMatch:'full'},
{path:'**',redirectTo:'welcome',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
