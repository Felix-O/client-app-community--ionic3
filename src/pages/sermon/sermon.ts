import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

interface sermonType {
    content: any
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
  sermonContents: any;
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
    console.log(this.slug);
    this.title = this.navParams.get('st');
    this.sermonId = this.navParams.get('id');/**/
    let sermonQuery = "/" + this.sermonId;
    if(!this.sermonId){
      this.app.getRootNav().setRoot('SermonsPage');
    }
    else{
      this.wpService.getSermon(sermonQuery).then((data: sermonType) => {
        //console.log(data.content);/**/
        this.sermonContents = data.content.rendered;
      });/**/
      let mediaQuery = "?parent=" + this.sermonId;
      this.wpService.getMedia(mediaQuery).then((mediaData: mediaType) => {
        //console.log(mediaData[0].source_url);
        this.media = mediaData[0].source_url;
        this.audio = '<source src="' + this.media + '" type="video/mp4">';
      });
    }
  }

}
