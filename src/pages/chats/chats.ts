import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events , AlertController} from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
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
  constructor(public navCtrl: NavController, public requestService: RequestsProvider, public navParams: NavParams, public events: Events, public alertCtrl: AlertController) {
    
  }

  ionViewWillEnter() {
    this.requestService.getmyrequests();
    this.events.subscribe('gotrequests', () =>{
      this.myrequests = [];
      this.myrequests = this.requestService.userdetails;
    });
  }

  ionViewDidLeave(){
    this.events.unsubscribe('gotrequests');
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
}
