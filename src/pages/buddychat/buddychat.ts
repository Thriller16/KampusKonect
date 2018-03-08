import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, Content } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats/chats';
import firebase from 'firebase';

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

  allmessages = [];


  constructor(public navCtrl: NavController, public zone: NgZone, public navParams: NavParams, public chatservice: ChatsProvider, public events: Events) {
    this.buddy = this.chatservice.buddy;

    this.scrollto();


    this.photoURL = firebase.auth().currentUser.photoURL;
    this.events.subscribe('newmessage', () =>{
      this.allmessages = [];

      this.allmessages = this.chatservice.buddymessages;

      this.scrollto();

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

  sendPicMsg(){

  }
}
