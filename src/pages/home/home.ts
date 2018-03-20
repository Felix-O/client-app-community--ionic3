import { Component/*, ViewChild/*, ElementRef/**/ } from '@angular/core';
import { IonicPage, NavController, PopoverController, AlertController/*, Slides/**/ } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
//import { MapProvider } from '../../providers/map/map';
import { IndexProvider } from '../../providers/index/index';
import { AngularFireAuth } from 'angularfire2/auth';
import { PopoverPage } from "../popover/popover";

//declare var google: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //@ViewChild('map') mapRef: ElementRef;
  //@ViewChild(Slides) slides: Slides;
  //gMap: any;
  m1: any;
  m2: any;
  m3: any;
  userData: {};
  gDoc: any;
  loggedIn: boolean;
  profileData: any;

  constructor(/**/
    private afAuth: AngularFireAuth/**/,
    public authService: AuthProvider,
    public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController/**/,
    public alertCtrl: AlertController,
    //public mapPvdr: MapProvider/**/,
    public indexPvdr: IndexProvider/**/) {
  }

  ionViewCanEnter(){
    this.authService.storedUser().then((value) => {
      if(value){
        this.loggedIn = true;
        this.profileData = value;
        //console.log(this.profileData);
      }
      else{
        this.loggedIn = false;
      }
    });
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
      //this.slides.startAutoplay();
  }

  showAlert(m1?, m2?, m3?) {
    m1 = m1 || "...";
    m2 = m2 || "";
    m3 = m3 || "";
    let alert = this.alertCtrl.create({
      title: 'Credentials',
      subTitle: m1 + " " + m2 + " " + m3,
      buttons: ['Dismiss']
    });
    alert.present();
    console.log(m1);
    console.log(m2);
    console.log(m3);
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

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
