import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { PopoverController } from 'ionic-angular';
//import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  constructor(
    public popoverCtrl: PopoverController,
    public navCtrl: NavController, public map: MapProvider) {

  }

  ionViewDidLoad(){
      //this.map.showMap(this.mapRef.nativeElement);
  }

  goToLogin(){
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }

}
