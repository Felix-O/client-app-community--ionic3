import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage({
  defaultHistory: ['register']
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    email: string;
    password: string;
    loading: any;

    constructor( protected app: App,
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      public authService: AuthProvider,
      public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {

        //this.showLoader();

        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            //this.loading.dismiss();
            this.app.getRootNav().setRoot('ProfilePage');
            //this.close();
        }, (err) => {
            console.log("Not already authorized");
            //this.loading.dismiss();
        });

    }

    login(){
        this.showLoader();
        let credentials = {
            email: this.email,
            password: this.password
        };
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            //console.log(result);
            this.app.getRootNav().setRoot('ProfilePage');
            this.close();
        }, (err) => {
            this.loading.dismiss();
            //console.log(err);
        });
    }

    launchSignup(){
        this.navCtrl.push('RegisterPage');
        this.close();
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    }

    close(){
      this.viewCtrl.dismiss();
    }

}
