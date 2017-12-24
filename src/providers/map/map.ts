import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapProvider {

  //@ViewChild('map') mapRef: ElementRef;
  gMap: any;

  constructor() {
  }

  showMap(mapRef: ElementRef){
    const location = new google.maps.LatLng(117.1611,32.715736); 

    const options = {
      center: location,
      zoom: 10
    }

    this.gMap = new google.maps.Map(mapRef, options);

    this.addMarker(location, this.gMap);
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    });
  }

}
