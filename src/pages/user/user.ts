import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'user/:un'
})
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  userID: any;
  firstname: any;
  lastname: any;

  constructor(
    //public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.userID = this.navParams.get('uid');
    this.firstname = this.navParams.get('fn');
    this.lastname = this.navParams.get('ln');
    //console.log(this.user);
  }

/*
  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }/**/

}
