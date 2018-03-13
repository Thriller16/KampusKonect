import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events} from 'ionic-angular';

/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupsProvider {

  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = [];

  constructor(public events: Events) {
    console.log('Hello GroupsProvider Provider');
  }

  addgroup(newGroup){
    var promise = new Promise((resolve, reject) =>{
      this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
        groupimage: newGroup.groupPic,
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

  getmygroups(){
    this.firegroup.child(firebase.auth().currentUser.uid).on('value', (snapshot) =>{
      this.mygroups = [];

      if(snapshot.val() != null){
        var temp = snapshot.val();
        for(var key in temp){

          let newgroup = {
            groupName: key,
            groupimage: temp[key].groupimage
            }

          this.mygroups.push(newgroup)
            
          }

      }

      this.events.publish('newgroup');
    })
  }
}
