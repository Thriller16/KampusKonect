import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupschatPage } from './groupschat';

@NgModule({
  declarations: [
    GroupschatPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupschatPage),
  ],
})
export class GroupschatPageModule {}
