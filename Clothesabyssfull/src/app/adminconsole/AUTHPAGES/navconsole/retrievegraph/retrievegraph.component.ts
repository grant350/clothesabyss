import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrievegraph',
  templateUrl: './retrievegraph.component.html',
  styleUrls: ['./retrievegraph.component.scss']
})
export class RetrievegraphComponent implements OnInit {
  constructor() { }
public graphfound =false
public formname:any;
public graphid:any;
public graphname:any;

  ngOnInit() {
  }

  submit(nameofForm,graphname,graphid){
//check this data to find match and if match output graph
//service.ts to look up graph
//need to make formdata work with sum totals func for form validator
console.log("submit in retreivegraph")
console.log(nameofForm)
console.log(graphname)
console.log(graphid)
if (nameofForm !== undefined || graphname !== undefined || graphid !== undefined){
  //send to service.ts getGraph from graphtable
  // sql graph tables get graphs
}

  }


}
