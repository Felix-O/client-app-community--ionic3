import { Component } from '@angular/core';
import { App, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

//import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';
  //menuButtonColor: string = 'theme';
  isTheme: boolean;
  body: any;
  loading: any;

  constructor(
    protected app: App,
    public afAuth: AngularFireAuth,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //console.log(this.navCtrl._app);
      this.isTheme = true;

      this.getGoogleRedirectResult().then(result => {
        if(result.user){
          this.showLoader();
          var token = result.credential.accessToken;
          this.app.getRootNav().setRoot(this.app.getRootNav().getActive().component);
          console.log("call was made");
        } else {
          console.log("no redirect call was made");
        }
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    });
  }

  ionViewDidLoad(){

    //console.log(this.app);
    /*
    let currentPage = Observable.create((pageName) =>{
      pageName.next("na");/**
      //console.log(this.app.getRootNav());
    });/**/

    //this.isTheme = true;
  }

  /**/
  getGoogleRedirectResult(){
    return this.afAuth.auth.getRedirectResult();
  }

  pushGoogleCredetials(credentials){
    this.authService.googleLogin(credentials)
    .then((googleLoginResult) => {
        console.log(googleLoginResult);
    }, (err) => {
        console.log(err);
    });
  }

  userObject(result){
    return this.body = {
      googleId: result.user.uid,
      googleProfilePic: result.user.photoURL,
      firstname: result.additionalUserInfo.profile.given_name,
      lastname: result.additionalUserInfo.profile.family_name,
      username: result.user.displayName,
      email: result.user.email,
      password: 'bust4all'
    };
  }

  logout(){
    return this.afAuth.auth.signOut();
  }
  /**/

  /**
  get navCtrl(): NavController {
    return this.app.getRootNav();
  }/**/

  goHome(){
    this.app.getRootNav().setRoot('HomePage');
    //this.close();
  }

  goToGroups(){
    this.app.getRootNav().setRoot('GroupsPage');
    //this.close();
  }

  goToEvents(){
    this.app.getRootNav().setRoot('EventsPage');
    //this.close();
  }

  goToWhatToExpect(){
    this.app.getRootNav().setRoot('WhatToExpectPage');
    //this.close();
  }

  goToParacleteProgram(){
    this.app.getRootNav().setRoot('ParacleteProgramPage');
    //this.close();
  }

  goToSermons(){
    this.app.getRootNav().setRoot('SermonsPage');
    //this.close();
  }

  goToTheTeam(){
    this.app.getRootNav().setRoot('TheTeamPage');
    //this.close();
  }

  goToUpdates(){
    this.app.getRootNav().setRoot('UpdatesPage');
    //this.close();
  }

  goToGive(){
    this.app.getRootNav().setRoot('GivePage');
    //this.close();
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Authenticating...'
      });
      this.loading.present();
  }

  /**
  invertMenuButton(){
    this.menuButtonColor = 'dark';
  }
  /**/

}
