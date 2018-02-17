import { Component/*, ViewChild, ElementRef/**/ } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
//import { MapProvider } from '../../providers/map/map';
import { IndexProvider } from '../../providers/index/index';
//import { AngularFireAuth } from 'angularfire2/auth';

//declare var google: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //@ViewChild('map') mapRef: ElementRef;
  //gMap: any;
  userData: {};
  gDoc: any;

  constructor(/**/
    //private aFAuth: AngularFireAuth/**/,
    public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController/**/,
    //public mapPvdr: MapProvider/**/,
    public indexPvdr: IndexProvider/**/) {
    /**
    this.aFAuth.authState.subscribe(data => {
      console.log(data);
    });/**/
  }

  ionViewDidLoad(){
      //this.mapPvdr.showMap(this.mapRef.nativeElement);
      //this.showMap();
      this.indexPvdr.getUsers().then(res => {
        this.userData = res;
        //console.log(res.json());
      });
      this.indexPvdr.getContents().then(res => {
        //console.log(JSON.stringify(res));
        this.gDoc = JSON.stringify(res).substr(1101).slice(0, -1);
      });/**/
  }

  goToUser(userID, firstname, lastname, username, email, role){
    this.navCtrl.setRoot('UserPage', { uid: userID, fn: firstname, ln: lastname, un: username, em: email, rl: role });
  }

  goToSermons(){
    this.navCtrl.setRoot('SermonsPage');
  }

  goToSundayWorship(){
    this.navCtrl.push('EventPage', {
      'sl': 'sunday-worship-service'
    });
  }

}
