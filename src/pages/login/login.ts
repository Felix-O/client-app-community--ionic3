import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { GooglePlus } from '@ionic-native/google-plus';

//declare window: any;

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



    constructor( protected app: App,
      private aFAuth: AngularFireAuth,
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

        /**
        window.plugins.googleplus.login({
          'webClientId': '602320724221-45ne6ra24g7n2b9velck9dv94hlaqghp.apps.googleusercontent.com',
          'offline': true
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
        /**/
    }

    googleLogin2(){
      this.aFAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {

        this.showLoader();

        let credentials = {
          googleId: result.user.uid,
          googleProfilePic: result.user.photoURL,
          firstname: result.additionalUserInfo.profile.given_name,
          lastname: result.additionalUserInfo.profile.family_name,
          username: result.user.displayName,
          email: result.user.email,
          password: 'bust4all'
        };

        this.authService.googleLogin(credentials)
        .then((googleLoginResult) => {
            this.loading.dismiss();
            console.log(googleLoginResult);
            //this.app.getRootNav().setRoot('ProfilePage');
            this.close();
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
      });
    }

    googleLogin(){
        this.aFAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {

          this.showLoader();

          let credentials = {
            googleId: result.user.uid,
            googleProfilePic: result.user.photoURL,
            firstname: result.additionalUserInfo.profile.given_name,
            lastname: result.additionalUserInfo.profile.family_name,
            username: result.user.displayName,
            email: result.user.email,
            password: 'bust4all'
          };

          await this.authService.googleLogin(credentials)
          .then((googleLoginResult) => {
              this.loading.dismiss();
              console.log(googleLoginResult);
              this.close();
          }, (err) => {
              this.loading.dismiss();
              console.log(err);
          });
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
            this.close();
        }, (err) => {
            this.loading.dismiss();
            //console.log(err);
        });
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
