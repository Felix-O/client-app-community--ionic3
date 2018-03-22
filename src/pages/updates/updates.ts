import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PopoverPage } from '../../pages/popover/popover';

/**
 * Generated class for the UpdatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updates',
  templateUrl: 'updates.html',
})
export class UpdatesPage {

  loggedIn: boolean;
  profileData: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public menuCtrl: MenuController,
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
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
