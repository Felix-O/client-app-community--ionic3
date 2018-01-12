import { Component } from '@angular/core';
import { App, IonicPage, ViewController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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
    <button *ngIf ="!loggedIn" ion-item (click)="goToLogin()">Login</button>
    <button *ngIf ="loggedIn" ion-item (click)="logOut()">Logout</button>
`
})
export class PopoverPage {

  loggedIn: boolean;

  constructor(protected app: App,
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
          this.loggedIn = false;
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

  logOut(){
    this.authService.logout();
    //this.loggedIn = false;
    this.app.getRootNav().setRoot('HomePage');
    this.close();
  }

}
