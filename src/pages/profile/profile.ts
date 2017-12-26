import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  _id: string = null;
  role: string = null;
  email: string = null;
  password: string = null;
  loading: any;

  fn: string = null;
  ln: string = null;
  un: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
        console.log("Authorized");
        this.authService.storedUser().then((value) => {
          //console.log(value);
          this.showData(value);
        });
    }, (err) => {
        console.log("Not Authorized");
        this.navCtrl.setRoot('LoginPage');
    });
  }

  showData(userData: any){
      this._id = userData._id;
      this.fn = userData.firstname;
      this.ln = userData.lastname;
      this.un = userData.username;
      this.email = userData.email;
      this.password = userData.password;
      this.role = userData.role;
  }

  loggingOut(){
    this.authService.logout();
    this.navCtrl.setRoot('LoginPage');
  }

  update(){

    let details = {
        _id : this._id,
        firstname: this.fn,
        lastname: this.ln,
        username: this.un,
        email: this.email,
        password: this.password,
        role: this.role
    };

    this.authService.updateAccount(details);
  }

  delete(){
    this.authService.deleteAccount();
  }

}
