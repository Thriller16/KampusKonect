import { Component } from '@angular/core';

import { KonektedPage } from '../konekted/konekted';
import { ChatsPage } from '../chats/chats';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChatsPage;
  tab3Root = KonektedPage;
  tab4Root = FavoritesPage;
  

  constructor() {

  }
  
}