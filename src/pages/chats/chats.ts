import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, Events , AlertController} from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { BuddychatPage } from '../../pages/buddychat/buddychat'
import { ChatsProvider } from '../../providers/chats/chats';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myrequests;
  myfriends;

  constructor(public navCtrl: NavController, 
    public requestService: RequestsProvider, 
    public navParams: NavParams, 
    public events: Events, 
    public alertCtrl: AlertController, 
    public chatservice: ChatsProvider,
    public app: App) {
    
  }

  ionViewWillEnter() {
    this.requestService.getmyfriends();

    this.requestService.getmyrequests();


    this.events.subscribe('gotrequests', () =>{
      this.myrequests = [];
      this.myrequests = this.requestService.userdetails;
    });

    this.events.subscribe('friends', () =>{
      this.myfriends = [];
      this.myfriends = this.requestService.myfriends;
    });
  }

  ionViewDidLeave(){
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  accept(item){
    this.requestService.acceptrequest(item).then(() =>{
      let alert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on freind to chat',
        buttons: ['Okay']
      });
      
      alert.present();

    })
  }

  ignore(item){
    this.requestService.deleterequest(item).then(() =>{ 
    }).catch((err) =>{
      alert(err);
    })
  }

  buddychat(buddy){
    this.chatservice.initializebuddy(buddy);
    // this.navCtrl.push(BuddychatPage);
    // this.app.getRootNav().set
    this.app.getRootNav().setRoot(BuddychatPage);
  }
}
