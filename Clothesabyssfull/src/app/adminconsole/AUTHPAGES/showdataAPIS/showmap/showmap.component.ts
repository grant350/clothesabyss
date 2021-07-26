import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps'

@Component({
  selector: 'app-showmap',
  templateUrl: './showmap.component.html',
  styleUrls: ['./showmap.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ShowmapComponent implements OnInit {
  public map: any;
  public canvas: any;
  constructor() { }





  //
  // createMarker(x, y) {
  //   var popupOffsets = {
  //     top: [0, 0],
  //     bottom: [0, -70],
  //     'bottom-right': [0, -70],
  //     'bottom-left': [0, -70],
  //     left: [25, -35],
  //     right: [-25, -35]
  //   }
  //    var marker = new tt.Marker().setLngLat(speedyPizzaCoordinates).addTo(map);
  //   var popup = new tt.Popup({ offset: popupOffsets }).setHTML("your company name, your company address");
  //   marker.setPopup(popup).togglePopup();
  // }



  ngOnInit() {

    // function getPosition(x, y) {
    //   var marker = new tt.Marker()
    //     .setLngLat([x, y])
    //     .addTo(map);
    // }

try{

var x:any = {
  "key": "C6VAmcmtp72F7NxpulDX7xQDdiEEGTBZ",
  "container": "map",
  "center": [-121.91595, 37.36729],
  "zoom": 15,
  "theme": {
    "style": "http://api.tomtom.com/style/1/sprite/20.3.2-3/sprite@2x.png?key=C6VAmcmtp72F7NxpulDX7xQDdiEEGTBZ&traffic_incidents=incidents_s1&traffic_flow=flow_relative0-dark",
    "layer": "basic",
    "source": "vector"
  }
};
    var map = tt.map(x);
    console.log(map)
    console.log(tt)

    var popupOffsets:any = {
      top: [0, 0],
      bottom: [0, -70],
      'bottom-right': [0, -70],
      'bottom-left': [0, -70],
      left: [25, -35],
      right: [-25, -35]
    }

     var marker = new tt.Marker().setLngLat([-121.91595, 37.36729]).addTo(map);
    var popup = new tt.Popup({ offset: popupOffsets }).setHTML("your company name, your company address");
    marker.setPopup(popup).togglePopup();

}catch{
  console.log("NO MAP AND ERROR")
}
  }


}
