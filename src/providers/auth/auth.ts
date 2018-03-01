// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds'
// import {AngularFireModule} from 'angularfire2';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afireAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials: usercreds){
    var promise = new Promise((resolve, reject) =>{
      this.afireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        resolve(true);
      }).catch((err) =>{
          reject(err);
      })
    })

    return promise;
  }

}