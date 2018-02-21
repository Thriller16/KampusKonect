import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { TabsPage } from '../tabs/tabs';
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})




export class LoginPage {
  credentials = {} as usercreds;

  useremail: string;
  displayname: string;
  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams, public authservice: AuthProvider) {
    

      // this.useremail = navParams.get('signedemail'); 
      // this.displayname = navParams.get('signedusername');
  }

  // ionViewDidLoad(){
  //   console.log(this.useremail);
  // }

  

  logUserIn(){
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });
    loader.present();

    // this.navCtrl.push(TabsPage);
    this.authservice.login(this.credentials).then((res: any) =>{
      loader.dismiss();
      if(!res.code){
        this.navCtrl.setRoot(TabsPage);
      }


    }).catch((err) =>{
      this.alertLog(err.message);
      loader.dismiss();
    })


  }






  alertLog(message: string){
    this.alertCtrl.create({
      title: "Login Failed!!!",
      subTitle: message,
      buttons: ['Ok']
    }).present();
  }

  createaccount(){
    this.navCtrl.push(RegisterPage);
  }

}
