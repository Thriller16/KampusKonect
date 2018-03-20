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
  currentgroup: Array<any> = [];
  currentgroupname;
  grouppic;

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

  getintogroup(groupname){
    
    if(groupname != null){
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) =>{

        if(snapshot.val() != null){
          var temp = snapshot.val().members;
          this.currentgroup = [];

          for(var key in temp){
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupname = groupname;
          this.events.publish('gotintogroup');
        }
      })
      console.log("The groupname is: " + groupname);
    }
  }



  getownership(groupname){
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) =>{

        var temp = snapshot.val().owner;
        if(temp = firebase.auth().currentUser.uid){
          resolve(true);
          alert("Has gotten ownership of the group");
        }else{
          resolve(false);
        }
      }).catch((err) =>{
        reject(err);
      })
    }); 

    return promise;
  }

  getgroupimage(){
    var promise = new Promise((resolve, reject) =>{
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) =>{
        this.grouppic = snapshot.val().groupimage;

        resolve(true);
      })
    })

    return promise;
  }

  addmember(newmember){
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').push(newmember).then(() =>{
      this.getgroupimage().then(() =>{
        this.firegroup.child(newmember.uid).child(this.currentgroupname).set({
          groupimage: this.grouppic,
          owner: firebase.auth().currentUser.uid,
          msgboard: ''
        }).catch((err) => {
          console.log(err);
        })
      })
      this.getintogroup(this.currentgroupname);
    })
  }

  
}
