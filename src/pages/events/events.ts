import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

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

  constructor(
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
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

}
