import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as $ from 'jquery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component'


//USER PAGES
import { ProductPageComponent } from './pages/product-page/product-page.component'
import { AboutComponent } from './pages/about/about.component'
import { ContactComponent } from './pages/contact/contact.component'
import { CollectionPageComponent } from './pages/collection-page/collection-page.component'
import { ListCollectionComponent } from './pages/list-collection/list-collection.component'
import { PageHandleService } from './pageHandling.service'
import { WomensClothesComponent } from './pages/womens-clothes/womens-clothes.component'
import { MensClothesComponent } from './pages/mens-clothes/mens-clothes.component'
import { BoardsComponent } from './pages/boards/boards.component'
import { CartpageComponent } from './pages/cartpage/cartpage.component'
import { SuccessComponent } from './success/success.component'
import { LoginComponent } from './pages/accounts/login/login.component'
import { SignupComponent } from './pages/accounts/signup/signup.component'

//import { ProductFormPageComponent } from './adminconsole/AUTHPAGES/navconsole/productpage/productpage.component';


//accountpages
import { TestaccountspageComponent } from './pages/accounts/testaccountspage/testaccountspage.component'
import { MainsettingsComponent } from './pages/accounts/mainsettings/mainsettings.component';
import { OrdersComponent } from './pages/accounts/orders/orders.component';
import { HistoryComponent } from './pages/accounts/history/history.component';
import { EmailauthComponent } from './pages/accounts/emailauth/emailauth.component';
import { PasswordChangerComponent } from './pages/accounts/password-changer/password-changer.component';
import { VerifycodeComponent } from './pages/accounts/verifycode/verifycode.component';


//ROLE guard
import { RoleUser } from './roleroute-guard.service';
import { RoleGuard } from './roleroute-guard.service';


//ADMIN**
import { AdminHomeComponent } from './adminconsole/AUTHPAGES/home/adminhome.component';
import { ProductaddFormComponent } from './adminconsole/AUTHPAGES/DATAFORMS/productadd-form/productadd-form.component';
import { ProductFormPageComponent } from './adminconsole/AUTHPAGES/navconsole/productpage/productpage.component';
import { MappageComponent } from './adminconsole/AUTHPAGES/mappage/mappage.component';
import { MainpageComponent } from './adminconsole/AUTHPAGES/mainpage/mainpage.component';
import { SalesDataPageComponent } from './adminconsole/AUTHPAGES/navconsole/sales-data-page/sales-data-page.component';
import { PickDataComponent } from './adminconsole/AUTHPAGES/navconsole/pick-data/pick-data.component';
import { MapaddDataComponent } from './adminconsole/AUTHPAGES/navconsole/ADDDATAFOLDER/mapadd-data/mapadd-data.component';


//ADMIN ADD EDIT DATA

import { GlobalEditPageComponent } from './adminconsole/AUTHPAGES/navconsole/global-edit-page/global-edit-page.component';
import { GlobalAddPageComponent } from './adminconsole/AUTHPAGES/navconsole/global-add-page/global-add-page.component';

//DATAFORM COMPONENTS
import { SalesdataComponent } from './adminconsole/AUTHPAGES/DATAFORMS/salesdata/salesdata.component';
import { GraphpageComponent } from './adminconsole/AUTHPAGES/navconsole/graphpage/graphpage.component';

import { MakegraphComponent } from './adminconsole/AUTHPAGES/navconsole/makegraph/makegraph.component';
import { RetrievegraphComponent } from './adminconsole/AUTHPAGES/navconsole/retrievegraph/retrievegraph.component';





const routes: Routes = [
  //USER PAGES
  { path: '', component: HomeComponent },
  { path: 'pages/about', component: AboutComponent },
  { path: 'pages/contact', component: ContactComponent },
  { path: 'pages/mens-clothes', component: MensClothesComponent },
  { path: 'pages/womens-clothes', component: WomensClothesComponent },
  { path: 'pages/boards', component: BoardsComponent },
  { path: 'pages/collection-page/:productcat', component: CollectionPageComponent },
  { path: 'pages/product-page/:productid', component: ProductPageComponent },
  { path: 'pages/cartpage', component: CartpageComponent },
  { path: 'success?', component: SuccessComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'pages/login', component: LoginComponent },
  { path: 'pages/signup', component: SignupComponent },




  {
path: 'adminconsole/AUTHPAGES', component: AdminHomeComponent, canActivate: [RoleGuard], children: [
      { path: 'console', component: MainpageComponent },
      { path: 'productpage', component: ProductFormPageComponent },
      { path: 'SalesData', component: SalesDataPageComponent },
      { path: 'PickData', component: PickDataComponent },
      { path: 'GRAPHINGPAGE', component: GraphpageComponent , children: [
        { path: 'makegraph', component: MakegraphComponent },
        { path: 'retrievegraph', component: RetrievegraphComponent }
      ]}

    ]
},


  /* ---------
  MAIN EDIT AND ADD FORMS
  -----------*/
  { path: 'adminconsole/AUTHPAGES/DATAFORMS/GlobalEditPage', component: GlobalEditPageComponent, canActivate: [RoleGuard] },

  {
    path: 'adminconsole/AUTHPAGES/DATAFORMS/GlobalAddPage', component: GlobalAddPageComponent, canActivate: [RoleGuard]
  },

      /*DATA FORMS*/
      { path: 'adminconsole/AUTHPAGES/DATAFORMS/GlobalAddPage/SALESDATAFORM', component: SalesdataComponent, canActivate: [RoleGuard]
      },
      { path: 'adminconsole/AUTHPAGES/DATAFORMS/GlobalAddPage/PRODUCTFORM', component: ProductaddFormComponent, canActivate: [RoleGuard]
      },



      /*END OF DATA FORMS*/





  /* ---------
  END OF MAIN EDIT AND ADD FORMS
  -----------*/





  {
    path: 'pages/testaccountspage', component: TestaccountspageComponent, canActivate: [RoleUser], children: [
      { path: 'mainsettings', component: MainsettingsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'history', component: HistoryComponent }

    ]
  },
  { path: '**', redirectTo: 'HomeComponent' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
