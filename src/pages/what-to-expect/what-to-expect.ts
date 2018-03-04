import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the WhatToExpectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-what-to-expect',
  templateUrl: 'what-to-expect.html',
})
export class WhatToExpectPage {

  loggedIn: boolean;
  profileData: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public popoverCtrl: PopoverController,
    public navParams: NavParams) {
  }

  ionViewCanEnter() {
    this.authService.storedUser().then((value) => {
      if(value){
        this.loggedIn = true;
        this.profileData = value;
        console.log(this.profileData);
      }
      else{
        this.loggedIn = false;
      }
    });
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }/**/

}
