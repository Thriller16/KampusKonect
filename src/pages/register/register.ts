import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { UserProvider } from '../../providers/user/user'
import { LoginPage } from '../login/login';
// import { AngularFireAuth} from 'angularfire2/auth';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  newUser = {
    email: '',
    password: '',
    displayname: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    // public afire: AngularFireAuth,
    // public userservice: UserProvider, 
    public loadingCtrl: LoadingController) {
  }

  // registeruser(){
  //   // this.afire.auth.createUserWithEmailAndPassword(this.newUser.email, this.newUser.password);
  //   let loader = this.loadingCtrl.create({
  //     content: 'Creating your account'
  //   });
  //   loader.present();
  //   this.userservice.createnewUser(this.newUser).then((res: any) =>{
  //     loader.dismiss();
  //     if(res.success){
  //       this.navCtrl.push(LoginPage, {signedemail: this.newUser.email, signedusername: this.newUser.displayname});
  //     }else{
  //       alert("Error" + res);
  //     }
  //   })
  // }



}