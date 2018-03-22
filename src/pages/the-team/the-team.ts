import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PopoverPage } from '../../pages/popover/popover';

/**
 * Generated class for the TheTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-the-team',
  templateUrl: 'the-team.html',
})
export class TheTeamPage {

  loggedIn: boolean;
  profileData: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams) {
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

  ionViewCanEnter() {
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
