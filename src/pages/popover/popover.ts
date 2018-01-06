import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController } from 'ionic-angular';

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
    <button ion-item (click)="goToLogin()">Login</button>
`
})
export class PopoverPage {

  constructor(public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {}

  close() {
    this.viewCtrl.dismiss();
  }

  goToLogin(){
    this.modalCtrl.create('LoginPage').present();
    this.viewCtrl.dismiss();
  }
}
