import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { SettingsPage} from '../pages/settings/settings'
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import { InvitefriendsPage } from '../pages/invitefriends/invitefriends';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyprofilePage } from '../pages/myprofile/myprofile';

import {AngularFireAuth} from 'angularfire2/auth';
// import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../pages/tabs/tabs';



@Component({
  selector: 'app',
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, icon:string,component: any}>;


  constructor(public platform: Platform, 
    public afireAuth: AngularFireAuth,
    public app: App,
    public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon : 'md-home', component: TabsPage },
      { title: 'Dashboard', icon : 'md-list',  component: FavoritesPage },
      { title: 'Invite Friends', icon : 'ios-people',  component: InvitefriendsPage },      
      { title: 'Settings', icon : 'md-settings',  component: SettingsPage },
      { title: 'Logout', icon : 'ios-log-out',  component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    if(page.title == "Logout"){
      this.afireAuth.auth.signOut();
      console.log("THis function is goin to log outthe above user");
    }
    this.nav.setRoot(page.component);
  }

  openprofile(){
    // this.nav.setRoot();
    // this.nav.setRoot(MyprofilePage);
    // this.app.getRootNav().push(MyprofilePage);
    // this.nav.push(MyprofilePage);
  }
}