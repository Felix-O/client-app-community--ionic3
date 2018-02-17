import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

interface eventType {
  title: any,
  content: any
}

interface mediaType {
  source_url: any
}

@IonicPage({
  segment: 'event/:sl'
})
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  slug: any;
  event: any;
  media: any;

  constructor(
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.slug = this.navParams.get('sl');
    //console.log(this.slug);
    if(this.slug){
      let eventQuery = "?slug=" + this.slug;
      //console.log(eventQuery);
      this.wpService.loadEvents(eventQuery).then((eventData: eventType) => {
        //console.log(eventData[0]);
        this.event = eventData[0];
        let mediaQuery = "?parent=" + this.event.id;
        this.wpService.getMedia(mediaQuery).then((mediaData: mediaType) => {
          //console.log(mediaData[0]);
          if(mediaData[0].media_type == "image"){
            this.media = '<img style="display: block; width: 100%;" src="' + mediaData[0].source_url + '" />';
          }
          if(mediaData[0].media_type == "video"){
            this.media = '<video style="display: block; width: 100%;" controls ><source src="' + mediaData[0].source_url + '" type="video/mp4"></video>';
          }
        });
      });
    }
  }

}
