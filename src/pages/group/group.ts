import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the GroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'group/:gt'
})
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  title: string;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('gt');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
