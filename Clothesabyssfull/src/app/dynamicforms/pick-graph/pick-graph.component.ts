import { Component, OnInit,Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery' ;
import  {  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-pick-graph',
  templateUrl: './pick-graph.component.html',
  styleUrls: ['./pick-graph.component.scss']
})
export class PickGraphComponent implements OnInit,AfterViewInit {
@Input() graphtype:any;
@Input() items:any;
@Input() arraykeys:Array<string>;
  constructor() { }
//get input on type of graph
//makegraph with chartjs
ngOnInit(){
  console.log(this.arraykeys)
  try{
  this.items = JSON.parse(this.items)
  }catch{
    console.log("could not parse")
  }
}


changeFilteredTime(){

//reset graph


}


ngAfterViewInit() {
console.log(this.arraykeys)
console.log(this.arraykeys)
console.log(this.arraykeys)
var that=this;




function calculateNums(amounts,dateDtype){
  function sumInDateRange(){

  }

  amounts.forEach(item=>{
    console.log(that.arraykeys)
    console.log(item)
    console.log(that.arraykeys)
    Object.keys(item).forEach((k)=>{
      if (that.arraykeys.indexOf(k)){
        console.log("val with date")
        //{"date":"","val":222.32}
      }
    })
  })

  if (amounts.length >= 1){
  var arrayofnums=[]
  if (amounts[0]['DATADATE'] || amounts[0]['datadate']){
  if (dateDtype == "1y"){
    amounts.forEach((i)=>{
      console.log(i)
    })
  }
  if (dateDtype == "1m"){}
  if (dateDtype == "7d"){}
  if (dateDtype == "24hr"){}



  }
  return arrayofnums

}else{return "error no length"}




}
var newdata =  calculateNums(that.items,'7d')
//need lots of fixing
//collect all june1st sales and sum()\

  var myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: ["June 1st", "June 2nd", "June 3nd", "June 4th", "June 5th", "June 6th", "June 7th"],
        datasets: [{
            data: [0,44,32,11,22,92,23],
            label: 'SALESFORM',
            backgroundColor: '#3e95cd',
            borderColor: "#7bb6dd",
             fill: false,
             cubicInterpolationMode: 'monotone',

          }





        ]
      }
        });
        // let el2 = document.createElement('script');
        // el2.setAttribute('src', '../../assets/chart.js');
        // document.body.appendChild(el2);
  }



}
