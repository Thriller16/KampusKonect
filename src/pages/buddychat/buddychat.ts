import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, LoadingController, NavParams, Content } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats/chats';
import firebase from 'firebase';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';

/**
 * Generated class for the BuddychatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {
  @ViewChild('content') content: Content;


  buddy: any;
  newmessage;
  photoURL
  imgornot;
  allmessages = [];
  
  username;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatsProvider, public zone: NgZone, public events: Events, public imagestore: ImghandlerProvider, public loadingCtrl: LoadingController) {
    this.buddy = this.chatservice.buddy;
    this.username = firebase.auth().currentUser.displayName;

    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () =>{
      this.allmessages = [];

      this.imgornot = [];

      this.zone.run(() =>{
        this.allmessages = this.chatservice.buddymessages;
        for(var key in this.allmessages){
          
          if(this.allmessages[key].message.substring(0, 4) == 'http'){
            this.imgornot.push(true);
          }else{
            this.imgornot.push(false);
          }
        }
      })

    });
  }

  addmessage(){
    this.chatservice.addnewmessage(this.newmessage).then(() =>{
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter(){
    this.chatservice.getbuddymessages();
  }

  scrollto(){
    setTimeout(() =>{
      this.content.scrollToBottom();
    }, 1000);
  }

  sendpicmsg(){
    let loader = this .loadingCtrl.create({
      content: "Please wait"
    });

    loader.present();
    console.log("Loader presented waiting for new line");
    this.imagestore.picmsgstore().then((imgurl) =>{
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() =>{
        this.content.scrollToBottom();
        this.newmessage = '';
      })
    }).catch((err) =>{
      alert(err);
      loader.dismiss();
    })
  }
}
