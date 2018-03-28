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

        console.log("The owner is: " + temp);
        console.log("The current user is: " + firebase.auth().currentUser.uid);

        if(temp == firebase.auth().currentUser.uid){
          // alert("Current user is the group owner");
          resolve(true);
        }

        else{
          resolve(false);
          // alert("Current user is not the group owner");
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

  deletemember(member){
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
    .child('members').orderByChild('uid').equalTo(member.uid).once('value' , (snapshot) =>{
      snapshot.ref.remove().then(() =>{
        this.firegroup.child(member.uid).child(this.currentgroupname).remove().then(() =>{
          this.getintogroup(this.currentgroupname);
        }) 
      })
    })
  }

  getgroupmembers(){
    this.firegroup.child(firebase.auth().currentUser.uid)
    .child(this.currentgroupname).once('value', (snapshot) =>{
      var tempdata = snapshot.val().owner;

      this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) =>{
        var tempvar = snapshot.val();
        for(var key in tempvar){
          this.currentgroup.push(tempvar[key]);
        }
      })
    })
    this.events.publish('gotmembers');
  }

  deletegroup(){
    var promise = new Promise((resolve, reject) =>{
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) =>{
        var tempmembers = snapshot.val();

        for(var key in tempmembers){
          this.firegroup.child(tempmembers[key].uid).child(this.currentgroupname).remove();
        }

        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() =>{
          resolve(true);
        }).catch((err) =>{
          reject(err);
        })


      })
    })
    return promise;
  }

  leavegroup(){
    var promise = new Promise((resolve, reject) =>{
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) =>{
        var tempowner = snapshot.val().owner;
        this.firegroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('uid')
        .equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) =>{
          snapshot.ref.remove().then(() =>{
            this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() =>{
              resolve(true);
            }).catch((err) =>{
              reject(err);
            })
          }).catch((err) =>{
            reject(err);
          })
        })
      })
    })
    
    return promise;
  }

}
