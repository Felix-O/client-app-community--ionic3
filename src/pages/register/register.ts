import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, PopoverController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { PopoverPage } from '../../pages/popover/popover';

@IonicPage({
  name: 'RegisterPage'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  role: string;
  email: string;
  password: string;
  loading: any;

  fn: string;
  ln: string;
  un: string;

  user = {} as User;

  constructor( private aFAuth: AngularFireAuth,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authService: AuthProvider,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
        console.log("Authorized");
        this.authService.storedUser().then((value) => {
          //console.log(value);
          this.navCtrl.setRoot('ProfilePage');
        });
    }, (err) => {
        console.log("You may register");
    });
  }

  async googleRegister(){
    try{
      const result = await this.aFAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(result.user);
    }
    catch (e){
        console.error(e);
    }
  }

  register(){
    this.showLoader();
    let details = {
        firstname: this.fn,
        lastname: this.ln,
        username: this.un,
        email: this.email,
        password: this.password,
        role: this.role
    };
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      //console.log(result);
      this.navCtrl.setRoot('HomePage');
    }, (err) => {
        this.loading.dismiss();
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
