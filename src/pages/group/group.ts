import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GroupsProvider } from '../../providers/groups/groups';
import { Group } from '../../models/group';
//import { IndexProvider } from '../../providers/index/index';

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
  userId: string = null;
  groupId: string = null;
  title: string = null;
  description: any = null;
  group = {} as Group;

  constructor(
    protected app: App,
    public storage: Storage,
    public groupService: GroupsProvider,
    //public indexService: IndexProvider/**/,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('gt');
    this.groupId = this.navParams.get('id');/**/
    if(!this.groupId){
      this.app.getRootNav().setRoot('GroupsPage');
    }
    else{
      this.storage.get('user').then(data => {
        if(data){
          this.role = data.role;
          //console.log(data);
        }
      });

      this.groupService.getGroup(this.groupId).then( data => {
        //this.group = data;
        console.log(data.title);
        //this.description = this.group.description;
      });/**

      this.groupService.getUsers(this.groupId).then( users => {
        console.log(users);
      });/**/
    }
  }

  updateTitle() {
    if(this.role = "Admin"){
      let data = {
        _id: this.groupId,
        title: this.title
      }
      this.groupService.updateGroupTitle(data);
    }
  }

  updateDescription() {
    if(this.role = "Admin"){
      let data = {
        _id: this.groupId,
        description: this.description
      };
      this.groupService.updateGroupDescription(data);
    }
  }

  joinGroup(){
    this.groupId = this.navParams.get('id');
    this.storage.get('user').then(data => {
      if(data){
        this.userId = data._id;
        //console.log(this.userId); /**
        this.groupService.joinGroup(this.groupId, this.userId).then(res => {
          console.log(res);
        });/**/
      }
    });
  }

  leaveGroup(){
    this.groupId = this.navParams.get('id');
    this.storage.get('user').then(data => {
      if(data){
        this.userId = data._id;
        //console.log(this.userId); /**
        this.groupService.joinGroup(this.groupId, this.userId).then(res => {
          console.log(res);
        });/**/
      }
    });
  }

  deleteGroup(){
    this.groupService.deleteGroup(this.groupId);
    this.close();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
