import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import { InvitefriendsPage } from '../pages/invitefriends/invitefriends';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { LandingPage } from '../pages/landing/landing';
// import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  selector: 'app',
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LandingPage;

  pages: Array<{title: string, icon:string,component: any}>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon : 'md-home', component: TabsPage },
      { title: 'Favorites', icon : 'md-heart',  component: FavoritesPage },
      { title: 'Settings', icon : 'ios-cog',  component: SettingsPage },
      { title: 'Invite Friends', icon : 'ios-cog',  component: InvitefriendsPage },
      { title: 'Logout', icon : 'ios-cog',  component: LoginPage }
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
    this.nav.setRoot(page.component);
  }
}
