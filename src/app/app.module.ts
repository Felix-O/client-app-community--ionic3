import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { MapProvider } from '../providers/map/map';
import { AuthProvider } from '../providers/auth/auth';
import { IndexProvider } from '../providers/index/index';
import { GroupsProvider } from '../providers/groups/groups';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { WpProvider } from '../providers/wp/wp';
import { PopoverPage } from '../pages/popover/popover';
import { LoginPage } from "../pages/login/login";

//import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
    LoginPage//,
    //HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage,
    LoginPage//,
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    //InAppBrowser,
    MapProvider,
    AuthProvider,
    IndexProvider,
    GroupsProvider,
    WpProvider,
    //{provide: LocationStrategy, useClass: PathLocationStrategy},
  ]
})
export class AppModule {}
