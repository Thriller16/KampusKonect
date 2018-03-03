import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsettingsPage } from './postsettings';

@NgModule({
  declarations: [
    PostsettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostsettingsPage),
  ],
})
export class PostsettingsPageModule {}
