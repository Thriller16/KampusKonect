import { Injectable } from '@angular/core';
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
import { UserProvider } from '../user/user';
import { Events } from 'ionic-angular';
/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');

  firefriends = firebase.database().ref('/friends');

  myfriends;
  userdetails;

  constructor(public userservice: UserProvider, public events: Events) {
  }

  sendrequest(req: connreq){
    var promise = new Promise((resolve, reject) =>{
      this.firereq.child(req.recipient).push().set({
        sender: req.sender
      }).then(() =>{
        resolve({success:true});
      }).catch((err) =>{
        resolve(false);
      })
    })
    return promise;
  }

  getmyrequests(){
    let allmyrequest;
    var myrequests = [];

    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) =>{
      allmyrequest = snapshot.val();
      myrequests = [];

      for(var i in allmyrequest){
        myrequests.push(allmyrequest[i].sender);
      }

      this.userservice.getallusers().then((res) =>{
        var allusers = res;
        this.userdetails = [];

        for(var j in myrequests)
        for (var key in allusers){
          if(myrequests[j] === allusers[key].uid)
            this.userdetails.push(allusers[key])
        }
        this.events.publish('gotrequests');
      })
    })
  }


  acceptrequest(buddy){
    var promise = new Promise((resolve, reject) =>{
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(() =>{

        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() =>{
          this.deleterequest(buddy).then(() =>{
            resolve(true);
          }).catch((err) =>{
            reject(err);
          }).catch((err) =>{
            reject(err);
          }).catch((err) =>{
            reject
          })
        })
      })
    })
    
    return promise;
  }

  deleterequest(buddy){
    var promise = new Promise((resolve, reject) =>{
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) =>{
        let tempstore = snapshot.val();
        let somekey = Object.keys(tempstore);
  
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey[0]).remove().then(() =>{
          resolve(true);

        }).catch((err) =>{
          reject(err);
        })
      }).catch((err) =>{
        reject(err);
      })
    })
    
    return promise;
  }

  getmyfriends(){

    let friendsuid = [];

    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) =>{
      let allfriends = snapshot.val();

      for (var i in allfriends){
        friendsuid.push(allfriends[i].uid);
      }

          this.userservice.getallusers().then((users) =>{
            this.myfriends = [];

            for (var j in friendsuid)
              for (var key in users){
                if(friendsuid[j] === users[key].uid){
                  this.myfriends.push(users[key]);
                }
              }  

              this.events.publish('friends');
      })
    })
  //   .catch((err) =>{
  //     alert(err);
  // }
}
}
