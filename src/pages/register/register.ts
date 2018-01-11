import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PopoverController } from 'ionic-angular';

@IonicPage({
  name: 'register'
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

  constructor(public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController,
    public authService: AuthProvider,
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
      console.log(result);
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
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }

}
