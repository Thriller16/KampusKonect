import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { KonektedPage } from '../pages/konekted/konekted';
import { FavoritesPage } from '../pages/favorites/favorites';
import { InvitefriendsPage } from '../pages/invitefriends/invitefriends';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LandingPage } from '../pages/landing/landing';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import { config} from './app.firebaseconfig';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    KonektedPage,
    ChatsPage,
    FavoritesPage,
    InvitefriendsPage,
    HomePage,
    ListPage,
    LandingPage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    KonektedPage,
    ChatsPage,
    FavoritesPage,
    InvitefriendsPage,
    HomePage,
    ListPage,
    LandingPage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider
  ]
})
export class AppModule {}
