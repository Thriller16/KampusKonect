import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PrivacyPage } from '../privacy/privacy';
import { NotificationsettingsPage } from '../notificationsettings/notificationsettings';
import { PostsettingsPage } from '../postsettings/postsettings';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  openProfile(){
    this.navCtrl.push(ProfilePage);
  }

  openPrivacy(){
    this.navCtrl.push(PrivacyPage);
  }

  openNotificationSettings(){
    this.navCtrl.push(NotificationsettingsPage);
  }

  postSettings(){
    this.navCtrl.push(PostsettingsPage);
  }
}
