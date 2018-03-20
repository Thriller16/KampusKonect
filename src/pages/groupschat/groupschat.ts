import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import firebase from 'firebase';
/**
 * Generated class for the GroupschatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupschat',
  templateUrl: 'groupschat.html',
})
export class GroupschatPage {

  owner: boolean = false;
  groupName;

  
  constructor(public navCtrl: NavController, public groupservice: GroupsProvider,public navParams: NavParams, public actionsheet: ActionSheetController) {

    this.groupName = this.navParams.get('groupName');
    
    this.groupservice.getownership(this.groupName).then((res) =>{
      
      if(res){
        this.owner = true;
        // console.log();
      }
    }).catch((err) =>{
      alert(err);
    })


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupschatPage');
    // console.log("Owener is " + this.fireowner);
  }

  presentOwnerSheet(){

    firebase.auth().currentUser
    let sheet = this.actionsheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () =>{
            this.navCtrl.push('GroupbuddiesPage')
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () =>{
            this.navCtrl.push('GroupbuddiesPage')
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () =>{
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName})
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () =>{
            // this.groupservice.deletegroup();
          }

        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () =>{
            // this.navCtrl.push('Groupbuddiespage')
            console.log("Cancelled");
          }
        } 
      ]
    })
    sheet.present();
  }

  presentMembersSheet(){
    let sheet = this.actionsheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          handler: () =>{
            this.navCtrl.push('GroupbuddiesPage');
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () =>{
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName})
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () =>{
            // this.navCtrl.push('Groupbuddiespage')
            console.log("Cancelled");
          }
        } 

      ]
    })

    sheet.present();
  }

}
