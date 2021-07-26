import { Component, OnInit ,AfterViewInit,ViewChild,ElementRef,Renderer2,DoCheck} from '@angular/core';
import {CartService} from '../../cartservice.service'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss'],
  animations: [
    trigger('toggleCout',[
      state('true', style({ transform: 'translateY(0px)'})),
      state('false', style({ transform: 'translateY(130px)' })),

       transition('false <=> true', animate(140) )

    ])
  ]
})




export class CartpageComponent implements  OnInit, AfterViewInit {

public number:number;
private showmessage:boolean;
public show: boolean = false;
public catagory:any;
public subtotal:any;
public shippingsubtotal:any;

@ViewChild("btnsct", { static: false } as any) btnsct: ElementRef;
@ViewChild("normalPayment", { static: false } as any) normalPayment: ElementRef;
@ViewChild("paypal", { static: false } as any) paypal: ElementRef;
@ViewChild("noitems", { static: false } as any) noitems: ElementRef;


public productObjs:any;

  constructor(public cartservice: CartService, private renderer: Renderer2) {

this.productObjs = this.cartservice.getItems()
console.log(this.productObjs)
var price=[]
this.productObjs.forEach( (item)=>{
  price.push( (item.productPrice * item.selectedQty) )
})
var sum = price.reduce(function(a, b){
return a + b;
}, 0);
this.shippingsubtotal = parseFloat(sum+8.99).toFixed(2);
this.cartservice.total(this.shippingsubtotal)

  }



  up(qty,selectedQty,index) {

    if (selectedQty < qty) {
      selectedQty += 1
    }
    this.productObjs[index].selectedQty = selectedQty

  }
  down(qty,selectedQty,index) {
    if (selectedQty >= 2) {
      selectedQty -= 1
    }
    this.productObjs[index].selectedQty = selectedQty

  }

removeproduct(index){
  const objSpec = this.productObjs[index].productSpec
  console.log(objSpec)
  this.productObjs.splice(index,1)
  this.cartservice.clearProduct(objSpec)

}

  quant(event,qty,current,index){

   const inputValue = event.target.value;
   console.log(inputValue)
console.log(qty)
console.log(current)
console.log(index)
if (inputValue > qty){
  this.productObjs[index].selectedQty = qty
}
else{
  console.log(current)
  this.productObjs[index].selectedQty = inputValue
  var price=[]
  this.productObjs.forEach( (item)=>{
    console.log(item)
    price.push( (item.productPrice * item.selectedQty) )
  })
  var sum = price.reduce(function(a, b){
  return a + b;
  }, 0);
  this.subtotal = sum
  console.log(sum)
}
if (inputValue < 0){
  this.productObjs[index].selectedQty = 1
}
if (inputValue == 0){
  const objSpec = this.productObjs[index].productSpec
  console.log(objSpec)
  this.productObjs.splice(index,1)
  this.cartservice.clearProduct(objSpec)
}
if (this.productObjs.length <=0){
  this.renderer.addClass(this.noitems.nativeElement,"open")
}

this.cartservice.updateInventory(this.productObjs)

  }

paypalcheckout(){
   this.cartservice.checkout()
}

  ngOnInit() {



  }

  showcheckout(event){
    console.log(event.target)
    this.show = !this.show
    console.log(this.show)
  }




  ngAfterViewInit(){
    if (this.productObjs.length <=0){
      this.renderer.addClass(this.noitems.nativeElement,"open")

    }

  }



}
