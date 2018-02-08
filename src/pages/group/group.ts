import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the GroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'group/:gt'
})
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  role: string = "none";
  _id: string = null;
  title: string = null;
  description: any = null;

  constructor(
    public storage: Storage,
    public groupService: GroupsProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.storage.get('user').then(data => {
      if(data){
        this.role = data.role;
      }
    });
    this.title = this.navParams.get('gt');
    this._id = this.navParams.get('id');/**/
    if(this._id){
      let body = this._id;
    }
    else {
      let body = this.title;
    }/**/
    //console.log(body);/**/
    this.groupService.getGroup(body).then( data => {
      this.description = data.description;
      console.log(data.description);
    });/**/
  }

  updateTitle() {
    if(this.role = "Admin"){
      let data = {
        _id: this._id,
        title: this.title
      }
      this.groupService.updateGroupTitle(data);
    }
  }

  updateDescription() {
    if(this.role = "Admin"){
      let data = {
        _id: this._id,
        description: this.description
      }
      this.groupService.updateGroupDescription(data);
    }
  }

  deleteGroup(){
    this.groupService.deleteGroup(this._id);
    this.close();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
