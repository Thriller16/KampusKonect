import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups'
/**
 * Generated class for the NewgroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newgroup',
  templateUrl: 'newgroup.html',
})
export class NewgroupPage {

  newgroup = {
    groupName: 'GroupName',
    groupPic: '',

  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewgroupPage');
  }

  creategroup(){
    this.groupservice.addgroup(this.newgroup).then(() =>{
      this.navCtrl.pop();
    }).catch((err) =>{
      alert(JSON.stringify(err));
    });
  }

  editgroupname(){
  }

}
