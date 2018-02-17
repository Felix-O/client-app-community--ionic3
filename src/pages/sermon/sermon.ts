import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

interface sermonType {
    content: any,
    title: any,
    id: any
}

interface mediaType {
    source_url: any
}

@IonicPage({
  segment: 'sermon/:sl'
})
@Component({
  selector: 'page-sermon',
  templateUrl: 'sermon.html',
})
export class SermonPage {

  slug: string = null;
  sermonId: string = null;
  title: string = null;
  sermon: any;
  media: any;
  audio: any;

  constructor(
    protected app: App,
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.slug = this.navParams.get('sl');
    this.title = this.navParams.get('st');
    this.sermonId = this.navParams.get('id');/**/
    let sermonQuery = "?slug=" + this.slug;

    this.wpService.getSermon(sermonQuery).then((sermonData: sermonType) => {
      //console.log(sermonData.content);/**/
      this.sermon = sermonData[0];
      let mediaQuery = "?parent=" + sermonData[0].id;
      this.wpService.getMedia(mediaQuery).then((mediaData: mediaType) => {
        //console.log(mediaData[0].source_url);
        this.media = '<video controls><source src="' + mediaData[0].source_url + '" type="video/mp4"></video>';
      });
    });/**/
  }

}
