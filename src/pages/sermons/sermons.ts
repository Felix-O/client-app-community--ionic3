import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

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

  constructor(
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
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
          content: 'Authenticating...'
      });
      this.loading.present();
  }

}
