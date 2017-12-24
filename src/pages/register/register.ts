import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
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

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {

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

}
