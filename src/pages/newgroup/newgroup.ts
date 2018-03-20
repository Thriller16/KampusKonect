import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups'
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
/**
 * Generated class for the NewgroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newgroup',
  templateUrl: 'newgroup.html',
})
export class NewgroupPage {

  newgroup = {
    groupName: 'GroupName',
    groupPic: '',
  }
  constructor(public navCtrl: NavController, 
    public imagehandler: ImghandlerProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public groupservice: GroupsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewgroupPage');
  }

  creategroup(){
    this.groupservice.addgroup(this.newgroup).then(() =>{
      this.navCtrl.pop();
    }).catch((err) =>{
      alert(JSON.stringify(err));
    });
  }

  editgroupname(){
    let alert = this.alertCtrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'Enter a name for the group'
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
          
          if(data.groupname){
            this.newgroup.groupName = data.groupname
          }

          else{
            let alertcc = this.alertCtrl.create({
              message: 'Group name field cannot be left blank'
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
    if(this.newgroup.groupName == "GroupName"){
      let namealert = this.alertCtrl.create({
        buttons: ['okay'],
        message: 'Please enter the groupname first'
      });
      namealert.present();
    }

    else{
      this.loadingCtrl.create({
        content: 'Saving group image please wait'
      })
      this.imagehandler.grouppicstore(this.newgroup.groupName).then((res: any) =>{
        if(res){
          alert("Im putting in the url "+ res);
          this.newgroup.groupPic = res;
        }
      }).catch((err) =>{
        alert(err);
      })
    }
  }

}
