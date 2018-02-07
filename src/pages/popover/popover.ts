import { Component } from '@angular/core';
import { App, IonicPage, ViewController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
//import { HomePage } from '../home/home';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  template: `
    <ion-item-group style="padding-left: 15px;">
    <button class="popdrop" ion-item (click)="goHome()"><ion-icon name="home" color="theme2"></ion-icon>&nbsp;&nbsp;&nbsp;Home</button>
    <button class="popdrop" *ngIf ="loggedIn" ion-item (click)="goToProfile()"><ion-icon name="person" color="theme2"></ion-icon>&nbsp;&nbsp;&nbsp;Profile</button>
    <button class="popdrop" *ngIf ="!loggedIn" ion-item (click)="goToRegister()"><ion-icon name="mail" color="theme2"></ion-icon>&nbsp;&nbsp;&nbsp;Register</button>
    <button class="popdrop" *ngIf ="!loggedIn" ion-item (click)="goToLogin()"><ion-icon name="lock" color="theme2"></ion-icon>&nbsp;&nbsp;&nbsp;Login</button>
    <button class="popdrop" *ngIf ="loggedIn" ion-item (click)="logOut()"><ion-icon name="lock" color="theme2"></ion-icon>&nbsp;&nbsp;&nbsp;Logout</button>
    </ion-item-group>
`
})
export class PopoverPage {

  loggedIn: boolean;

  constructor(
    protected app: App,
    private aFAuth: AngularFireAuth,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public authService: AuthProvider) {
      //Check if already authenticated
      this.authService.checkAuthentication().then((res) => {
          this.authService.storedUser().then((value) => {
            if(value){
              this.loggedIn = true;
            }
          });
      }, (err) => {
          this.aFAuth.authState.subscribe(data => {
            if(data){
              this.loggedIn = true;
            }else{
              this.loggedIn = false;
            }
          });
          //this.loggedIn = false;
      });/**/

  }

  ionViewWillAppear() {

  }

  close() {
    this.viewCtrl.dismiss();
  }

  goToLogin(){
    this.modalCtrl.create('LoginPage').present();
    this.close();
  }

  goHome(){
    this.app.getRootNav().setRoot('HomePage');
    this.close();
  }

  goToRegister(){
    this.app.getRootNav().setRoot('RegisterPage');
    this.close();
  }

  goToProfile(){
    this.app.getRootNav().setRoot('ProfilePage');
    this.close();
  }

  logOut(){
    this.authService.logout();
    this.aFAuth.auth.signOut();
    //this.loggedIn = false;
    this.app.getRootNav().setRoot('HomePage');
    this.close();
  }

}
