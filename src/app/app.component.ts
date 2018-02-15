import { Component } from '@angular/core';
import { App, Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';

//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

//import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';
  //menuButtonColor: string = 'theme';
  isTheme: boolean;

  constructor(
    protected app: App,
    public popoverCtrl: PopoverController,
    //public aFAuth: AngularFireAuth,
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
    });
  }

  ionViewDidLoad(){

    console.log(this.app);

    let currentPage = Observable.create((pageName) =>{
      pageName.next("na");
      //console.log(this.app.getRootNav());
    });

    //this.isTheme = true;
  }

  /**
  googleLogin(){
    this.aFAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.aFAuth.auth.signOut();
  }
  /**/

  /**
  get navCtrl(): NavController {
    return this.app.getRootNav();
  }/**/

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }/**/

  goHome(){
    this.app.getRootNav().setRoot('HomePage');
    //this.close();
  }

  goToGroups(){
    this.app.getRootNav().setRoot('GroupsPage');
    //this.close();
  }

  goToAtivities(){
    this.app.getRootNav().setRoot('ActivitiesPage');
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

  /**
  invertMenuButton(){
    this.menuButtonColor = 'dark';
  }
  /**/

}
