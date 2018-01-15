import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PopoverController } from 'ionic-angular';

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

  constructor(public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
        //console.log("Authorized");
        this.authService.storedUser().then((value) => {
          //console.log(value);
          this.showData(value);
        });
    }, (err) => {
        //console.log("Not Authorized");
        this.navCtrl.setRoot('HomePage');
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
    this.navCtrl.setRoot('HomePage');
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
    this.navCtrl.setRoot('HomePage');
  }

  delete(){
    this.authService.deleteAccount(this._id);
    //console.log(this._id);
    this.navCtrl.setRoot('HomePage');
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }

}
