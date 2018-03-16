import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { WpProvider } from '../../providers/wp/wp';
import { PopoverPage } from "../popover/popover";

interface eventType {

}

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: any;
  loading: any;
  loggedIn: boolean;
  profileData: any;

  constructor(
    public wpService: WpProvider,
    public authService: AuthProvider,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
  }

  ionViewCanEnter(){
    this.authService.storedUser().then((value) => {
      if(value){
        this.loggedIn = true;
        this.profileData = value;
        console.log(this.profileData);
      }
      else{
        this.loggedIn = false;
      }
    });
  }

  ionViewDidLoad() {

    this.showLoader();
    let eventQuery = "";
    this.wpService.loadEvents(eventQuery).then((eventData: eventType) => {

      this.loading.dismiss();

      console.log(eventData);
      this.events = eventData;
    });
  }

  goToEvent(eventId, eventSlug, eventTitle){
    this.navCtrl.push("EventPage", {id: eventId, sl: eventSlug, t: eventTitle });
  }

  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Loading...'
      });
      this.loading.present();
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
