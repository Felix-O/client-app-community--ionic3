import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { WpProvider } from '../../providers/wp/wp';

import { PopoverPage } from "../popover/popover";

@IonicPage()
@Component({
  selector: 'page-sermons',
  templateUrl: 'sermons.html',
})
export class SermonsPage {

  sermons: any;
  userQuery: string;
  author: any;
  loading: any;
  loggedIn: boolean;
  profileData: any;

  constructor(
    public wpService: WpProvider,
    public authService: AuthProvider,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
  }

  ionViewCanEnter(){
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

  ionViewDidLoad() {
    this.showLoader();
    this.wpService.loadSermons().then((sermonData) => {
      this.sermons = sermonData;
      console.log(sermonData);
      this.userQuery = "?id=1" /*+ this.sermons.author/**/;

      this.loading.dismiss();

      this.wpService.loadUser(this.userQuery).then((userData) => {
        //console.log(userData[0]);
        this.author = userData[0];
      });/**/
    });
  }

  goToSermon(sermonId, sermonSlug, sermonTitle){
    this.navCtrl.push("SermonPage", {id: sermonId, sl: sermonSlug, st: sermonTitle });
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Loading...'
      });
      this.loading.present();
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
