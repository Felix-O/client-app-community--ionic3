import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { IndexProvider } from '../../providers/index/index';

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
  username: any;
  email: any;
  role: any;

  constructor(
    public indexPvdr: IndexProvider,
    public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.userID = this.navParams.get('uid');
    this.firstname = this.navParams.get('fn');
    this.lastname = this.navParams.get('ln');

    this.username = this.navParams.get('un');
    /*this.indexPvdr.getUser(this.username).then(res => {
      //this.userData = res;
      console.log(res);
    });/**/

    this.email = this.navParams.get('em');
    this.role = this.navParams.get('rl');
    //sconsole.log(this.username);
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }/**/

}
