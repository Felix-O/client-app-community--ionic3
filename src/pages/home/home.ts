import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { IndexProvider } from '../../providers/index/index';
import { PopoverController } from 'ionic-angular';

//declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;
  //gMap: any;
  userData;

  constructor(/**/
    public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController/**/,
    public mapPvdr: MapProvider/**/,
    public indexPvdr: IndexProvider/**/) {

  }

  ionViewDidLoad(){
      //this.mapPvdr.showMap(this.mapRef.nativeElement);
      //this.showMap();
      this.indexPvdr.getUsers().then((res) => {
        this.userData = res.json();
        console.log(this.userData);
      });
  }

  goToLogin(){
  }

  goToUser(){
    this.navCtrl.setRoot('UserPage');
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }

/*
  showMap(){
    const location = new google.maps.LatLng(117.1611,32.715736);
    const options = {
      center: location,
      zoom: 10
    }
    this.gMap = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, this.gMap);
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    });
  }/**/

}
