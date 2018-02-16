import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage({
  segment: 'sermon/:st'
})
@Component({
  selector: 'page-sermon',
  templateUrl: 'sermon.html',
})
export class SermonPage {

  sermonId: string = null;
  title: string = null;
  content: any;
  media: any;
  audio: any;

  constructor(
    protected app: App,
    public wpService: WpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('st');
    this.sermonId = this.navParams.get('id');/**/
    let sermonQuery = "/" + this.sermonId;
    if(!this.sermonId){
      this.app.getRootNav().setRoot('SermonsPage');
    }
    else{
      this.wpService.getSermon(sermonQuery).then( data => {
        //console.log(data.content);/**/
        //this.content = data.content.rendered;
      });/**/
      let mediaQuery = "?parent=" + this.sermonId;
      this.wpService.getMedia(mediaQuery).then((mediaData) => {
        //console.log(mediaData.source_url);
        //this.media = mediaData.source_url;
        //this.audio = '<video controls><source src={{media?.source_url}} type="video/mp4"></video>';
      });
    }
  }

}
