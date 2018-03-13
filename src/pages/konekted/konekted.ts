import { Component } from '@angular/core';
import { IonicPage, App, NavController, Events, NavParams ,LoadingController, AlertController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { GroupsProvider } from '../../providers/groups/groups'
import { RequestsProvider } from '../../providers/requests/requests'
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
import {NewgroupPage} from '../../pages/newgroup/newgroup';

/**
 * Generated class for the KonektedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-konekted',
  templateUrl: 'konekted.html',
})
export class KonektedPage {

  newrequest = {} as connreq;

  filteredusers = [];

  temparr = [];

  allmygroups;

  constructor(public navCtrl: NavController,
    public events: Events,
    public groupsservice: GroupsProvider,
    public app: App,
     public navParams: NavParams, public userservice: UserProvider, public loaddingCtrl:LoadingController, public alertCtrl: AlertController, public requestservice: RequestsProvider) {
    let loader = this.loaddingCtrl.create({
      content: 'Loading all groups'
    });

    loader.present();

    this.userservice.getallusers().then((res: any) =>{
      this.filteredusers = res;
      this.temparr = res;

      loader.dismiss();
    });
  }

  searchuser(searchbar){
    this.filteredusers = this.temparr;

    var q = searchbar.target.value;

    if(q.trim() == ''){
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if((v.displayName.toLowerCase().indexOf(q.toLowerCase())) > -1){
        return true;
      }

      return false;

    })
  }

  sendreq(recipient){
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    
    console.log("Sneder: " + this.newrequest.sender);
    console.log("Receiver: " + this.newrequest.recipient);

    
    if(this.newrequest.sender == this.newrequest.recipient){
      alert('Cant add yourself as a friend');
    }
    else{
      let successAlert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['Ok']
      });

    this.requestservice.sendrequest(this.newrequest).then((res: any) =>{
      if(res.success){
        successAlert.present(); 

        let sentuser = this.filteredusers.indexOf(recipient);
        this.filteredusers.splice(sentuser, 1);
      }
    }).catch((err) =>{
      alert(err);
    })
  }
  }

  addgroup(){
    this.app.getRootNav().push(NewgroupPage);
    // this.navCtrl.push(NewgroupPage);
  }

  ionViewWillEnter(){
    this.groupsservice.getmygroups();
    this.events.subscribe('newgroup' , () =>{
      this.allmygroups = this.groupsservice.mygroups;
    });
  }

  ionViewWillLeave(){
    this.events.unsubscribe('newgroup');
  }

  openchat(group){
    // this.groupsservice.getintogroup(group.groupname);
    // aler
  }
}
