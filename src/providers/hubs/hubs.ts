import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events} from 'ionic-angular';
/*
  Generated class for the HubsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HubsProvider {

  firehub = firebase.database().ref('/hubs');

  myhubs: Array<any> = [];


  constructor(public events: Events) {
    console.log('Hello HubsProvider Provider');
  }

  addhub(newHub){
    var promise = new Promise((resolve, reject) =>{
      this.firehub.child(firebase.auth().currentUser.uid).child(newHub.hubName).set({
        hubimage: newHub.hubPic,
        msgboard: '',
        owner: firebase.auth().currentUser.uid
      }).then(() =>{
        resolve(true);
      }).catch((err) =>{
        reject((err) =>{
        })
      })
    });

    return promise;
  }

  getmyhubs(){
    this.firehub.child(firebase.auth().currentUser.uid).on('value', (snapshot) =>{
      this.myhubs = [];

      if(snapshot.val() != null){
        var temp = snapshot.val();
        for(var key in temp){

          let newHub = {
            hubName: key,
            hubimage: temp[key].hubimage
            }

          this.myhubs.push(newHub)
            
          }

      }

      this.events.publish('newhub');
    })
  }

}
