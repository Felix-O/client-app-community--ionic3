import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  constructor(public navCtrl: NavController, public map: MapProvider) {

  }

  ionViewDidLoad(){
      //this.map.showMap(this.mapRef.nativeElement);
  }

  goToLogin(){
    this.navCtrl.setRoot('LoginPage');
  }

}
