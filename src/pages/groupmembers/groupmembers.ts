import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups'  
/**
 * Generated class for the GroupmembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupmembers',
  templateUrl: 'groupmembers.html',
})
export class GroupmembersPage {
groupmembers;
tempgroupmembers;
  constructor(public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams, public groupservice: GroupsProvider) {
  }


  ionViewWillEnter(){
    this.groupmembers = this.groupservice.currentgroup;
    this.tempgroupmembers = this.groupmembers;
    this.events.subscribe('gotintogroup', () =>{
      this.groupmembers = this.groupservice.currentgroup;
      this.tempgroupmembers = this.groupmembers;
    })
  }

  ionViewWillLeave(){
    this.events.unsubscribe('gotintogroup')
  }

  searchuser(searchbar){
    let tempmembers = this.tempgroupmembers;

    var q = searchbar.target.value;

    if(q.trim() === ''){
      this.groupmembers = this.tempgroupmembers;
      return;
    }

    tempmembers = tempmembers.filter((v) => {
      if(v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      return false;
    })

    this.groupmembers = tempmembers;
  }

  removemembers(member){
    this.groupservice.deletemember(member);
  }

}
