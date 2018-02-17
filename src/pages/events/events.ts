import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let eventQuery = "";
    this.wpService.loadEvents(eventQuery).then((eventData: eventType) => {
      console.log(eventData);
      this.events = eventData;
    });
  }

  goToEvent(eventId, eventSlug, eventTitle){
    this.navCtrl.push("EventPage", {id: eventId, sl: eventSlug, t: eventTitle });
  }

}
