import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HubsProvider } from '../../providers/hubs/hubs';

/**
 * Generated class for the NewhubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newhub',
  templateUrl: 'newhub.html',
})
export class NewhubPage {

  newhub = {
    hubName: 'hubName',
    hubPic: '',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public hubsservice: HubsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewhubPage');
  }

  createhub(){
    this.hubsservice.addhub(this.newhub).then(() =>{
      this.navCtrl.pop();
    }).catch((err) =>{
      alert(JSON.stringify(err));
    });
  }

  edithubname(){
    let alert = this.alertCtrl.create({
      title: 'Enter Hub Name',
      inputs: [{
        name: 'hubname',
        placeholder: 'Enter a name for the hub'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data =>{

        }
      },
      {
        text: 'Set',
        
        handler: data =>{
          
          if(data.hubname){
            this.newhub.hubName = data.hubname
          }

          else{
            let alertcc = this.alertCtrl.create({
              message: 'Hub name field cannot be left blank'
            });
            alertcc.present();
            // this.newgroup.groupName = 'groupName'
          }
        }
      }
    ]
    });
    alert.present();
  }

  chooseimage(){

  }


}
