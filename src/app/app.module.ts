import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { MapProvider } from '../providers/map/map';
import { AuthProvider } from '../providers/auth/auth';
import { IndexProvider } from '../providers/index/index';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    MyApp//,
    //HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp//,
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapProvider,
    AuthProvider,
    IndexProvider,
    //{provide: LocationStrategy, useClass: PathLocationStrategy},
  ]
})
export class AppModule {}
