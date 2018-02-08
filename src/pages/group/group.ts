import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  _id: string;
  title: string;
  desciption: string;

  constructor(
    public groupService: GroupsProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this._id = this.navParams.get('id');
    console.log(this._id);
    this.title = this.navParams.get('gt');
    this.desciption = this.navParams.get('ds');
  }

  updateGroupTitle(newTitle) {
    let data = {
      title: newTitle
    }
    this.groupService.updateGroup(data);
  }

  deleteGroup(){
    this.groupService.deleteGroup(this._id);
    this.close();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
