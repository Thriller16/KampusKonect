import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/registeredusers');

  constructor(public afireAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  createnewUser(newuser){
    var promise = new Promise((resolve, reject) =>{
      this.afireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() =>{
        this.afireAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayname,
          photoURL: '',

        }).then(() =>{
            this.firedata.child(this.afireAuth.auth.currentUser.uid).set({
              uid: this.afireAuth.auth.currentUser.uid,
              displayName: newuser.displayname,
              photoURL: ''
            }).then(() =>{
              resolve({success: true});
            }).catch((err) =>{
              reject(err);
            })
        }).catch((err) =>{
            reject(err);
        })
      }).catch((err) =>{
        reject(err);
      })
    })

    return promise;
  }

}
