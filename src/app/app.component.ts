import { Component, ViewChild } from '@angular/core';
import { App, Platform, PopoverController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

//import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';
  menuButtonColor: string = 'theme';
  //@ViewChild('menuButtonColor') menuButtonColor;

  constructor(
    protected app: App,
    //public navCtrl: NavController,
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
    });
    console.log(this.app.getActiveNav(0));
    /**
    for ( let i=0; i < this.nav.length(); i++ )
      {
          let v = this.nav.getViews()[i];
          /**
          if (v.component.name = 'GroupPage'){
            this.invertMenuButton();
          };
          /**console.log(v.component.name);
      }
    /**/
  }
  /**
  googleLogin(){
    this.aFAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.aFAuth.auth.signOut();
  }
  /**/

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
