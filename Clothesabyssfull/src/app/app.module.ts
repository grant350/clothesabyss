import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestureConfig } from '@angular/material';


//SERVICES
import { DataService } from './products.service';
import { ServerService } from './server.service';
import { PageHandleService } from './pageHandling.service';
import { FormSubmitting } from './formsubmiting.service';
import { GlobalFormService } from './globalformservice.service';
import {GETDATA} from './getData.service';
import { CartService } from './cartservice.service';
import { AuthInterceptor } from './interceptor.service';
import * as $ from 'jquery';
import 'hammerjs';
import { MaterialModule } from './material.module'

//GUARDS
import { RoleGuard } from './roleroute-guard.service';
import { RoleUser } from './roleroute-guard.service';

// import {  } from './adminconsole/AUTHPAGES/home/home.component';

//PAGES MAIN
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';


import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { MensClothesComponent } from './pages/mens-clothes/mens-clothes.component';
import { WomensClothesComponent } from './pages/womens-clothes/womens-clothes.component';
import { AccessoriesComponent } from './pages/accessories/accessories.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { ListCollectionComponent } from './pages/list-collection/list-collection.component';
import { SearchComponent } from './search/search.component';
import { ImgSizerItemComponent } from './img-sizer-item/img-sizer-item.component';
import { ProductSliderMainComponent } from './product-slider-main/product-slider-main.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { ContainerSlideComponent } from './container-slide/container-slide.component';
import { CatagoryImgsComponent } from './catagory-imgs/catagory-imgs.component';
import { FrowComponent } from './frow/frow.component';
import { CartpageComponent } from './pages/cartpage/cartpage.component';
import { ImageCatagoryCtComponent } from './image-catagory-ct/image-catagory-ct.component';
import { AboutFrow1Component } from './about-frow1/about-frow1.component';
import { AboutFrow2Component } from './about-frow2/about-frow2.component';
import { ProductBannerComponent } from './product-banner/product-banner.component';
import { ProductDropdownSpecComponent } from './product-dropdown-spec/product-dropdown-spec.component';
import { RelatedsliderComponent } from './relatedslider/relatedslider.component';

//FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//PAGE SUCCESS
import { SuccessComponent } from './success/success.component';

//PAYMENT
import { StripeComponent } from './stripe/stripe.component';

//LOGIN SIGNUP
import { LoginComponent } from './pages/accounts/login/login.component';
import { SignupComponent } from './pages/accounts/signup/signup.component';

// import { SalesComponent } from './adminconsole/sales/sales.component';
// import { OtherinfoComponent } from './adminconsole/otherinfo/otherinfo.component';
//delete
import { EmailauthComponent } from './pages/accounts/emailauth/emailauth.component';
//deleete


//ADMIN
import { AdminHomeComponent } from './adminconsole/AUTHPAGES/home/adminhome.component';
import { ProductaddFormComponent } from './adminconsole/AUTHPAGES/DATAFORMS/productadd-form/productadd-form.component';


//ACCOUNT
import { TestaccountspageComponent } from './pages/accounts/testaccountspage/testaccountspage.component';
import { MainsettingsComponent } from './pages/accounts/mainsettings/mainsettings.component';
import { OrdersComponent } from './pages/accounts/orders/orders.component';
import { HistoryComponent } from './pages/accounts/history/history.component';
import { PasswordChangerComponent } from './pages/accounts/password-changer/password-changer.component';
import { VerifycodeComponent } from './pages/accounts/verifycode/verifycode.component';
import { MessageComponent } from './pages/message/message.component';
import { FullbackgroundimageComponent } from './fullbackgroundimage/fullbackgroundimage.component';

//FORMBUILDER
import { FormfieldbuilderComponent } from './formfieldbuilder/formfieldbuilder.component';
import { ListFormComponent } from './dynamicforms/listform/listform.component';
import { CheckboxComponent } from './dynamicforms/checkbox/checkbox.component';
import { GroupcontrolsComponent } from './dynamicforms/groupcontrols/groupcontrols.component';
import { SearchbarComponent } from './dynamicforms/searchbar/searchbar.component';
import { LightboxComponent } from './dynamicforms/lightbox/lightbox.component';
import { ProductlistComponent } from './dynamicforms/productlist/productlist.component';
import { OptionsComponent } from './dynamicforms/options/options.component';
import { SinglecontrolComponent } from './dynamicforms/singlecontrol/singlecontrol.component';
import { SelectlistComponent } from './dynamicforms/selectlist/selectlist.component';
import { FormarrayComponent } from './dynamicforms/formarray/formarray.component';
import { DataFormEditComponent } from './dynamicforms/data-form-edit/data-form-edit.component';


//MAP and GRAPH
import { GeneralmapmakerComponent } from './dataformats/generalmapmaker/generalmapmaker.component';
import { ChartmakerComponent } from './dataformats/chartmaker/chartmaker.component';
import { MappageComponent } from './adminconsole/AUTHPAGES/mappage/mappage.component';
import { ShowmapComponent } from './adminconsole/AUTHPAGES/showdataAPIS/showmap/showmap.component';

//AUTH
import { AuthComponent } from './dynamicforms/auth/auth.component';

//USER PAGES
import { ProductFormPageComponent } from './adminconsole/AUTHPAGES/navconsole/productpage/productpage.component';

//ADMIN
import { SalesDataPageComponent } from './adminconsole/AUTHPAGES/navconsole/sales-data-page/sales-data-page.component';
import { PickDataComponent } from './adminconsole/AUTHPAGES/navconsole/pick-data/pick-data.component';
import { PickGraphComponent } from './dynamicforms/pick-graph/pick-graph.component';

import { MainpageComponent } from './adminconsole/AUTHPAGES/mainpage/mainpage.component';


import { GlobalEditPageComponent } from './adminconsole/AUTHPAGES/navconsole/global-edit-page/global-edit-page.component';
import { GlobalAddPageComponent } from './adminconsole/AUTHPAGES/navconsole/global-add-page/global-add-page.component';

import { MapaddDataComponent } from './adminconsole/AUTHPAGES/navconsole/ADDDATAFOLDER/mapadd-data/mapadd-data.component';
import { SalesdataComponent } from './adminconsole/AUTHPAGES/DATAFORMS/salesdata/salesdata.component';
import { GraphpageComponent } from './adminconsole/AUTHPAGES/navconsole/graphpage/graphpage.component';

import { MakegraphComponent } from './adminconsole/AUTHPAGES/navconsole/makegraph/makegraph.component';
import { RetrievegraphComponent } from './adminconsole/AUTHPAGES/navconsole/retrievegraph/retrievegraph.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductPageComponent,
    MensClothesComponent,
    WomensClothesComponent,
    AccessoriesComponent,
    BoardsComponent,
    CollectionPageComponent,
    ListCollectionComponent,
    SearchComponent,
    ImgSizerItemComponent,
    ProductSliderMainComponent,
    ProductcardComponent,
    ContainerSlideComponent,
    CatagoryImgsComponent,
    FrowComponent,
    ImageCatagoryCtComponent,
    AboutFrow1Component,
    AboutFrow2Component,
    CartpageComponent,
    ProductBannerComponent,
    ProductDropdownSpecComponent,
    RelatedsliderComponent,
    SuccessComponent,
    StripeComponent,
    LoginComponent,
    SignupComponent,
    EmailauthComponent,
    TestaccountspageComponent,
    MainsettingsComponent,
    OrdersComponent,
    HistoryComponent,
    PasswordChangerComponent,
    VerifycodeComponent,
    MessageComponent,
    AdminHomeComponent,
    FullbackgroundimageComponent,
    ProductaddFormComponent,
    ListFormComponent,
    CheckboxComponent,
    FormfieldbuilderComponent,
    GroupcontrolsComponent,
    SearchbarComponent,
    LightboxComponent,
    ProductlistComponent,
    OptionsComponent,
    SinglecontrolComponent,
    GeneralmapmakerComponent,
    ChartmakerComponent,
    SelectlistComponent,
    AuthComponent,
    FormarrayComponent,
    ProductFormPageComponent,
    MappageComponent,
    MainpageComponent,
    ShowmapComponent,
    DataFormEditComponent,
    SalesDataPageComponent,
    PickDataComponent,
    PickGraphComponent,
    GlobalEditPageComponent,
    GlobalAddPageComponent,
    MapaddDataComponent,
    SalesdataComponent,
    GraphpageComponent,
    MakegraphComponent,
    RetrievegraphComponent
  ],

  imports: [
    HammerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule

  ],
  providers: [DataService, CartService, ServerService,GETDATA, FormSubmitting, RoleGuard,RoleUser,
    {
      provide: HAMMER_GESTURE_CONFIG,
       useClass: GestureConfig
    }
    //, {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
