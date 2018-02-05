import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
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
  userData: any;

  constructor(
    protected app: App,
    public indexPvdr: IndexProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.username = this.navParams.get('un');
    //console.log(this.username);
    /**/
    this.indexPvdr.getUser(this.username).then( data => {
      this.userData = data[0];
      //console.log(this.userData);
      this.userID = this.userData._id;
      this.firstname = this.userData.firstname;
      this.lastname = this.userData.lastname;
      this.email = this.userData.email;
      this.role = this.userData.role;
    });/**/
  }

}
