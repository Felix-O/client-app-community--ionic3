import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, LoadingController, ToastController, ToastOptions, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { GooglePlus } from '@ionic-native/google-plus';

declare var window: any;

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //providers: [GooglePlus]
})
export class LoginPage {

    email: string;
    password: string;
    loading: any;
    user = {} as User;
    body: any;
    toastOptions: ToastOptions;

    constructor(
      private alertCtrl: AlertController,
      protected app: App,
      private aFAuth: AngularFireAuth,
      public toast: ToastController,
      //private googlePlus: GooglePlus,
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

    showAlert(info) {
      let alert = this.alertCtrl.create({
        title: 'Credentials',
        subTitle: info.googleId,
        buttons: ['Dismiss']
      });
      alert.present();
    }

/*
    googleLogin(): void {
      this.googlePlus.login({
        'webClientId': '602320724221-45ne6ra24g7n2b9velck9dv94hlaqghp.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        this.showAlert("this.body");
        console.log(res);
      })
        .catch(err => console.error(err));
    }/**/

    googleLogin(){
      /*if(!<any>window.cordova){
        this.googlePopup();
      } else {/**/
        this.googleRedirect();
      //}
    }

    googlePopup(){
      //return new Promise((resolve, reject) => {
      return  this.aFAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {

          //this.showLoader();

          this.body = {
            googleId: result.user.uid,
            googleProfilePic: result.user.photoURL,
            firstname: result.additionalUserInfo.profile.given_name,
            lastname: result.additionalUserInfo.profile.family_name,
            username: result.user.displayName,
            email: result.user.email,
            password: 'bust4all'
          };

          this.showAlert(this.body);
          /*resolve(result);
        }, (err) => {
          reject(err);/**/
        });
      //});
    }

    googleRedirect(){
      return this.aFAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  		.then(() => {
  			return this.aFAuth.auth.getRedirectResult().then( result => {
  				// This gives you a Google Access Token.
  				// You can use it to access the Google API.
  				let token = result.credential.accessToken;
  				// The signed-in user info.
  				let user = result.user;

          this.body = {
            googleId: result.user.uid,
            googleProfilePic: result.user.photoURL,
            firstname: result.additionalUserInfo.profile.given_name,
            lastname: result.additionalUserInfo.profile.family_name,
            username: result.user.displayName,
            email: result.user.email,
            password: 'bust4all'
          };

  			}).catch(function(error) {
  				// Handle Errors here.
  				this.showAlert(error.message);
  			});
  		});
    }

    pushGoogleCredetials(credentials){
      this.toastA("success").present();
      this.authService.googleLogin(credentials)
      .then((googleLoginResult) => {
          this.loading.dismiss();
          console.log(googleLoginResult);
          this.reloadCurrentPage();
      }, (err) => {
          this.loading.dismiss();
          console.log(err);
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
            //this.app.getRootNav().setRoot('ProfilePage');
            this.reloadCurrentPage();
        }, (err) => {
            this.loading.dismiss();
            //console.log(err);
        });
    }

    toastA(message){
      this.toastOptions = {
        message: message,
        duration: 3000
      }
      return this.toast.create(this.toastOptions);
    }

    reloadCurrentPage(){
      this.app.getRootNav().setRoot(this.app.getRootNav().getActive().component);
      this.close();
    }

    launchSignup(){
        this.app.getRootNav().setRoot('RegisterPage');
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
