import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, HostListener, ViewChildren, EventEmitter, ViewContainerRef, Input, ViewChild, ElementRef, Renderer2, Output } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from '../products.service'
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { CartService } from '../cartservice.service';
import { ServerService } from '../server.service';


@Component({
  selector: 'app-header',
  host: {
    '(document:click)': 'onClick($event)',
    '(window:resize)': 'pageContainer()'
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  public clicks: number = 0;
  public mobileclicks: number = 0;
  private subscription: Subscription;

  public auth: any = false;
  public authAdmin: any = false;


  public ItemsCount: any = 0
  @ViewChild("dropdownct", { static: false } as any) dropdownct: ElementRef;
  @ViewChild("dropdownbtn", { static: false } as any) dropdownbtn: ElementRef;
  @ViewChild("submenu", { static: false } as any) submenu: ElementRef;

  @ViewChild("iconclose", { static: false } as any) iconclose: ElementRef;
  @ViewChild("iconopen", { static: false } as any) iconopen: ElementRef;
  @ViewChild("#mobilenavHam", { static: false } as any) mobilenavHam: ElementRef;
  @ViewChild("mobileNavWrapper", { static: false } as any) mobileNavWrapper: ElementRef;

  @ViewChild("jsToggleSubmenu", { static: false } as any) jsToggleSubmenu: ElementRef;



  constructor(private elementRef: ElementRef, private router: Router, private activeRoute: ActivatedRoute, public renderer: Renderer2, private cartservice: CartService, private ss: ServerService) {



    this.subscription = router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.navigated()
      });

    console.log(this.cartservice.getCount())
    this.cartservice.getCount().subscribe((d: any) => {
      this.ItemsCount = d;
      console.log(d)
    }
    )
  }

  public pageContainer() {
    this.clicks = 0
    this.mobileclicks = 0
    this.renderer.setStyle(
      this.submenu.nativeElement, "display", "none")
    this.renderer.setStyle(
      this.iconclose.nativeElement, "display", "none");
    this.renderer.setStyle(
      this.iconopen.nativeElement, "display", "block")
    this.renderer.setStyle(
      this.mobileNavWrapper.nativeElement, "display", "none")
  }

  navigated() {
    Promise.resolve().then(() => {
      this.pageContainer()
    })
  }

  onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target))
      this.pageContainer();
  }

  ToggleSubMenu(event) {
    console.log(event)
    console.log(event.target.classList.contains('mobile-nav__return-btn'))
    if (event.target.classList.contains('mobile-nav__return-btn')) {
      this.renderer.removeClass(
        this.jsToggleSubmenu.nativeElement.nextSibling, "js-toggle_submenu-active");
    }
    else {
      this.renderer.addClass(
        this.jsToggleSubmenu.nativeElement.nextSibling, "js-toggle_submenu-active");
      console.log("fowefiowoin")
    }
  }

  DesktopDrpDwm() {
    this.clicks++
    console.log(this.clicks)
    if (this.clicks === 1) {
      this.renderer.setStyle(
      this.submenu.nativeElement, "display", "block")
    }
    if (this.clicks === 2) {
      this.renderer.setStyle(
      this.submenu.nativeElement, "display", "none")
      this.clicks = 0
    }
  }

  MobileNav() {
    this.mobileclicks++


    if (this.mobileclicks === 1) {
      this.renderer.setStyle(
        this.iconclose.nativeElement, "display", "block");
      this.renderer.setStyle(
        this.iconopen.nativeElement, "display", "none")
      this.renderer.setStyle(
        this.mobileNavWrapper.nativeElement, "display", "block")
      this.renderer.removeClass(
        this.jsToggleSubmenu.nativeElement.nextSibling, "js-toggle_submenu-active");


    }
    else {
      this.renderer.setStyle(
        this.iconclose.nativeElement, "display", "none");
      this.renderer.setStyle(
        this.iconopen.nativeElement, "display", "block");
           this.renderer.setStyle(
          this.mobileNavWrapper.nativeElement, "display", "none");
      this.mobileclicks = 0
    }
  }

  logout() {
   this.ss.logout()
  }

  ngOnInit() {
     this.ss.UserView().subscribe((x) => {
      console.log(x);
      this.auth = x
    })
    this.ss.AdminView().subscribe((x) => {
      console.log("header admin view")
     console.log(x);
     this.authAdmin = x
     this.auth = x
     console.log(this.authAdmin)
   })
  }

  ngAfterViewInit() {
    if (window.innerWidth >= 750) {
      this.pageContainer()
      console.log(window.innerWidth)
    }
  }

  ngOnDestroy(): void {
    // this.isau.unsubscribe();
    // this.isauAdmin.unsubscribe();

  }







}
