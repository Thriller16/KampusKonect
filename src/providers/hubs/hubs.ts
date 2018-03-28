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

  // firedata = firebase.database().ref('/registeredusers');

  myhubs: Array<any> = [];

  allhubs: Array<any> = [];
  currenthub: Array<any> = [];
  currenthubname;
  hubpic;


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

          let newhub = {
            hubName: key,
            hubimage: temp[key].hubimage
            }

          this.myhubs.push(newhub)    
          }
      }

      this.events.publish('newhub');
    })
  }


  getintohub(hubname){
    
    if(hubname != null){
      this.firehub.child(firebase.auth().currentUser.uid).child(hubname).once('value', (snapshot) =>{

        if(snapshot.val() != null){
          var temp = snapshot.val().members;
          this.currenthub = [];

          for(var key in temp){
            this.currenthub.push(temp[key]);
          }
          this.currenthubname = hubname;
          this.events.publish('gitintohub');
        }
      })
      console.log("The groupname is: " + hubname);
    }
  }

  getownership(hubname){
    var promise = new Promise((resolve, reject) => {
      this.firehub.child(firebase.auth().currentUser.uid).child(hubname).once('value', (snapshot) =>{

        var temp = snapshot.val().owner;

        if(temp = firebase.auth().currentUser.uid){
          resolve(true);
        }else{
          resolve(false);
        }
      }).catch((err) =>{
        reject(err);
      })
    }); 

    return promise;
  }

  gethubimage(){
    var promise = new Promise((resolve, reject) =>{
      this.firehub.child(firebase.auth().currentUser.uid).child(this.currenthubname).once('value', (snapshot) =>{
        this.hubpic = snapshot.val().hubimage;

        resolve(true);
      })
    })

    return promise;
  }

  addmember(newmember){
    this.firehub.child(firebase.auth().currentUser.uid).child(this.currenthubname).child('members').push(newmember).then(() =>{
      this.gethubimage().then(() =>{
        this.firehub.child(newmember.uid).child(this.currenthubname).set({
          groupimage: this.hubpic,
          owner: firebase.auth().currentUser.uid,
          msgboard: ''
        }).catch((err) => {
          console.log(err);
        })
      })
      this.getintohub(this.currenthubname);
    })
  }

  getallhubs(){
    this.firehub.orderByChild(firebase.auth().currentUser.uid).on('value', (snapshot) =>{
    // this.firehub.child(firebase.auth().currentUser.uid).on('value', (snapshot) =>{
    //  console.log('The firechild has been loaded');
      this.allhubs = [];

      if(snapshot.val() != null){
        var temp = snapshot.val();

        // console.log("The value of temp is " + temp);
        // console.log(temp);
        for(var key in temp){

          let newhub = {
            hubName: key,
            hubimage: temp[key].hubimage
            }

          this.allhubs.push(newhub)
          console.log(this.allhubs);    
          }
      }

      this.events.publish('newhub');
    })
  } 
}
