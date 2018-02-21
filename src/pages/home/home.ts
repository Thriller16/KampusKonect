import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { SettingsPage } from '../../pages/settings/settings';
import { LoginPage } from '../../pages/login/login';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public app: App) {
    // this.app.getRootNav().setRoot(SettingsPage);
  }

  openSettings(){
    let nav = this.app.getRootNav();
    nav.push(SettingsPage);
  }

  openLogin(){
    let nav = this.app.getRootNav();
    nav.push(LoginPage);
  }
  
}
