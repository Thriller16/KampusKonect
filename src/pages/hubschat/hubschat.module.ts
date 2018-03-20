import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HubschatPage } from './hubschat';

@NgModule({
  declarations: [
    HubschatPage,
  ],
  imports: [
    IonicPageModule.forChild(HubschatPage),
  ],
})
export class HubschatPageModule {}
