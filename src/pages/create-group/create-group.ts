import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

  title: string;
  description: string;

  constructor(
    public groupService: GroupsProvider,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  close(){
    this.viewCtrl.dismiss();
  }

  submitGroup(){
    let group = {
      title: this.title,
      description: this.description
    }
    this.groupService.createGroup(group);
    this.close();
  }

}
