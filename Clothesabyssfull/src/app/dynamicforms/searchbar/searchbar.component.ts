import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor() { }


searchFilter(searchQuery,options){




  var searchqueary="2";
var sortby="productID";
var relatedAnswerResults=[]
var products=[
  {
  	"productID":1,
    "tite":"super long surfboard 40inch",
    "type":"mainslider",
    "varients":[{"SPECID":"1_01"},{"SPECID":"1_02"}]
  },
    {
  	"productID":2,
    "tite":"super short surfboard 80inch",
    "type":"mainslider",
          "varients":[{"SPECID":"2_01"},{"SPECID":"2_02"}]
  }
];

//equal to
//append to related answers

//run all of them functions
//up to 15 results at most;

try{
var searchResult = products.filter( i =>
i[sortby].toString() === searchqueary.toString()
)
searchResult.forEach((item)=>{
relatedAnswerResults.push(item)
})
}
catch{
console.log("couldnot equal searchquery moving on")
}






}


  ngOnInit() {



  }

}
